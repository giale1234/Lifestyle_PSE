

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

class ViewStatus extends Component {
  render() {
    let {budgetList} = this.props;

    function calIncome() {
      var incomeTotal = 0;
      {
        budgetList.map(budget => {
          if (budget.type === 'Income') {
            incomeTotal += Number(budget.amount);
          }
        });
      }
      return incomeTotal;
    }
    function calExpense() {
      var expenseTotal = 0;
      {
        budgetList.map(budget => {
          if (budget.type === 'Expense') {
            expenseTotal += Number(budget.amount);
          }
        });
      }
      return expenseTotal;
    }
    function calTotal() {
      var income = calIncome();
      var expense = calExpense();
      var total = Number(income) + Number(expense);
      return total;
    }
    return (
      // <Container style={styles.container}>
      <>
        <Header>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{flex: 1}}>
            <Title style={styles.headerText}>Budget</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MainTracker')}>
              <Text style={{fontWeight: 'bold'}}>Back</Text>
            </Button>
          </Right>
        </Header>
        <View
            style={{
              
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text style={styles.text}>Income </Text>
            <Text style={styles.text}>Expense</Text>
            <Text style={styles.text}>Total </Text>
          </View>
          <View
            style={{
              
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text style={styles.incomeText}> {calIncome()}</Text>
            <Text style={styles.expenseText}> {calExpense()}</Text>
            <Text style={styles.totalText}>{calTotal()}</Text>
          </View>
    
          <CalendarList 
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
            // Collection of dates that have to be colored in a special way. Default = {}
   markedDates={
    {'2020-05-20': [{textColor: 'green'}],
     '2020-05-22': [{startingDay: true, color: 'green'}],
     '2020-05-23': [{endingDay: true, color: 'green', textColor: 'gray'}],
     '2020-05-04': [{startingDay: true, color: 'green'}, {endingDay: true, color: 'green'}]
    }}
  // Date marking style [simple/interactive]. Default = 'simple'
  markingType={'interactive'}

        
  // Specify style for calendar container element. Default = {}
 
/>

        
 
          <ScrollView >
          {budgetList.sort((a,b)=> 
          Date.parse(new Date(b.date.split("-").reverse().join("-"))) - Date.parse(new Date(a.date.split("-").reverse().join("-")))
          )
          .map(budget => {
            return (
         <View>
                <Text>{budget.date}</Text>
                <View style={styles.containerItem}>
                  <Image source={budget.categoryImage} style={styles.image} />
                  <Text style={styles.categoryText}>{budget.category}</Text>
                  <Text
                    style={
                      budget.type === 'Income'
                        ? styles.incomeText
                        : styles.expenseText
                    }>
                    {budget.amount}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
     
  
        </>
      // </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
  };
};
export default connect(mapStateToProps, null)(ViewStatus);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  containerItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
  },
  image: {
    height: 52,
    width: 52,
  },
  categoryText: {
    fontSize: 40,
    marginHorizontal: 30,
  },
  incomeText: {
    fontSize: 20,

    color: 'green',
  },
  expenseText: {
    fontSize: 20,

    color: 'red',
  },
  totalText: {
    fontSize: 20,

    color: 'orange',
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
});

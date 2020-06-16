
// props change does not re-render
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
import moment from 'moment'; 
class ViewStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentMonth:""
    };
  }
  componentWillMount() {
    var currentMonth = moment().format("YYYY-MM");
    this.setState({
      currentMonth
    });
  }

  
  loadItems = (day) =>{
    let {budgetList} = this.props;
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          {
            {budgetList.sort((a,b)=> 
              Date.parse(new Date(b.date.split("-").reverse().join("-"))) - Date.parse(new Date(a.date.split("-").reverse().join("-")))
              ).map(budget => {
                if (budget.date.split("-").reverse().join("-") === strTime) {
                  // numItems++;
                  this.state.items[strTime].push({        
                    date: strTime,
                    note: budget.note,
                    amount:  budget.amount,
                    type:budget.type,
                    category: budget.category,
                    categoryImage: budget.categoryImage,
                    checkedIndex: budget.checkedIndex,
                  });
                }
              });
          }
        }
        }
      }
     
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);  
  }

  renderItem = (item,firstItemInDay) =>{
    if(firstItemInDay){
      return (
       <>
        <View style={styles.containerItem}>
          <Image source={item.categoryImage} style={styles.image} />
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text
            style={
              item.type === 'Income'
                ? styles.incomeText
                : styles.expenseText
            }>
            {item.amount}
          </Text>
        </View>
       </>
      )
    }else{
      return (
        <View style={styles.containerItem}>
          <Image source={item.categoryImage} style={styles.image} />
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text
            style={
              item.type === 'Income'
                ? styles.incomeText
                : styles.expenseText
            }>
            {item.amount}
          </Text>
        </View>
      );
    }

  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        {/* <Text>This is empty date!</Text> */}
      </View>
    );
  }

  rowHasChanged = (r1, r2) =>{
    return r1.name !== r2.name;
  }

  timeToString = (time) =>{
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  UNSAFE_componentWillMount(){
   return(
    <Agenda
    items={this.state.items}
    loadItemsForMonth={this.loadItems}
    renderItem={this.renderItem}
    renderEmptyDate={this.renderEmptyDate.bind(this)}
    rowHasChanged={this.rowHasChanged.bind(this)}
    // refreshing={loading}
    selected={this.state.currentMonth}
  /> 
   )
  }
  render() {
   
    return (
      <>
      <Header>
      <Left style = {{flex: 1}}>
        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>

      <Body style = {{flex: 1}}>
        <Title style={styles.headerText}>Budget</Title>
      </Body>
      <Right style = {{flex: 1}}>
    <Button 
      transparent 
      onPress={() => this.props.navigation.navigate('MainTracker')}>
      <Text style={{fontWeight:"bold"}}>Back</Text>
    </Button>

  </Right>
    </Header>
        
          
      <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // refreshing={loading}
          selected={this.state.currentMonth}

        /> 

      
       </>  
    );
  }

}

const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
  };
};
export default connect(mapStateToProps, null)(ViewStatus);

// 
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    marginTop: 5,
  },
  emptyDate: {
    // backgroundColor: 'green',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
    height: 20,
  },
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
    height:90
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

// import React, {Component} from 'react';
// import {StyleSheet, ScrollView, View, Image,TouchableOpacity} from 'react-native';

// import {connect} from 'react-redux';
// import {
//   Container,
//   Header,
//   Title,
//   Content,
//   Button,
//   Icon,
//   Left,
//   Right,
//   Body,
//   Text,
// } from 'native-base';

// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// class ViewStatus extends Component {
 
//    render(){
//      let {budgetList} = this.props;
//     return (
//      <ScrollView>
//        {budgetList.sort((a,b)=> 
//           Date.parse(new Date(b.date.split("-").reverse().join("-"))) - Date.parse(new Date(a.date.split("-").reverse().join("-")))
//           )
//           .map(budget => {
//             return (
//               <TouchableOpacity style={{height:20, width:100}} >
//               <Text>{budget.date}</Text>
//             </TouchableOpacity>
//             );
//           })}
//        </ScrollView>
        
//       );
//    }
//   }



// const mapStateToProps = state => {
//   return {
//     budgetList: state.budgetReducer.budgetList,
//   };
// };
// export default connect(mapStateToProps, null)(ViewStatus);

// // 
// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'red',
//     flex: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginRight: 10,
//     justifyContent: 'center',
//     marginTop: 5,
//   },
//   emptyDate: {
//     // backgroundColor: 'green',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 5,
//     height: 20,
//   },
// });
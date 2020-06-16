// props change does not re-render
import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

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
  Card,
  CardItem,
  ListItem, 
  List
} from 'native-base';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Item from './BudgetItem'
class ViewStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentMonth: '',
    };
   
  }

  componentWillMount() {
    var currentMonth = moment().format('YYYY-MM');
    this.setState({
      currentMonth,
    });
  }
  loadItems = () => {
    let {budgetList} = this.props;
    for (let i = -15; i < 85; i++) {
      var timestamp = Math.floor(Date.now());
      const time = timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      this.state.items[strTime] = [];
      budgetList
        .sort(
          (a, b) =>
            Date.parse(
              new Date(
                b.date
                  .split('-')
                  .reverse()
                  .join('-'),
              ),
            ) -
            Date.parse(
              new Date(
                a.date
                  .split('-')
                  .reverse()
                  .join('-'),
              ),
            ),
        )
        .map(budget => {
          if (
            budget.date
              .split('-')
              .reverse()
              .join('-') === strTime
          ) {
            // numItems++;
            this.state.items[strTime].push({
              id: budget.id,
              date: strTime,
              note: budget.note,
              amount: budget.amount,
              type: budget.type,
              category: budget.category,
              categoryImage: budget.categoryImage,
              checkedIndex: budget.checkedIndex,
            });
          }
        });
    }

    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });

    this.setState({
      items: newItems,
    });
    // console.log('budgetList', this.state.items);
 
  };

  componentDidUpdate(prevProps) {
    if (prevProps.budgetList !== this.props.budgetList) {
      this.loadItems();
    
    }
  }

  componentDidMount() {
    this.loadItems();
  }

  renderItem = (item, firstItemInDay) => {
    return <Item item={item} firstItemInDay={firstItemInDay}
     navigation={this.props.navigation}
     />;
  };
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        {/* <Text>This is empty date!</Text> */}
      </View>
    );
  }
  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  render() {
    console.log("budgetList . view status", this.props.budgetList);
   
    return (
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

        <Agenda
          items={this.state.items}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
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
    height: 90,
  },
  image: {
    height: 52,
    width: 52,
    marginLeft:15
    
   
  },
  categoryText: {
    fontSize: 20,
    marginHorizontal: 30,
  },
  noteText:{
    fontSize: 15,
  },
  incomeText: {
    fontSize: 25,
    fontWeight:"bold",
    color: 'green',
  },
  expenseText: {
    fontSize: 25,
    fontWeight:"bold",

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

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    height: 90,
    flexDirection: 'row',
  
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#F1F4F5',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  swipeRow: {
    width: 320,
    margin:2,
    elevation: 6, borderRadius: 28, marginBottom: 3, backgroundColor: 'rgba(231,76,60,1)'
  },
});


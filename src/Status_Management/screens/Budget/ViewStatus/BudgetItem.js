// props change does not re-render
import React, {Component, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Overlay} from 'react-native-elements';

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
  List,
} from 'native-base';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import AddStatus from '../AddStatus/AddStatus';
import Income from '../AddStatus/Income';

class BudgetItem extends Component {
  constructor(props) {
    super(props);
    this.rowRefs = {};
    this.openRowKey = null;
  }

  // onRowOpen = key => () => {
  //   if (this.openRowKey && key !== this.openRowKey) {
  //     const rowRef = this.rowRefs[this.openRowKey];
  //     rowRef.closeRow && rowRef.closeRow();
  //   }
  //   this.openRowKey = key;
  // };
  render() {
    const {budgetList} = this.props;
    let {item, firstItemInDay} = this.props;

    function calIncome() {
      var incomeTotal = 0;
      {
        budgetList.map(budget => {
          if (
            budget.type === 'Income' &&
            budget.date
              .split('-')
              .reverse()
              .join('-') === item.date
          ) {
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
          if (
            budget.type === 'Expense' &&
            budget.date
              .split('-')
              .reverse()
              .join('-') === item.date
          ) {
            expenseTotal += Number(budget.amount);
          }
        });
      }
      return expenseTotal;
    }
    function calTotal() {
      var income = calIncome();
      var expense = calExpense();
      var total = Number(income) - Number(expense);
      return total;
    }

    const Item = () => {
      const [visible, setVisible] = useState(false);
      const toggleOverlay = () => {
        setVisible(!visible);
      };

      return (
        <>
          <SwipeRow
            key={item.id}
            // ref={ref => (this.rowRefs[item.id] = ref)}
            // onRowOpen={this.onRowOpen(item.id)}
            rightOpenValue={-150}
            style={styles.swipeRow}
            disableRightSwipe={true}>
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {
                  this.props.edit(item);
                  {item.type === "Income" ?  this.props.navigation.push("Income") : this.props.navigation.push("Expense")}
                 
                }}>
                <Text style={styles.backTextWhite}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                  this.props.delete(item);
                }}>
                <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight style={styles.rowFront}>
              <View style={{flexDirection: 'row'}}>
                <Image source={item.categoryImage} style={styles.image} />

                <View style={{marginLeft: 30, marginTop: 5, flex: 1}}>
                  <Text>{item.category}</Text>
                  <Text note numberOfLines={1}>
                    {item.note}
                  </Text>
                </View>
                <Button transparent>
                  <Text
                    style={
                      item.type === 'Income'
                        ? styles.incomeText
                        : styles.expenseText
                    }>
                    {item.amount}
                  </Text>
                </Button>
              </View>
            </TouchableHighlight>
          </SwipeRow>

          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Hello from Overlay!</Text>
          </Overlay>
        </>
      );
    };
    if (firstItemInDay) {
      return (
        <>
          <View
            style={{
              backgroundColor: '#E4EEE0',
              width: 320,
              margin: 2,
              borderColor: 'grey',
              borderWidth: 1,
              height: 50,
              justifyContent: 'center',
            }}>
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
          </View>
          <Item />
        </>
      );
    } else {
      return (
        <>
          <Item />
        </>
      );
    }
  }
}
const mapDisaptchToProps = dispatch => {
  return {
    //key: value
    edit: item => {
      let action = {
        type: 'EDIT',
        budget: item,
      };

      dispatch(action);
    },

    delete: budget => {
      let action = {
        type: 'DELETE',
        budget,
      };
      dispatch(action);
    },
  };
};

const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
  };
};
export default connect(mapStateToProps, mapDisaptchToProps)(BudgetItem);

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
    height: 45,
    width: 45,
    marginLeft: 15,
  },
  categoryText: {
    fontSize: 20,
    marginHorizontal: 30,
  },
  noteText: {
    fontSize: 15,
  },
  incomeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  expenseText: {
    fontSize: 15,
    fontWeight: 'bold',

    color: 'red',
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'orange',
  },
  text: {
    fontSize: 15,
    color: 'grey',
  },

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 0.7,
    justifyContent: 'center',
    height: 60,
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
    backgroundColor: '#FDC02E',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#D93649',
    right: 0,
  },
  swipeRow: {
    width: 320,
    margin: 2,
    elevation: 6,
    borderRadius: 28,
    marginBottom: 3,
    backgroundColor: 'rgba(231,76,60,1)',
  },
});

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import SwipeRow from 'react-native-swipe-list-view';

// const data = [{ key: '0' }, { key: '1' }, { key: '2' }, { key: '3' }];

// export default class ViewStatus extends React.Component {
//   constructor(props) {
//     super(props);
//     this.rowRefs = {};
//     this.openRowKey = null;
//   }

//   onRowOpen = key => () => {
//     if (this.openRowKey && key !== this.openRowKey) {
//       const rowRef = this.rowRefs[this.openRowKey];
//       rowRef.closeRow && rowRef.closeRow();
//     }
//     this.openRowKey = key;
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.standalone}>
//           {data.map((d, i) => (
//             <SwipeRow
//               key={i}
//               ref={ref => (this.rowRefs[d.key] = ref)}
//               leftOpenValue={75}
//               rightOpenValue={-75}
//               onRowOpen={this.onRowOpen(d.key)}
//             >
//               <View style={styles.standaloneRowBack}>
//                 <Text style={styles.backTextWhite}>Left</Text>
//                 <Text style={styles.backTextWhite}>Right</Text>
//               </View>
//               <View style={styles.standaloneRowFront}>
//                 <Text>I am standalone SwipeRow #{i}</Text>
//               </View>
//             </SwipeRow>
//           ))}
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   standalone: {
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   standaloneRowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     justifyContent: 'center',
//     height: 50,
//   },
//   standaloneRowBack: {
//     alignItems: 'center',
//     backgroundColor: '#8BC645',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   backTextWhite: {
//     color: '#FFF',
//   },
//   spacer: {
//     height: 50,
//   },
// });

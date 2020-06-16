// import React, {Component} from 'react';
// import {Text, View, StyleSheet,ScrollView} from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import {connect} from 'react-redux';

//  class ViewStatus extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: {},
//       budgetList: [
//         {
//           id: 0,
//           date: '2020-06-08',
//           title: 'Food',
//         },
//         {
//           id: 1,
//           date: '2020-06-06',
//           title: 'Health',
//         },
//         {
//           id: 1,
//           date: '2020-06-07',
//           title: 'Health',
//         },
//         {
//           id: 1,
//           date: '2020-06-07',
//           title: 'Health',
//         },
//         {
//           id: 1,
//           date: '2020-06-07',
//           title: 'Health',
//         },
//         {
//           id: 1,
//           date: '2020-06-06',
//           title: 'Health',
//         },
//         {
//           id: 1,
//           date: '2020-06-09',
//           title: 'Health',
//         },
//         {
//           id: 1,
//           date: '2020-06-08',
//           title: 'Health',
//         },
//       ],
//     };
//   }

//   render() {
//     let {budgetLists} = this.props;
   
//     return (
//       <>
//       <View >
//       {budgetLists.sort((a,b)=> 
//       Date.parse(new Date(b.date.split("-").reverse().join("-"))) - Date.parse(new Date(a.date.split("-").reverse().join("-")))
//       )
//       .map(budget => {
//         return (
//      <View>
//             <Text>{budget.date}</Text>
//             <View style={styles.containerItem}>
//               <Image source={budget.categoryImage} style={styles.image} />
//               <Text style={styles.categoryText}>{budget.category}</Text>
//               <Text
//                 style={
//                   budget.type === 'Income'
//                     ? styles.incomeText
//                     : styles.expenseText
//                 }>
//                 {budget.amount}
//               </Text>
//             </View>
//           </View>
//         );
//       })}
//     </View>
//       {/* <Agenda
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         // selected={new Date()}
//         renderItem={this.renderItem.bind(this)}
//         renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}
//         // refreshing={false}
//       /> */}

//       </>
//     );
//   }

//   loadItems(day) {
//     let {budgetList} = this.props;
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         if (!this.state.items[strTime]) {
//           this.state.items[strTime] = [];
//           {
//             this.state.budgetList.sort((a,b)=> 
//             Date.parse(new Date(b.date.split("-").reverse().join("-"))) - Date.parse(new Date(a.date.split("-").reverse().join("-")))
//             ).map(budget => {
//               if(budget.date === strTime){
//                 // numItems++;
//                 this.state.items[strTime].push({
//                   date: strTime,
//                   amount: 50,
//                   title:budget.title,
//                 });
//               } 
              
//             });
//           }
//           // for (let j = 0; j < numItems; j++) {
//           //   this.state.items[strTime].push({
//           //     name: 'Item for ' + strTime,
//           //     height: 50,
//           //   });
//           // }
//         }
//       }
//       //console.log(this.state.items);
//       const newItems = {};
//       Object.keys(this.state.items).forEach(key => {
//         newItems[key] = this.state.items[key];
//       });
//       this.setState({
//         items: newItems,
//       });
//     }, 1000);
//     // console.log(`Load Items for ${day.year}-${day.month}`);
//   }

//   renderItem(item) {
//     return (
//       <View style={{height: 85}}>
//         <View style={[styles.item, {height: 50}]}>
//           <Text>{item.date}</Text>
//           <Text>{item.amount}</Text>
//           <Text>{item.title}</Text>
//         </View>
//       </View>
//     );
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}>
//         {/* <Text>This is empty date!</Text> */}
//       </View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }
// }
// const mapStateToProps = state => {
//   return {
//     budgetList: state.budgetReducer.budgetList,
//   };
// };
// export default connect(mapStateToProps, null)(ViewStatus);

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

    // function calIncome() {
    //   var incomeTotal = 0;
    //   {
    //     budgetList.map(budget => {
    //       if (budget.type === 'Income') {
    //         incomeTotal += Number(budget.amount);
    //       }
    //     });
    //   }
    //   return incomeTotal;
    // }
    // function calExpense() {
    //   var expenseTotal = 0;
    //   {
    //     budgetList.map(budget => {
    //       if (budget.type === 'Expense') {
    //         expenseTotal += Number(budget.amount);
    //       }
    //     });
    //   }
    //   return expenseTotal;
    // }
    // function calTotal() {
    //   var income = calIncome();
    //   var expense = calExpense();
    //   var total = Number(income) + Number(expense);
    //   return total;
    // }
    return (
    //   // <Container style={styles.container}>
    //   <>
    //     <Header>
    //       <Left style={{flex: 1}}>
    //         <Button
    //           transparent
    //           onPress={() => this.props.navigation.openDrawer()}>
    //           <Icon name="menu" />
    //         </Button>
    //       </Left>

    //       <Body style={{flex: 1}}>
    //         <Title style={styles.headerText}>Budget</Title>
    //       </Body>
    //       <Right style={{flex: 1}}>
    //         <Button
    //           transparent
    //           onPress={() => this.props.navigation.navigate('MainTracker')}>
    //           <Text style={{fontWeight: 'bold'}}>Back</Text>
    //         </Button>
    //       </Right>
    //     </Header>
    //     <View
    //         style={{
              
    //           flexDirection: 'row',
    //           justifyContent: 'space-around',
    //         }}>
    //         <Text style={styles.text}>Income </Text>
    //         <Text style={styles.text}>Expense</Text>
    //         <Text style={styles.text}>Total </Text>
    //       </View>
    //       <View
    //         style={{
              
    //           flexDirection: 'row',
    //           justifyContent: 'space-around',
    //         }}>
    //         <Text style={styles.incomeText}> {calIncome()}</Text>
    //         <Text style={styles.expenseText}> {calExpense()}</Text>
    //         <Text style={styles.totalText}>{calTotal()}</Text>
    //       </View>
    
         
 
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
     
  
        // </>
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

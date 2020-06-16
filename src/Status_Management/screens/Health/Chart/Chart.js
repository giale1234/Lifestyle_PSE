// import React, { Component,useState } from "react";
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
//   SwipeRow

// } from "native-base";

// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
//   TouchableOpacity,
//   TouchableNativeFeedback,

// } from "react-native";
// import DatePicker from 'react-native-modern-datepicker';
// import {connect} from 'react-redux';

// import moment from 'moment';

// class Chart extends Component {
//  constructor(props){
//    super(props);
//    this.state = {
//     selectedMonth:'',
//     modalVisible:false
//    }
//  }
//  componentWillMount() {
//   var selectedMonth = moment().format("YYYY-MM");
//   this.setState({
//     selectedMonth
//   });
// }

//   render() {
   
//     const {budgetList}  = this.props;
//     const {selectedMonth} = this.state;
//     function calIncome() {
//         var incomeTotal = 0;
//         {
//           budgetList.map(budget => {

//             if (budget.type === 'Income' && selectedMonth === budget.date.split('-').reverse().join('-').split("-", 2).join('-')
//             ) {
//               incomeTotal += Number(budget.amount);
//             }
//           });
//         }
//         return incomeTotal;
//       }
//       function calExpense() {
//         var expenseTotal = 0;
//         {
//           budgetList.map(budget => {
//             if (budget.type === 'Expense' && selectedMonth === budget.date.split('-').reverse().join('-').split("-", 2).join('-')) {
//               expenseTotal += Number(budget.amount);
//             }
//           });
//         }
//         return expenseTotal;
//       }
//       function calTotal() {
//         var income = calIncome();
//         var expense = calExpense();
//         var total = Number(income) - Number(expense);
//         return total;
//       }
//     return (
//       <Container style={styles.container}>
//          <Header>
//           <Left style={{flex: 1}}>
//             <Button
//               transparent
//               onPress={() => this.props.navigation.openDrawer()}>
//               <Icon name="menu" />
//             </Button>
//           </Left>

//           <Body style={{flex: 1}}>
//             <Title style={styles.headerText}>Budget</Title>
//           </Body>
//           <Right style={{flex: 1}}>
//             <Button
//               transparent
//               onPress={() => this.props.navigation.navigate('MainTracker')}>
//               <Text style={{fontWeight: 'bold', color:"white", fontSize:18}}>Back</Text>
//             </Button>
//           </Right>
//         </Header>

//         <Content padder>

//         <Modal

//         animationType="slide"
//         transparent={true}
//         visible={this.state.modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");

//         }}

//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>

//             <DatePicker
//               current={this.state.selectedMonth.split("-").join(" ")}
//               mode="monthYear"
//               selectorStartingYear={2000}
//               onMonthYearChange={selectedDate => this.setState({selectedMonth:selectedDate.split(" ").join("-")})}
//               style={styles.datePicker}
//             />
//              <TouchableOpacity
//              style={styles.openButton}
//               onPress={() => {
//                this.setState({modalVisible:false})
//               }}
//             >
//               <Text style={styles.textStyle}>     OK      </Text>
//             </TouchableOpacity>

//           </View>
//         </View>
//       </Modal>
//       <TouchableOpacity
//         style={styles.openButton}
//         onPress={() => {
//           this.setState({modalVisible:true})
//         }}
//       >
//         <Text style={styles.textStyle}>{this.state.selectedMonth.split("-").reverse().join("-")}</Text>
//       </TouchableOpacity>

//       <View
//             style={{

//               flexDirection: 'row',
//               justifyContent: 'space-around',
//             }}>
//             <Text style={styles.text}>Income </Text>
//             <Text style={styles.text}>Expense</Text>
//             <Text style={styles.text}>Total </Text>
//           </View>
//           <View
//             style={{

//               flexDirection: 'row',
//               justifyContent: 'space-around',
//             }}>
//             <Text style={styles.incomeText}> {calIncome()}</Text>
//             <Text style={styles.expenseText}> {calExpense()}</Text>
//             <Text style={styles.totalText}>{calTotal()}</Text>
//           </View>

//         </Content>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     budgetList: state.budgetReducer.budgetList,
//     budgetEdit: state.budgetReducer.budgetEdit   
//   };
// };
// export default connect(mapStateToProps, null)(Chart);

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFF"
//   },
//   headerText: {
//     fontWeight: 'bold',
//     justifyContent: 'center',

//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5
//   },
//   openButton: {
//     backgroundColor:"orange",
//     borderWidth:3,
//     borderColor:"#222224",
//     borderColor:5,
//     padding: 10,
//     elevation: 2,

//   },
//   textStyle: {
//     fontSize:18,
//     // fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   },
//   datePicker:{
//      width:300
//   },
//   noteText:{
//     fontSize: 15,
//   }
//   ,text: {
//     fontSize: 20,
//     color: 'grey',
//   },
//   incomeText: {
//     fontSize: 20,
//     fontWeight:"bold",
//     color: 'green',
//   },
//   expenseText: {
//     fontSize: 20,
//     fontWeight:"bold",

//     color: 'red',
//   },
//   totalText: {
//     fontSize: 20,
//     fontWeight:"bold",
//     color: 'orange',
//   }
// });

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';



import {PieChart} from 'react-native-charts-wrapper';

export default class Chart extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',
          // xValuePosition: "OUTSIDE_SLICE",
          //   yValuePosition: "OUTSIDE_SLICE",
        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{value: 45, label: 'Sandwiches'},
            {value: 21, label: 'Salads'},
            {value: 15, label: 'Soup'},
            {value: 9, label: 'Beverages'},
            {value: 15, label: 'Desserts'}],
          label: '',
          config: {
            colors: [processColor('#FFD000'), processColor('#FE5972'), processColor('#87DFB0'), processColor('#45C1EA'), processColor('#EE7720')],
            valueTextSize: 20,
            valueTextColor: processColor('green'),
            sliceSpace: 5,
            selectionShift: 13,
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5
          }
        }],
      },
      highlights: [{x:2}],
      description: {
       
        text: '',
        textSize: 15,
        textColor: processColor('darkgray'),

      },
      animation:{
        durationX: 1000,
        durationY: 1000,
        // easingX: 'EaseInCirc',
        random: Math.random(),
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Text>selected:</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('white')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor('green')}
            entryLabelTextSize={20}
            drawEntryLabels={true}
            rotationEnabled={true}
            // rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{text:'Pie center text!', color: processColor('pink'), size: 20}}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            // maxAngle={350}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            animation={this.state.animation}
            
          />
         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  }
});

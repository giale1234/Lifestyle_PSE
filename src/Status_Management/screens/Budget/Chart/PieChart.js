import React, {Component, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {connect} from 'react-redux';

import moment from 'moment';

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
  SwipeRow,
} from 'native-base';

import {PieChart} from 'react-native-charts-wrapper';
import { ScrollView } from 'react-native-gesture-handler';

class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: '',
      modalVisible: false,
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },

      dataIncome: {},
      dataExpense:  {},
      highlights: [{x: 2}],
      description: {
        text: '',
        textSize: 20,
        textColor: processColor('darkgray'),
      },
      animation: {
        durationX: 1000,
        durationY: 1000,
        // easingX: 'EaseInCirc',
        random: Math.random(),
      },
      valueChartIncome: [],
      valueChartExpense: [],
    };
  }
  componentDidMount() {
   
    this.chart();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.selectedMonth !== prevProps.selectedMonth){
        this.setState({
          selectedMonth:this.props.selectedMonth,
          modalVisible:this.props.modalVisible,
         
        })
      }
    
    // Typical usage (don't forget to compare props):
    if (
      this.state.selectedMonth !== prevState.selectedMonth ||
      this.props.budgetList !== prevProps.budgetList
    ) {
      this.chart();
    }
  }
  componentWillMount() {

    var selectedMonth = moment().format('YYYY-MM');
    
    this.setState({
      selectedMonth,
    });
  }
  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    // console.log(event.nativeEvent);
  }
  chart = () => {
    const {budgetList} = this.props;
    const {selectedMonth} = this.state;

    let indexIncome = {};
    let indexExpense = {};
    let valueChartIncome = [];
    let valueChartExpense = [];

    budgetList.map(budget => {
      if (
        selectedMonth ===
        budget.date
          .split('-')
          .reverse()
          .join('-')
          .split('-', 2)
          .join('-')
      ) {
        if (budget.type === 'Income') {
          if (!indexIncome[budget.checkedIndex]) {
            indexIncome[budget.checkedIndex] = {
              value: Number(budget.amount),
              label: budget.category,
              categoryImage: budget.categoryImage,
            };
          } else {
            indexIncome[budget.checkedIndex].value =
              indexIncome[budget.checkedIndex].value + Number(budget.amount);
          }
        } else {
          if (!indexExpense[budget.checkedIndex]) {
            indexExpense[budget.checkedIndex] = {
              value: Number(budget.amount),
              label: budget.category,
              categoryImage: budget.categoryImage,
            };
          } else {
            indexExpense[budget.checkedIndex].value =
              indexExpense[budget.checkedIndex].value + Number(budget.amount);
          }
        }
      }
    });
   
    Object.keys(indexIncome).forEach(key => {
      valueChartIncome.push({
        value: indexIncome[key].value,
        label: indexIncome[key].label,
        categoryImage: indexIncome[key].categoryImage,
      });
    });
    Object.keys(indexExpense).forEach(key => {
      valueChartExpense.push({
        value: indexExpense[key].value,
        label: indexExpense[key].label,
        categoryImage: indexExpense[key].categoryImage,
      });
    });

    this.setState({
      dataIncome: {
        dataSets: [
          {
            values: valueChartIncome,
            label: '',
            config: {
              colors: [
                processColor('#FFD000'),
                processColor('#FE5972'),
                processColor('#87DFB0'),
                processColor('#45C1EA'),
                processColor('#EE7720'),
              ],
              valueTextSize: 20,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      dataExpense: {
        dataSets: [
          {
            values: valueChartExpense,
            label: '',
            config: {
              colors: [
                processColor('#FFD000'),
                processColor('#FE5972'),
                processColor('#87DFB0'),
                processColor('#45C1EA'),
                processColor('#EE7720'),
              ],
              valueTextSize: 20,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      valueChartIncome,
      valueChartExpense,
    });
  };

  render() {
    const {budgetList} = this.props;
  
    // {this.chart()}
    const {selectedMonth} = this.state;
   
    function calIncome() {
      var incomeTotal = 0;
      {
        budgetList.map(budget => {
          if (
            budget.type === 'Income' &&
            selectedMonth ===
              budget.date
                .split('-')
                .reverse()
                .join('-')
                .split('-', 2)
                .join('-')
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
            selectedMonth ===
              budget.date
                .split('-')
                .reverse()
                .join('-')
                .split('-', 2)
                .join('-')
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
    var valueChart = this.props.typePieChart == "Income" ? this.state.valueChartIncome :this.state.valueChartExpense 
    return (
 
    
      
        <Content padder> 

        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
            {this.props.typePieChart == "Income" ? "INCOME" :"EXPENSE"}
          </Text>
        </View>
        
        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('white')}
          chartDescription={this.state.description}
          data={this.props.typePieChart == "Income" ? this.state.dataIncome :this.state.dataExpense}
          legend={this.state.legend}
          highlights={this.state.highlights}
          entryLabelColor={processColor('green')}
          entryLabelTextSize={15}
          drawEntryLabels={true}
          rotationEnabled={true}
          // rotationAngle={45}
          usePercentValues={true}
          styledCenterText={{
            text: 'Pie center text!',
            color: processColor('pink'),
            size: 15,
          }}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          // maxAngle={350}
          onSelect={this.handleSelect.bind(this)}
          onChange={event => console.log(event.nativeEvent)}
          animation={this.state.animation}
        />
       
        { valueChart
        .map(item => {
          return (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around', borderColor:"grey", borderWidth:0.5, height:50, alignItems:"center"}}>
              <Image
                source={item.categoryImage}
                style={{height: 40, width: 40}}
              />
              <Text  style={{fontSize:15}}>{item.label}</Text>
              <Text style={{fontSize:15, fontWeight:"bold", color:"green"}}>{item.value}</Text>
            </View>
          );
        })}

        </Content>


    );
  }
}

const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
   
  };
};
export default connect(mapStateToProps, null)(Chart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chart: {
    height:300, width:300
  },
  // container: {
  //   backgroundColor: "#FFF"
  // },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'orange',
    borderWidth: 3,
    borderColor: '#222224',
    borderColor: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  datePicker: {
    width: 300,
  },
  noteText: {
    fontSize: 15,
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  incomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  expenseText: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'red',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
});

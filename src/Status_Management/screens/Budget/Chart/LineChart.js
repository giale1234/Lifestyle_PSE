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

import {BarChart} from 'react-native-charts-wrapper';
import { ScrollView } from 'react-native-gesture-handler';

class LineChart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: '',
      modalVisible: false,
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },

      dataIncome: {},
      dataExpense:  {},
      highlights: [],
      xAxis: { },
      
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
          if (!indexIncome[budget.date]) {
            indexIncome[budget.date] = {      
              y: Number(budget.amount),
              x: Number(budget.date.split("-",1)) -1
            };
          } else {
            indexIncome[budget.date].y =
              indexIncome[budget.date].y + Number(budget.amount);
             
          }
        } else {
          if (!indexExpense[budget.date]) {
            indexExpense[budget.date] = {
              y: Number(budget.amount),
              x: Number(budget.date.split("-",1)) -1
            };
          } else {
            indexExpense[budget.date].y =
            indexExpense[budget.date].y + Number(budget.amount);
          }
        }
      }
    });
   
    Object.keys(indexIncome).forEach(key => {
      valueChartIncome.push({
        y: indexIncome[key].y,
        x: indexIncome[key].x,
       
      });
    });
    Object.keys(indexExpense).forEach(key => {
      valueChartExpense.push({
        y: indexExpense[key].y,
        x: indexExpense[key].x,
       
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
                processColor('#CD5CAC'),
                processColor('#35ADB5'),
                processColor('#FE3334'),
                processColor('#FFA601'),
              ],
              valueTextSize: 10,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#",
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
                processColor('#CD5CAC'),
                processColor('#35ADB5'),
                processColor('#FE3334'),
                processColor('#FFA601'),
              ],
              valueTextSize: 10,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      xAxis: {
        valueFormatter: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
        granularityEnabled: true,
        granularity : 1,
        drawGridLines: false,
        position: 'BOTTOM',
      
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
            {this.props.typePieChart == "Income" ? "Income a day in month" :"Expense a day in month"}
          </Text>
        </View>
        
        <BarChart
          style={styles.chart}
          data={this.props.typePieChart == "Income" ? this.state.dataIncome :this.state.dataExpense}
          xAxis={this.state.xAxis}
          animation={{durationX: 2000}}
          legend={this.state.legend}
          gridBackgroundColor={processColor('white')}
          visibleRange={{x: { min: 15, max:  31}}}
          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={true}
          onSelect={this.handleSelect.bind(this)}
          highlights={this.state.highlights}
          onChange={(event) => console.log(event.nativeEvent)}
        
          yAxis={{ 
            left: { drawGridLines: false},
            right: { drawGridLines: false},
            
          }}
        />
       
        </Content>


    );
  }
}

const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
   
  };
};
export default connect(mapStateToProps, null)(LineChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chart: {
    height:250, width:360
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

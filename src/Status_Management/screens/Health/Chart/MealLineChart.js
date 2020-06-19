import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import {connect} from 'react-redux';
class MealLineChart extends React.Component {

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
      data: {},
      highlights: [],
      xAxis: {
        valueFormatter: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
        granularityEnabled: true,
        granularity : 1,
        drawGridLines: false,
        position: 'BOTTOM',
      
      },
      valueChart: [],
      totalTime:0,
      
    };
  }
  componentDidMount() {

    this.chart();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.selectedMonth !== prevProps.selectedMonth){
      this.setState({
        selectedMonth:this.props.selectedMonth,
        modalVisible:this.props.modalVisible
      })
    }
  
   
    if (
      this.state.selectedMonth !== prevState.selectedMonth ||
      this.props.mealList !== prevProps.mealList
    ) {
      this.chart();
    }
  }
  timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  chart = () => {
    const {mealList} = this.props;
    const {selectedMonth} = this.state;
 
    let index = {};
    
 
    let valueChart = [];
  

    
    mealList
    .filter(meal => selectedMonth === meal.date.split('-') .reverse() .join('-').split('-', 2).join('-'))
   
    .map(
        meal => {     
        var totalCalo = meal.carb *4 + meal.fat *9  + meal.protein *4;
        if (!index[meal.date]) {
            index[meal.date] = {
              y: Number(totalCalo),
              x: Number(meal.date.split("-",1))  - 1
             
            };
          } else {
            index[meal.date].y =
            index[meal.date].y + Number(totalCalo);
          }
         } );


    Object.keys(index).forEach(key => {
      valueChart.push({
        y: index[key].y,
        x: index[key].x,
      });
     
    });
    
    this.setState({
        data: {
            dataSets: [
              {
                values: valueChart,
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
         
          valueChart,
     
    
    });
  };

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    // console.log("event.nativeEvent",event.nativeEvent)
  }

  render() {
      
    return (
     
        <View >
            <Text>Total calo in day</Text>
            <BarChart
            style={styles.chart}
            data={this.state.data}
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
        </View>
     
    );
  }
}

const mapStateToProps = state => {
    return {
      mealList: state.mealReducer.mealList,
    
    };
  };
  export default connect(mapStateToProps, null)(MealLineChart);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    chart: {
      height:250
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
  



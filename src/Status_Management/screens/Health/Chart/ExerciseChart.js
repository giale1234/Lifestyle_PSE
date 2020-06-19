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

class ExerciseChart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: '',
      modalVisible: false,
      legend: {
        enabled: false,
        textSize: 15,
        form: 'CIRCLE',
       
        horizontalAlignment: "RIGHT",
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },

      data: {},
      
      highlights: [{x: 2}],
      description: {
        text: '',
        textSize: 15,
        textColor: processColor('darkgray'),
      },
      animation: {
        durationX: 1000,
        durationY: 1000,
        // easingX: 'EaseInCirc',
        random: Math.random(),
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
      this.props.exerciseList !== prevProps.exerciseList
    ) {
      this.chart();
    }
  }
 

  chart = () => {
    const {exerciseList} = this.props;
    const {selectedMonth} = this.state;

 
    let index = {};
 
    let valueChart = [];

    exerciseList.map(exercise => {
      if (
        selectedMonth ===
        exercise.date
          .split('-')
          .reverse()
          .join('-')
          .split('-', 2)
          .join('-')
      ) {
          if (!index[exercise.checkedIndex]) {
            index[exercise.checkedIndex] = {
              value: Number(exercise.duration) ,
              label: exercise.category.substr(6,30),
              image: exercise.category,
            };
          } else {
            index[exercise.checkedIndex].value =
            index[exercise.checkedIndex].value + Number(exercise.duration);
          }
       
    }});
    var totalTime = 0;
   
    Object.keys(index).forEach(key => {
      valueChart.push({
        value: index[key].value,
        label: index[key].label,
        image:index[key].image
      });
      totalTime = totalTime  + index[key].value
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
     
      valueChart,
      totalTime
    
    });
  };
  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    // console.log(event.nativeEvent);
  }
  render() {

    return (
 
 
     
        <Content padder> 
       <View>
       <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
            EXERCISE
          </Text>
        </View>
        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('white')}
          chartDescription={this.state.description}
          data={this.state.data}
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
            size: 20,
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
       </View>
       <View style={{flexDirection:"row", margin:20, justifyContent:"center"}}>
           <Text style={{fontSize:20, fontWeight:"bold",color:"grey"}}>Total time:</Text>
            <Text style={{fontSize:20, marginLeft:10}}>{this.state.totalTime} min</Text>
       </View>
        {this.state.valueChart.map(item => {
          return (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', borderColor:"grey", borderWidth:0.5, height:50, alignItems:"center"}}>
                   <Text style={{fontSize:17, marginLeft:30}}>{item.image}</Text>
              <Text style={{fontSize:15, fontWeight:"bold", color:"green", marginRight:40}}>{item.value} min</Text>
            </View>
          );
        })}

        </Content>

    );
  }
}

const mapStateToProps = state => {
  return {
    exerciseList: state.exerciseReducer.exerciseList,
  
    budgetList:state.budgetReducer.budgetList
  };
};
export default connect(mapStateToProps, null)(ExerciseChart);

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

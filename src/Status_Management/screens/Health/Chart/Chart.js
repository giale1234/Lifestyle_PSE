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
      totalCarb :0,
      totalProtein : 0,
      totalFat : 0,
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',
        // xValuePosition: "OUTSIDE_SLICE",
        //   yValuePosition: "OUTSIDE_SLICE",
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },

      data: {
        dataSets: [
          {
            values: [
              {value: 0, label: 'Carb'},
              {value: 0, label: 'Protein'},
              {value:0, label: 'Fat'},
              
            ],
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
     
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.chart();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (
      this.state.selectedMonth !== prevState.selectedMonth ||
      this.props.mealList !== prevProps.mealList
    ) {
      this.chart();
    }
  }
  componentWillMount() {
    console.log('componentDidUpdate');
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

    console.log(event.nativeEvent);
  }
  chart = () => {
    const {mealList} = this.props;
    const {selectedMonth} = this.state;

    let valueChart = [];
   
    var totalCarb = 0;
    var totalProtein = 0;
    var totalFat = 0;
    {mealList.filter(meal => selectedMonth ===
      meal.date
      .split('-')
      .reverse()
      .join('-')
      .split('-', 2)
      .join('-'))
      .map(meal => {
          totalCarb = totalCarb + meal.carb;
          totalProtein = totalProtein + meal.protein;
          totalFat = totalFat + meal.fat;
      })}
      this.setState({
        totalCarb,
        totalProtein,
        totalFat,
        data: {
          dataSets: [
            {
              values: [
                {value: totalCarb, label: 'Carb'},
                {value: totalProtein, label: 'Protein'},
                {value:totalFat, label: 'Fat'},
              ],
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

      })
     
      // valueChart.push(
      //   {value: totalCarb, label: "Carb"},
      //   {value: totalProtein, label: "Protein"},
      //   {value: totalFat, label: "Fat"}
        
      // );
  
    // this.setState({
    //   data: {
    //     dataSets: [
    //       {
    //         values: valueChart ,
    //         label: '',
    //         config: {
    //           colors: [
    //             processColor('#FFD000'),
    //             processColor('#FE5972'),
    //             processColor('#87DFB0'),
    //             processColor('#45C1EA'),
    //             processColor('#EE7720'),
    //           ],
    //           valueTextSize: 20,
    //           valueTextColor: processColor('green'),
    //           sliceSpace: 5,
    //           selectionShift: 13,
    //           valueFormatter: "#.#'%'",
    //           valueLineColor: processColor('green'),
    //           valueLinePart1Length: 0.5,
    //         },
    //       },
    //     ],
    //   },  
    //   valueChart,  
    // });
  };

  render() {
    var  {totalCarb, totalProtein, totalFat} = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{flex: 1}}>
            <Title style={styles.headerText}>Health</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MainTracker')}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
                Back
              </Text>
            </Button>
          </Right>
        </Header>
        <Content padder> 
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                current={this.state.selectedMonth.split('-').join(' ')}
                mode="monthYear"
                selectorStartingYear={2000}
                onMonthYearChange={selectedDate =>
                  this.setState({
                    selectedMonth: selectedDate.split(' ').join('-'),
                  })
                }
                style={styles.datePicker}
              />
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  this.setState({modalVisible: false});
                }}>
                <Text style={styles.textStyle}> OK </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            this.setState({modalVisible: true});
          }}>
          <Text style={styles.textStyle}>
            {this.state.selectedMonth
              .split('-')
              .reverse()
              .join('-')}
          </Text>
        </TouchableOpacity>
        

        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
            MEAL
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
          entryLabelTextSize={20}
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
     
   
        
    

        </Content>
  </Container>

    );
  }
}

const mapStateToProps = state => {
  return {
    mealList: state.mealReducer.mealList,
    exerciseEdit: state.exerciseReducer.exerciseEdit,
    budgetList:state.budgetReducer.budgetList
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

 {/* <View style={{flexDirection:"row", alignItems:"center"}}>
              <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Total Calo:</Text>
              <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalCarb +totalProtein + totalFat}</Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
              <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Carb:</Text>
              <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalCarb}</Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
              <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Protein:</Text>
              <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalProtein}</Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
              <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Fat:</Text>
              <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalFat}</Text>
          </View> */}
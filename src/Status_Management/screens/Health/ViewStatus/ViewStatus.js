import React, {Component} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import moment from 'moment';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
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
    Card,
    CardItem,
    ListItem, 
    List
  } from 'native-base';

  const waterGlass_active =  require('../../../../../assets/waterBottle_on.png');
  const  waterGlass_inactive = require('../../../../../assets/waterBottle.off.png');


class ViewStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      totalTime: 0,
      // active:false
      id: '', 
      duration: 0,  
      category: '',
    };
  }
  
  componentDidMount() {
    var date = moment().format('DD-MM-YYYY');
    this.setState({
    date,
    });
  }
  
  onPressBottle = (id) =>{
    this.setState({
      numOfBottle:id
    })
  }
 
  render() {
    
    const {exerciseList, mealList} = this.props;
    var totalTime = 0;
    var totalCarb = 0;
    var totalProtein = 0;
    var totalFat = 0;
    function calTotalCalo (){
        return totalCarb * 4 + totalProtein * 4 + totalFat * 9;
    }
    function calCalo (carb, protein, fat){
        return carb * 4 + protein * 4 + fat * 9;
    }

    return (
      <>
      {/* Header */}
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
              <Text style={{fontWeight: 'bold', color:"white", fontSize:18}}>Back</Text>
            </Button>
          </Right>
        </Header>

      {/* Date Picker */}
       <View >
       <DatePicker
              style={{width: 385, margin: 5,}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-1-1000"
              maxDate="01-1-3000"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 350,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                //   marginLeft: -30,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
              androidMode="spinner"
            />
       </View>
       
       {/* //Date */}
       <View style={{alignItems:"center"}}>
            <Text style={{fontSize:30, fontWeight:"bold", color:"#FE6623"}}>{this.state.date.split("-").join("/")}</Text>

       </View>
        {/* //Weight - Height */}
        <View style={{flexDirection:"row", justifyContent: 'space-around', margin:5, paddingBottom:15,borderBottomWidth:1, borderBottomColor:"grey"}}>
            <View style={{flexDirection:"row"}}>
            <Text style={{fontSize:23, fontWeight:"bold", color:"grey", marginRight:10}}>Weight:</Text>
            <Text style={{fontSize:23, fontWeight:"bold", color:"black"}}>48 kg</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            
            <Text style={{fontSize:23, fontWeight:"bold", color:"grey",marginRight:10}}>Height:</Text>
                <Text style={{fontSize:23, fontWeight:"bold", color:"black"}}>168 cm</Text>
            </View>
        </View>


        <ScrollView style={{flex: 1}}>

        {/* Water */}
        <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'space-around',
              backgroundColor: '#F7FADE',
              borderColor: 'grey',
              borderWidth: 1,
              height: 50,
              marginTop:20
            }}>
            <Text
              style={{
                fontSize: 23,
                marginTop: 12,
                fontWeight: 'bold',
                color: '#FE6623',
                marginLeft: 25,
                
              }}>
              WATER
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 180, marginTop: 6}}>
              <Text style={{fontSize: 20, marginTop: 5, color: 'grey'}}>
                Total:     
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  marginTop: 0,
                  color: '#84B268',
                  fontWeight: 'bold',
                    marginLeft:10
                }}>
                {totalTime} l
              </Text>
            </View>
          </View>
          <View style={{marginVertical:10, marginLeft:10, alignItems:"center", flexDirection:"row", flexWrap:"wrap"}} numberOfLines={2}>
            
          {/* <TouchableOpacity onPress={this.onPressBottle}>
            {this.state.active ? <Image source={waterGlass_active} style={{height:50, width:50}} /> :<Image source={waterGlass_inactive} style={{height:50, width:50}} /> }
          </TouchableOpacity> */}
          {/* {this.state.bottle.map(item=>{
            return(
              <TouchableOpacity onPress={this.onPressBottle(item.id)} style={{ margin:10}}>
              {item.active ? <Image source={waterGlass_active} style={{height:50, width:50}} /> :<Image source={waterGlass_inactive} style={{height:50, width:50}} /> }
            </TouchableOpacity>
            )
          })} */}
       
          </View>

        
        {/* MEAL */}
        {mealList
            .filter(meal => meal.date === this.state.date)
            .map(meal => {
                totalCarb = totalCarb + meal.carb;
                totalProtein = totalProtein + meal.protein;
                totalFat = totalFat + meal.fat;
            })}

        <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'space-around',
              backgroundColor: '#F7FADE',
              borderColor: 'grey',
              borderWidth: 1,
              height: 50,
            }}>
            <Text
              style={{
                fontSize: 23,
                marginTop: 6,
                fontWeight: 'bold',
                color: '#FE6623',
                marginLeft: 25,
              }}>
              NUTRITION
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 35, marginTop: 6}}>
              <Text style={{fontSize: 20, marginTop: 4, color: 'grey'}}>
                Total calo:     
              </Text>
              <Text
                style={{
                  fontSize: 25,
              
                  color: '#84B268',
                  fontWeight: 'bold',
                    marginLeft:10
                }}>
                {calTotalCalo()} cal
              </Text>
            </View>
          </View>
          <View
            style={{

              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
       

            <View style={{flexDirection:"row"}}>
                <View style={{height:20, width:20, borderRadius:10, backgroundColor:"#00A4D3", margin:3}}/>
                <Text style={styles.text}>Carb </Text>
            </View >
<           View style={{flexDirection:"row"}}>
                <View style={{height:20, width:20, borderRadius:10, backgroundColor:"#F06E9C", margin:3}}/>
                <Text style={styles.text}>Protein</Text>
            </View>
            <View style={{flexDirection:"row"}}>
                <View style={{height:20, width:20, borderRadius:10, backgroundColor:"#f4c348", margin:3}}/>
                <Text style={styles.text}>Fat </Text>
            </View>
          </View>
          <View
            style={{

              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
          
                <Text style={styles.incomeText}> {totalCarb}</Text>
          
                <Text style={styles.expenseText}> {totalProtein}</Text>
           
                <Text style={styles.totalText}>{totalFat}</Text>
            
          </View>

          {mealList
            .filter(meal => meal.date === this.state.date)
            .map(meal => {
              return (

                <TouchableOpacity 
                // onPress={() => this.props.deleteMeal(meal)} 
                onPress={()=>{
                  this.props.editMeal(meal);
                  this.props.navigation.push("Meal");
                }}
                >
                      <View style={{ 
                    justifyContent: 'space-around',
                    backgroundColor: 'white',
                    borderTopColor: 'grey',
                    borderTopWidth: 1,
                  alignItems:"center",
                    height: 55,
                    flexDirection: 'row',
                    marginVertical:1
                  
                    }}>

                    <View style={{width:120}}>
                        <Text numberOfLines={1}  style={{fontSize: 20}}>{meal.name}</Text>
                    </View>
                    <View style={{flexDirection:"row",width:40}}>
                        <View style={{height:20, width:20, borderRadius:10, backgroundColor:"#00A4D3", margin:3}}/>
                        <Text style={{fontSize: 15}}>{meal.carb}</Text>
                    </View >
                    <View style={{flexDirection:"row",width:40}}>
                        <View style={{height:20, width:20, borderRadius:10, backgroundColor:"#F06E9C", margin:3}}/>
                        <Text style={{fontSize: 15}}>{meal.protein}</Text>
                    </View>
                    <View style={{flexDirection:"row",width:40}}>
                        <View style={{height:20, width:20, borderRadius:10, backgroundColor:"#f4c348", margin:3}}/>
                        <Text style={{fontSize: 15}}>{meal.fat}</Text>
                  </View>
                  <Text style={{fontSize: 20, color:"green",fontWeight:"bold" }}>{calCalo(meal.carb, meal.protein, meal.fat) }</Text>
                  </View>
                </TouchableOpacity>
            
              );
            })}
     
       {/* EXERCISE */}


          {exerciseList
            .filter(exercise => exercise.date === this.state.date)
            .map(exercise => {
              totalTime = totalTime + exercise.duration;
            })}

          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'space-around',
              backgroundColor: '#F7FADE',
              borderColor: 'grey',
              borderWidth: 1,
              height: 50,
              marginTop:20
            }}>
            <Text
              style={{
                fontSize: 23,
                marginTop: 12,
                fontWeight: 'bold',
                color: '#FE6623',
                marginLeft: 25,
                
              }}>
              EXERCISE
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 85, marginTop: 6}}>
              <Text style={{fontSize: 20, marginTop: 10, color: 'grey'}}>
                Total time:     
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  marginTop: 6,
                  color: '#84B268',
                  fontWeight: 'bold',
                    marginLeft:10
                }}>
                {totalTime}m
              </Text>
            </View>
          </View>

          {exerciseList
            .filter(exercise => exercise.date === this.state.date)
            .map(exercise => {
              return (

                <TouchableOpacity 
                // onPress={()=>this.props.deleteExercise(exercise)}
                onPress={()=>{this.props.editExercise(exercise); 
                  this.props.navigation.push("Exercise")
                }}
                >
                  <View style={{ 
                    justifyContent: 'space-around',
                    backgroundColor: 'white',
                    borderTopColor: 'grey',
                    borderTopWidth: 1,
                   alignItems:"center",
                    height: 55,
                    flexDirection: 'row',
                    marginBottom:1
                
                
                }}>
                  <Text style={{fontSize: 20, marginLeft:20}}>{exercise.category}</Text>
                <Right style={{marginRight:30}}>
                    <Text style={{fontSize: 20, color:"#00A4D3", fontWeight:"bold"}}>{exercise.duration} m</Text>
                </Right>
                 
                </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
       
      
      </>
    );
  }
}

const mapDisaptchToProps = dispatch => {
  return {
    //key: value
    editMeal: meal => {
      let action = {
        type: 'EDIT_M',
        meal,
      };
     
      dispatch(action);
    },

    deleteMeal: meal => {
      let action = {
        type: 'DELETE_M',
        meal,
      };
      dispatch(action);
    },
    editExercise: exercise => {
      let action = {
        type: 'EDIT_E',
        exercise,
      };
     
      dispatch(action);
    },

    deleteExercise: exercise => {
      let action = {
        type: 'DELETE_E',
        exercise,
      };
      dispatch(action);
    },
  };
};


const mapStateToProps = state => {
  return {
    exerciseList: state.exerciseReducer.exerciseList,
    mealList: state.mealReducer.mealList,
   
  };
};
export default connect(mapStateToProps, mapDisaptchToProps)(ViewStatus);

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        justifyContent: 'center',
      },
    
    text: {
        fontSize: 20,
        color: 'grey',
      },
      incomeText: {
        fontSize: 20,
        fontWeight:"bold",
        color: '#00A4D3',
      },
      expenseText: {
        fontSize: 20,
        fontWeight:"bold",
    
        color: '#F06E9C',
      },
      totalText: {
        fontSize: 20,
        fontWeight:"bold",
        color: '#f4c348',
      }
})
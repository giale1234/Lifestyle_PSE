import React, { Component } from "react";
import {StyleSheet} from 'react-native';
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
  View,
  
} from "native-base";


/* React-navigation necessities import */
import {createStackNavigator} from '@react-navigation/stack';





/* Import screens */
import MainTracker from "../Status_Management/screens/MainTracker";
import Budget from "../Status_Management/screens/Budget/Budget";
import Health from "../Status_Management/screens/Health/Health";
import AddStatus from "../Status_Management/screens/Budget/AddStatus/AddStatus";
import BudgetItem from "../Status_Management/screens/Budget/ViewStatus/BudgetItem";
import Income from "../Status_Management/screens/Budget/AddStatus/Income";
import AddStatus_Health from "../Status_Management/screens/Health/AddStatus/AddStatus"
import Exercise from "../Status_Management/screens/Health/AddStatus/Exercise";
import ViewStatus_Health from "../Status_Management/screens/Health/ViewStatus/ViewStatus";
import Meal from "../Status_Management/screens/Health/AddStatus/Meal";

const Stack = createStackNavigator();
function StackNavigator() {
    return(
      <Stack.Navigator
        initialRouteName = 'MainTracker'
        headerMode = 'none'
      >
        <Stack.Screen name = 'MainTracker' component = {MainTracker}/>
        <Stack.Screen name = 'Budget' component = {Budget}/>
        <Stack.Screen name = 'Health' component = {Health}/>
        <Stack.Screen name = 'AddStatus' component = {AddStatus}/>
        <Stack.Screen name = 'BudgetItem' component = {BudgetItem}/>
        <Stack.Screen name = 'Income' component = {Income}/>

        <Stack.Screen name = 'AddStatus_Health' component = {AddStatus_Health}/>
     
        <Stack.Screen name = 'Exercise' component = {Exercise}/>
        <Stack.Screen name = 'Meal' component = {Meal}/>
        <Stack.Screen name = 'ViewStatus_Health' component = {ViewStatus_Health}/>
      </Stack.Navigator>
    )
  };

  class Tracker extends Component {
    render(){
        return (
          <Container style={styles.container}>     
            <StackNavigator/>
          </Container>
           
        );
    }
} 
   
  


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
export default Tracker;

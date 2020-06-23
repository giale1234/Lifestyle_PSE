import React, {Component} from 'react';
/* React-navigation necessities import */
import {createStackNavigator} from '@react-navigation/stack';

/* Import screens */
import MainTracker from '../Status_Management/screens/MainTracker';
import Budget from '../Status_Management/screens/Budget/Budget';
import Health from '../Status_Management/screens/Health/Health';

import BudgetItem from '../Status_Management/screens/Budget/ViewStatus/BudgetItem';
import Income from '../Status_Management/screens/Budget/AddStatus/Income';
import Exercise from '../Status_Management/screens/Health/AddStatus/Exercise';
import ViewStatus_Health from '../Status_Management/screens/Health/ViewStatus/ViewStatus';
import Meal from '../Status_Management/screens/Health/AddStatus/Meal';
import Expense from '../Status_Management/screens/Budget/AddStatus/Expense';

const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTracker" headerMode="none">
      <Stack.Screen name="MainTracker" component={MainTracker} />
      <Stack.Screen name="Budget" component={Budget} />
      <Stack.Screen name="Health" component={Health} />

      <Stack.Screen name="BudgetItem" component={BudgetItem} />
      <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Expense" component={Expense} />

      <Stack.Screen name="ViewStatus_Health" component={ViewStatus_Health} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Meal" component={Meal} />
    </Stack.Navigator>
  );
}

class Tracker extends Component {
  render() {
    return (
        <StackNavigator /> 
    );
  }
}

export default Tracker;

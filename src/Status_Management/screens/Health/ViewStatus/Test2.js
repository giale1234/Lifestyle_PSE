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

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            textProps:''
        };    
    }

    render(){
        console.log("STATE TEST ", this.state)
        return (
            <View>
                <Button onPress={this.props.editExercise("Helo")}><Text>Edit</Text></Button>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editExercise: exercise => {
            let action = {
              type: 'EDIT_E',
              exercise: "Hello"
            };
           
            dispatch(action);
          },
    };
  };
  export default connect(null, mapDispatchToProps)(Test);

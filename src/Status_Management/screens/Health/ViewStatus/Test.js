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
            text: ""
        };    
    }
    
    // UNSAFE_componentWillReceiveProp(nextProps) {
    //   console.log("UNSAFE_componentWillReceiveProps")
    //   if (nextProps && nextProps.exerciseEdit) {
    //     this.setState({
    //         text: nextProps.exerciseEdit
    //     });
        
    //   } 
    // }
    componentWillMount() {
        // console.log("UNSAFE_componentWillReceiveProps")
        // if (this.props.exerciseEdit !== prevProps.exerciseEdit ) {
          this.setState({
              text: this.props.exerciseEdit
          });
          
        // } 
      }
    
    render(){
       
        return (
            <View>
                <Text>{this.state.text}</Text>   
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        exerciseEdit: state.exerciseReducer.exerciseEdit
    };
  };

  export default connect(mapStateToProps, null)(Test);

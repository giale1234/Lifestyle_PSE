import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import {  Text, View, TextInput, StyleSheet } from 'react-native'
import { Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { tsObjectKeyword } from '@babel/types';

let obj = [
    {
        name: 'Gia Le',
        age: 18,
        
    },
    {
        name: 'Chris',
        age: 30,
        
    },
    
];

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
           obj:[] 
        }
    }
    componentDidMount(){
        this.getStorage()
    }
    buttonClick = () => {
       this.saveStorage();
    //    console.log("this.state", this.state)
    }
    saveStorage = async() => {
        const jsonValue = JSON.stringify(obj)
        await AsyncStorage.setItem('obj', jsonValue)
    }
    
    getStorage = async() => {
       if(AsyncStorage.getItem("obj")){
        var obj = await AsyncStorage.getItem("obj");
        this.setState({
             obj,
        })
       
       }
       console.log("this.state.obj",this.state.obj)
     
    }
    
   render() {

 
      return (
         <View style = {styles.container}>
            {/* <TextInput style = {styles.textInput} autoCapitalize = 'none'
            onChangeText = {this.setName}/> */}

        <Button onPress={this.buttonClick}><Text>OK</Text></Button>
               
                <Text>{obj[1].name}</Text>
                   
         </View>

      )
   }
}
export default Test



const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   textInput: {
      margin: 5,
      height: 40,
      width:300,
      borderColor:"grey",
      borderWidth:1
   }
})

// import React, { Component } from 'react'
// import { StatusBar } from 'react-native'
// import {  Text, View, TextInput, StyleSheet } from 'react-native'
// import { Button } from 'native-base';
// import AsyncStorage from '@react-native-community/async-storage';
// import { tsObjectKeyword } from '@babel/types';

// let obj = [
//     {
//         name: 'Gia Le',
//         age: 18,
        
//     },
//     {
//         name: 'Chris',
//         age: 30,
        
//     },
    
// ];

// class Test extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//            obj:[] 
//         }
//     }
//     componentDidMount(){
//         this.getStorage()
//     }
//     buttonClick = () => {
//        this.saveStorage();
//     //    console.log("this.state", this.state)
//     }
//     saveStorage = async() => {
//         const jsonValue = JSON.stringify(obj)
//         await AsyncStorage.setItem('obj', jsonValue)
//     }
    
//     getStorage = async() => {
//        if(AsyncStorage.getItem("obj")){
//         var obj = await AsyncStorage.getItem("obj");
//         this.setState({
//              obj,
//         })
       
//        }
//        console.log("this.state.obj",this.state.obj)
     
//     }
    
//    render() {

 
//       return (
//          <View style = {styles.container}>
//             {/* <TextInput style = {styles.textInput} autoCapitalize = 'none'
//             onChangeText = {this.setName}/> */}

//         <Button onPress={this.buttonClick}><Text>OK</Text></Button>
               
//                 <Text>{obj[1].name}</Text>
                   
//          </View>

//       )
//    }
// }
// export default Test



// const styles = StyleSheet.create ({
//    container: {
//       flex: 1,
//       alignItems: 'center',
//       marginTop: 50
//    },
//    textInput: {
//       margin: 5,
//       height: 40,
//       width:300,
//       borderColor:"grey",
//       borderWidth:1
//    }
// })
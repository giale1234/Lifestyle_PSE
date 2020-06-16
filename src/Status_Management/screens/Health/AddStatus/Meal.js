
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Picker,
  
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'; 
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  
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
  Form,
  Item,
  Label,
  Input,
  Textarea,
  Card,
  CardItem,
} from 'native-base';
import { Slider } from 'react-native-elements';

 class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      date: '',
      name: '',  
      carb: 0,
      protein:0,
      fat:0, 
      filePath: {},
      isUpload: false
    };
  
  }
  componentWillReceiveProps(prevProps) {
    if (prevProps && prevProps.mealEdit) {
      this.setState({
        id: prevProps.mealEdit.id,
        date: prevProps.mealEdit.date,
        name: prevProps.mealEdit.name,  
        carb: prevProps.mealEdit.carb,
        protein: prevProps.mealEdit.protein,
        fat: prevProps.mealEdit.fat,
      });
    } else {
      this.setState({
        id: '',
        name: '',  
        carb: 0,
        protein:0,
        fat:0, 
      });
    }
  }
  
  componentDidMount() {

    var currentDate = moment().format("DD-MM-YYYY");
    this.setState({
      //Setting the value of the date time
      date:currentDate 
    });
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          isUpload : true
        });
      }
    });

  };
  showImage = () => {
    if (this.state.isUpload === true){
      return(
       <View>
          <Image
       
       source={{ uri: this.state.filePath.uri }}
       style={{ width: 370, height: 250, marginTop:40 }}
       s
       />
       </View>
      )
    }
   
  }
  handleOnChange = (text,name) => {
    this.setState({
      [name]: text,
    });

  };
  handleOnSubmit = () => {
    if (this.state.name === '' ){
      alert('Please enter name !!!')
    }else if (this.state.carb === '' || this.state.protein === ''||this.state.fat === '' ){
      alert('Please choose nutrition intake !!!')
    }else{
      var currentDate = moment().format("DD-MM-YYYY");
    
      this.props.onSubmit(this.state);
      this.setState({
        id: '',
        date: currentDate,
        name: '',
        carb: 0,
        protein:0,
        fat:0, 
      })
    }
  };


  render() {
    var {mealEdit} = this.props;
     console.log("mealEdit", this.props.mealEdit)
    
   
    return (
      <Content padder>
        <Form>
          <Item stackedLabel style={{borderColor: 'white'}}>
            <Label>Date:</Label>
            <DatePicker
              style={{width: 300, marginTop: 10}}
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
                  left: 300,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: -30,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
              androidMode="spinner"
            />
          </Item>
        </Form>

        <Form>
          <Item stackedLabel>
            <Label>Name: </Label>
            <Item regular style={{marginTop: 10}}>
              <Input
                style={{height: 45}}
                placeholder="Name ...."
                // onChangeText={(text) => this.handleOnChange(text,'name')}
                 onChangeText={(text) => this.setState({name:text})}
                value={this.state.name}
                name="name"
              />
            </Item>
          </Item>
        </Form>
        
        <View style={styles.container}>
        <View style={styles.container}>
       
          {this.showImage()}
          
         
        <View  style={{flexDirection:"row", margin:20, alignItems:"center"}}>
          <Label>Image: </Label>
        <TouchableOpacity onPress={this.chooseFile.bind(this)} style={{borderColor:"grey", borderWidth:1, borderRadius:5, height:35, width:100, alignItems:"center", justifyContent:"center", marginLeft:20}}> 
            <Text >Choose File</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>


        
        <Label style={{color: '#fa8100',fontWeight:"bold", fontSize: 20, margin: 20, marginTop:30}}>
          CARB (g):
        </Label>
     
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
                value={this.state.carb}
                onValueChange={value => this.setState({carb: value })}
                step={1}
                minimumValue={0}
                maximumValue={100}
                maximumTrackTintColor="#FFD3B5"
                thumbTintColor="#FE4365"
                style={{margin:10}}
            />
            <Text>Value: {this.state.carb}</Text>
            </View>

            <Label style={{color: '#fa8100',fontWeight:"bold", fontSize: 20, margin:20}}>
          PROTEIN (g):
        </Label>
     
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
                value={this.state.protein}
                onValueChange={value => this.setState({protein: value })}
                step={1}
                minimumValue={0}
                maximumValue={100}
                maximumTrackTintColor="#FFD3B5"
                thumbTintColor="#FE4365"
                style={{margin:10}}
               
            />
            <Text >Value: {this.state.protein}</Text>
            </View>


            <Label style={{color: '#fa8100',fontWeight:"bold", fontSize: 20, margin: 20}}>
          FAT (g):
        </Label>
     
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
                value={this.state.fat}
                onValueChange={value => this.setState({ fat:value })}
                step={1}
                minimumValue={0}
                maximumValue={100}
                maximumTrackTintColor="#FFD3B5"
                thumbTintColor="#FE4365"
                style={{margin:10}}
            />
            <Text>Value: {this.state.fat}</Text>
            </View>

        
      <Button
          block
          style={{margin: 15, marginTop: 50}}
          onPress={this.handleOnSubmit}>
          <Text>SUBMIT</Text>
        </Button>

        <View>
            <Text>{mealEdit.id}</Text>
            <Text>{mealEdit.date}</Text>
            <Text>{mealEdit.name}</Text>
            <Text>{mealEdit.carb}</Text>
            <Text>{mealEdit.protein}</Text>
            <Text>{mealEdit.fat}</Text>
        </View>

      
      </Content>
   
            
       
    );
  }
}
const mapDispatchToProps = dispatch => {
    return {
      onSubmit: meal => {
        let action = {
          type: 'SUBMIT_M',
          meal,
        };
        dispatch(action);
      },
    };
  };
  
  const mapStateToProps = state => {
    return {
      mealEdit: state.mealReducer.mealEdit
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Meal);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  groupBox: {
    flexDirection: 'row',
    marginTop: 20,
  },
  flatlist: {
    marginLeft: -10,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 100,
    height: 100,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 13,
  },
  image: {
    height: 52,
    width: 52,
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    margin: 5,
  },
  button: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'orange',
    width: 150,
    height: 45,
    marginLeft: 220,
    marginTop: 10,
  },
  textbtn: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});



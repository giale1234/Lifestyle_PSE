
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
  var icon_close = "../../../../../assets/close_icon.png"
  
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
      date:  moment().format('DD-MM-YYYY'),
      name: '',  
      carb: 0,
      protein:0,
      fat:0, 
      filePath: {},
      isUpload: false
    };
  
  }
  componentWillMount() {
    if (this.props.mealEdit) {
      this.setState({
        id: this.props.mealEdit.id,
        date: this.props.mealEdit.date,
        name: this.props.mealEdit.name,
        carb: this.props.mealEdit.carb,
        protein: this.props.mealEdit.protein,
        fat: this.props.mealEdit.fat,
        filePath: this.props.mealEdit.filePath,
        isUpload:this.props.mealEdit.isUpload
      });
    }
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: './',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        const source =  response.customButton;
        this.setState({
          filePath: source,
          isUpload : true
        });
        // alert(response.customButton);
      } else {

        let source = response;
        // You can also display the image using data:
     
        this.setState({
          filePath: source,
          isUpload : true
        });
      }
    });

  };
  showImage = () => {
    console.log("isUpload", this.state.isUpload)
    if (this.state.isUpload === true){
      return(
       <View>
          <Image
       source={{ uri: this.state.filePath.uri }}
       style={{ width: 370, height: 250, marginTop:40 }}
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
      this.props.deleteMealEdit();
      this.setState({
        id: '',
        date: currentDate,
        name: '',
        carb: 0,
        protein:0,
        fat:0, 
        filePath: {},
      })
    }
  };


  render() {
    var {mealEdit} = this.props;
     console.log("mealEdit", this.props.mealEdit)
    
   
    return (
      <Content padder style={{backgroundColor:"white"}}>
         {this.props.mealEdit ? (
       <View>
            <TouchableOpacity style={{marginLeft:330, marginTop:20}} onPress={() => {
                this.props.navigation.goBack(), this.props.deleteMealEdit()}}>
            <Image source={require(icon_close)} style={{height:30, width:30}}  />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: '#ffbf00',
                margin: 20,
                marginTop:20
              }}>
              EDIT MEAL
            </Text>
          </View>
       </View>
        ) : null}

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

         {this.props.mealEdit ? (
          <View style={{flexDirection: 'row', justifyContent:"center"}}>
            <Button
              block
              style={{margin: 15, marginTop: 50}}
              onPress={ () => {this.handleOnSubmit(); this.props.deleteMealEdit();this.props.navigation.goBack()} }
              >
              <Text>SUBMIT</Text>
            </Button>
            <Button
              block
              style={{margin: 15, marginTop: 50}}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteMealEdit();
              }}>
              <Text>Close</Text>
            </Button>
          </View>
        ) : (
          <Button
            block
            style={{margin: 15, marginTop: 50}}
            onPress={this.handleOnSubmit}>
            <Text>SUBMIT</Text>
          </Button>
        )} 


       

      
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
      deleteMealEdit: () => {
        let action = {
          type: 'EDIT_M',
          exercise: null,
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



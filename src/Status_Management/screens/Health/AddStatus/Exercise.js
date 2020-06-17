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
import {Slider} from 'react-native-elements';

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      date: moment().format('DD-MM-YYYY'),
      duration: 0,
      category: '',
      checkedIndex: '',
    };
  }

  componentWillMount() {
    if (this.props.exerciseEdit) {
      this.setState({
        id: this.props.exerciseEdit.id,
        date: this.props.exerciseEdit.date,
        duration: this.props.exerciseEdit.duration,
        category: this.props.exerciseEdit.category,
      });
    }
  }

  handleOnChange = (text, name) => {
    this.setState({
      [name]: text,
    });
  };
  handleOnSubmit = () => {
    if (this.state.duration === 0) {
      alert('Please enter the amount of time !!!');
    } else if (this.state.category === '') {
      alert('Please choose category !!!');
    } else {
      var currentDate = moment().format('DD-MM-YYYY');

      this.props.onSubmit(this.state);
      this.setState({
        id: '',
        date: currentDate,
        duration: 0,
        category: '',
        checkedIndex: '',
      });
    }
  };

  render() {
    console.log('state', this.state);

    let {exerciseEdit} = this.props;
    console.log('exerciseEdit', this.props.exerciseEdit);
    return (
      <Content padder>
        {this.props.exerciseEdit ? (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: 'blue',
                margin: 20,
              }}>
              EDIT{' '}
            </Text>
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

        <Label
          style={{
            color: '#fa8100',
            fontWeight: 'bold',
            fontSize: 20,
            margin: 20,
            marginTop: 30,
          }}>
          Duration (min):
        </Label>
        <Slider
          value={this.state.duration}
          onValueChange={value => this.setState({duration: value})}
          step={1}
          minimumValue={0}
          maximumValue={600}
          // maximumTrackTintColor="#FFD3B5"
          thumbTintColor="#FE4365"
          style={{margin: 10}}
        />
        <Text style={{marginLeft: 30}}>Value: {this.state.duration} min</Text>

        <Label style={{color: 'grey', fontSize: 20, margin: 10}}>
          Category:
        </Label>

        <View style={{borderColor: 'grey', borderWidth: 1, marginLeft: 15}}>
          <Picker
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue, checkedIndex: itemIndex})
            }>
            <Picker.Item label="Select activity ..." value="" />
            <Picker.Item label="🚴‍♂️  Cycling" value="🚴       Cycling" />
            <Picker.Item
              label="🏈  American Football"
              value="🏈       American Football"
            />
            <Picker.Item label="🏸 Badminton" value="🏸       Badminton" />
            <Picker.Item label="🏀  Basketball" value="🏀       Basketball" />
            <Picker.Item
              label="🥊  Boxing Glove"
              value="🥊       Boxing Glove"
            />
            <Picker.Item label="🎳  Bowling" value="🎳       Bowling" />
            <Picker.Item label="🧗‍♂️ Climbing" value="🧗‍♂️       Climbing" />
            <Picker.Item label="💃  Dancing" value="💃       Dancing" />
            <Picker.Item label="⚽  Football" value="⚽      Football" />
            <Picker.Item label="🏌️  Golf" value="🏌️       Golf" />
            <Picker.Item label="🏋️‍♂️  Gym" value="🏋️       Gym‍" />
            <Picker.Item label="🏓  Ping Pong" value="🏓       Ping Pong" />
            <Picker.Item
              label="🏇  Horse Racing"
              value="🏇       HorseRacing"
            />
            <Picker.Item label="🚣  Rowing Boat" value="🚣       RowingBoat" />
            <Picker.Item label="🏃🏿‍♂️  Running" value="🏃🏿‍♂️       Running" />
            <Picker.Item label="🏐  Volleyball" value="🏐       Voleyball" />
            <Picker.Item label="🚶 Walking" value="🚶       Walking" />
            <Picker.Item label="🏊‍♂️  Swimming" value="🏊‍♂️       Swimming" />
            <Picker.Item label="🏄  Surfing" value="🏄       Surfing" />
            <Picker.Item
              label="🏂   Snowboarder"
              value="🏂       Snowboarder"
            />
            <Picker.Item label="🧘  Yoga" value="🧘       Yoga" />
          </Picker>
        </View>

        {this.props.exerciseEdit ? (
          <View style={{flexDirection: 'row', justifyContent:"center"}}>
            <Button
              block
              style={{margin: 15, marginTop: 50}}
              onPress={
               
            this.handleOnSubmit,
            ()=>{
              this.props.navigation.goBack()
            }
              }>
              <Text>SUBMIT</Text>
            </Button>
            <Button
              block
              style={{margin: 15, marginTop: 50}}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteExerciseEdit();
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
    onSubmit: exercise => {
      let action = {
        type: 'SUBMIT_E',
        exercise,
      };
      dispatch(action);
    },
    deleteExerciseEdit: () => {
      let action = {
        type: 'EDIT_E',
        exercise: null,
      };
      dispatch(action);
    },
  };
};

const mapStateToProps = state => {
  return {
    exerciseEdit: state.exerciseReducer.exerciseEdit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);

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

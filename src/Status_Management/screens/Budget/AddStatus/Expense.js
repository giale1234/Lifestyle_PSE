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
} from 'react-native';
import DatePicker from 'react-native-datepicker';
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
  Text,
  Form,
  Item,
  Label,
  Input,
  Textarea,
  Card,
  CardItem,
} from 'native-base';

const DATA = [
  {
    id: 0,
    src: require('../../../../../assets/food_icon.png'),
    title: 'Food',
  },
  {
    id: 1,
    src: require('../../../../../assets/health_icon.png'),
    title: 'Health',
  },
  {
    id: 2,
    src: require('../../../../../assets/shopping_icon.png'),
    title: 'Shopping',
  },
  {
    id: 3,
    src: require('../../../../../assets/car_icon.png'),
    title: 'Transport',
  },
  {
    id: 4,
    src: require('../../../../../assets/house_icon.png'),
    title: 'Home',
  },
  {
    id: 5,
    src: require('../../../../../assets/utilities_icon.png'),
    title: 'Utilities',
  },
  {
    id: 6,
    src: require('../../../../../assets/book_icon.png'),
    title: 'Education',
  },
  {
    id: 7,
    src: require('../../../../../assets/entertain_icon.png'),
    title: 'Entertain',
  },
  {
    id: 8,
    src: require('../../../../../assets/other_icon.png'),
    title: 'Other',
  },
];

 class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      id: '',
      date: '',
      note: '',
      amount: '',
      type:'Expense',
      category: '',
      categoryImage: '',
      checkedIndex: '',
    };
  
  }
 
  componentDidMount() {

    var currentDate = moment().format("DD-MM-YYYY");
    this.setState({
      //Setting the value of the date time
      date:currentDate ,
    });
  }
  handleOnChange = (text,name) => {
    this.setState({
      [name]: text,
    });

  };
  handleOnSubmit = () => {
    if (this.state.amount === '' ){
      alert('Amount must not be empty !!!')
    }else if (this.state.checkedIndex === '' ){
      alert('Please choose category !!!')
    }else{
      var currentDate = moment().format("DD-MM-YYYY");
 
      this.props.onSubmit(this.state);
      this.setState({
        id: '',
        date: currentDate,
        note: '',
        amount: '',
        type:'Income',
        category: '',
        categoryImage: '',
        checkedIndex: '',
      })
    }
  };

  
  render() {
    console.log("edit expense",this.props.budgetEdit);
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
            <Label>Note:</Label>
            <Item regular style={{marginTop: 10}}>
              <Input
                style={{height: 45}}
                placeholder="Description here..."
                onChangeText={(text) => this.handleOnChange(text,'note')}
                value={this.state.note}
                name="note"
              />
            </Item>
          </Item>
        </Form>
        <Form>
          <Item stackedLabel>
            <Label>Amount:</Label>
            <Item regular style={{marginTop: 10}}>
              <Input
                keyboardType="numeric"
                style={{height: 45}}
                placeholder="Enter the income here..."
                onChangeText={text => this.handleOnChange(text, 'amount')}
                value={this.state.amount}
              />
            </Item>
          </Item>
        </Form>

        <Label style={{color: 'grey', fontSize: 20, margin: 10}}>
          Category:
        </Label>
        <SafeAreaView>
          <FlatList
            style={styles.flatlist}
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    category: item.title,
                    categoryImage: item.src,
                    checkedIndex: item.id,
                  })
                }
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      this.state.checkedIndex === item.id ? 'yellow' : 'white',
                  },
                ]}>
                <Image source={item.src} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </SafeAreaView>
        <Button
          block
          style={{margin: 15, marginTop: 50}}
          onPress={this.handleOnSubmit}>
          <Text>SUBMIT</Text>
        </Button>
      </Content>
    );
  }
}
const mapDispatchToProps = dispatch => {
    return {
      onSubmit: budget => {
        let action = {
          type: 'SUBMIT',
          budget: budget,
        };
        dispatch(action);
      },
    };
  };
  
  const mapStateToProps = state => {
    return {
      budgetEdit: state.budgetReducer.budgetEdit
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Expense);
  
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

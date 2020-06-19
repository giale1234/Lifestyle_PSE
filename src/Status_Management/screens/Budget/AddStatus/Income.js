


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
  TextInput
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

var icon_close = "../../../../../assets/close_icon.png"

const DATA = [
    {
      id: 9,
      src: require('../../../../../assets/salary_icon.png'),
      title: 'Salary',
    },
    {
      id: 10,
      src: require('../../../../../assets/award_icon.png'),
      title: 'Awards',
    },
    {
      id: 11,
      src: require('../../../../../assets/investment_icon.png'),
      title: 'Investment',
    },
    {
      id: 12,
      src: require('../../../../../assets/grant-icon.png'),
      title: 'Grants',
    },
    {
      id: 13,
      src: require('../../../../../assets/rental_icon.png'),
      title: 'Rental',
    },
    {
      id: 14,
      src: require('../../../../../assets/other_icon.png'),
      title: 'Others',
    },
    
  ];

 class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      id: '',
      date: moment().format("DD-MM-YYYY"),
      note: '',
      amount: '',
      type:'Income',
      category: '',
      categoryImage: '',
      checkedIndex: '',
    };
  
  }
  componentDidMount() {
   
    var currentDate = moment().format("DD-MM-YYYY");
    const {budgetEdit} = this.props;
    
    if(budgetEdit){
      this.setState({
        id: budgetEdit.id,
        date: currentDate,
        note: budgetEdit.note,
        amount: budgetEdit.amount,
        type: budgetEdit.type,
        category: budgetEdit.category,
        categoryImage: budgetEdit.categoryImage,
        checkedIndex: budgetEdit.checkedIndex,
      
      })
    }else{
      this.setState({
        //Setting the value of the date time
        date:currentDate 
      });
    }
  }
  componentWillMount() {
   
    if (this.props.budgetEdit) {
      this.setState({
        id: this.props.budgetEdit.id,
        date: this.props.budgetEdit.date,
        note: this.props.budgetEdit.note,
        amount: this.props.budgetEdit.amount,
        type: this.props.budgetEdit.type,
        category: this.props.budgetEdit.category,
        categoryImage: this.props.budgetEdit.categoryImage,
        checkedIndex: this.props.budgetEdit.checkedIndex,
      });
    }
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

      this.props.deleteBudgetEdit();
 
      this.props.onSubmit(this.state);
      this.setState({
        id: '',
        date: currentDate,
        note: '',
        amount: 0,
        type:'Income',
        category: '',
        categoryImage: '',
        checkedIndex: '',
      })
    }
  };


  render() {
    console.log("edit income",this.props.budgetEdit);
    console.log("edit income state",this.state);
    return (
      <Content padder>

    {this.props.budgetEdit ? (
       <View>
            <TouchableOpacity style={{marginLeft:330, marginTop:20}} onPress={() => {
                this.props.navigation.goBack(), this.props.deleteBudgetEdit()}}>
            <Image source={require(icon_close)} style={{height:30, width:30}}  />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: '#ffbf00',
                marginBottom: 20,
                // marginTop:20
              }}>
              EDIT INCOME
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
            <Label>Note:</Label>
            <Item regular style={{marginTop: 10}}>
              <TextInput
                style={{height: 45, width:360}}
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
              <TextInput
                keyboardType="numeric"
                style={{height: 45, width:360}}
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
       
        {this.props.budgetEdit ? (
          <View style={{flexDirection: 'row', justifyContent:"center"}}>
            <Button
              block
              style={{margin: 15, marginTop: 50}}
              onPress={ () => {this.handleOnSubmit(); this.props.deleteBudgetEdit();this.props.navigation.goBack()} }
              >
              <Text>SUBMIT</Text>
            </Button>
            <Button
              block
              style={{margin: 15, marginTop: 50}}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteBudgetEdit();
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
      onSubmit: budget => {
        let action = {
          type: 'SUBMIT',
          budget,
        };
        dispatch(action);
      },
      deleteBudgetEdit: () => {
        let action = {
          type: 'EDIT',
          exercise: null,
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
  export default connect(mapStateToProps, mapDispatchToProps)(Income);
  
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

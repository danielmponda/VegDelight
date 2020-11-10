import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
    Button
  } from 'react-native';

  import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
  import firebase from 'react-native-firebase';


  const {width: WIDTH} = Dimensions.get('window');
  import bgImage from './images/background.jpg' 
  import reservationImg from './images/reservation.jpg' 
  import logoImage from './images/logo.png'
  import Icon from 'react-native-vector-icons/Ionicons'
  import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'


// import  {RNNumberSelector} from 'react-native-number-selector'

export default class waiterDetail extends Component  {

    constructor(props) {
        super(props)

        this.state = {
          currentUserId: firebase.auth().currentUser.uid,
          date:"",
          time:"",
          dateholder:"Date",
          timeholder:"Time",
          numberofattendees:"",
          comments: "",
          firstName: "",
          lastName:  "",
          address: "",
          email:  "",
          phoneNumber:  "",
          reorderedItems:"",
          isDatePickerVisible: false,
          isTimePickerVisible: false
        }
    }

    handleUpdateUsers = () => {

      const currentTime = new Date();
      const bookedday = this.state.date
      const bookedtime = this.state.time
      const numberofattendees = this.state.numberofattendees

      const open = new Date('2018', '11', '24', '09', '00', '00', '0');
      const close = new Date('2018', '11', '24', '21', '00', '00', '0');

      const bookedtimehour = bookedtime.getHours();
      const opentimehour = open.getHours();
      const closetimehour = close.getHours();

      

      if (bookedday >= currentTime){
        if (bookedtimehour >= opentimehour && bookedtimehour <closetimehour){  
         if(numberofattendees > 0 && numberofattendees <= 30) {
        const db = firebase.firestore();
        const updateUser = db.collection("reservation").doc()
        updateUser.set({
            currentUserId: this.state.currentUserId,
            firstName: this.state.firstName,
            lastName:  this.state.lastName,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            date:  this.state.date,
            time: this.state.time,
            numberofattendees:  this.state.numberofattendees,
            comments: this.state.comments,
            status: 'Pending',
            reorderedItems:this.state.reorderedItems
        });

        if(this.state.reorderedItems){
          var cityRef = db.collection('reOrder').doc(this.state.reorderedItems);

            var setWithMerge = cityRef.set({
                 date:  this.state.date,
                 time: this.state.time,
            }, { merge: true });
        }
      

        if(updateUser){
           this.props.navigation.goBack();
             alert("Updated sucessfully"); 
 
        } 
      }else {
        alert(" range of number of attendees 1-30")
      }
      }else {
        alert("Selected time is Closed Hours")
      }
      } else {
        alert("Please Verify you date")
      }


     

     
      }
      

      
    



    componentDidMount() {
    
      if(this.props.navigation.state.params){
        const { itemId } = this.props.navigation.state.params;
        this.setState({
          reorderedItems:itemId
        })
      } else {}

      

    

      const db = firebase.firestore();

      db.settings({timestampsInSnapshots: true})

      const myProfile = db.collection("users").doc(this.state.currentUserId)
      
      myProfile.get()
        .then(doc => {
            const data = doc.data()
            this.setState({
                    firstName: data.firstName,
                    lastName:  data.lastName,
                    address: data.address,
                    email:  data.email,
                    phoneNumber:  data.phoneNumber,
                    dob: data.dob,
                    gender: data.gender,
                  })
        })
      
}



// handleSetDateLocalState = (date) => {
//     this.setState({
//       date,
//     });
//   }

  handleSetTimeLocalState = (time) => {
    this.setState({
      time,
    });
  }

  handleSetNumberOfAttendeesLocalState = (numberofattendees) => {
    this.setState({
      numberofattendees,
    });
  }

  handleSetCommentsLocalState = (comments) => {
    this.setState({
      comments,
    });
  }

  handleTimePicked = (time) => {
    this.setState({
      isTimePickerVisible: false,
      time, 
      timeholder:moment(time).format("LT")
    })
  }

  handleDatePicked = (date) => {
    this.setState({
      isDatePickerVisible: false,
      date,
      dateholder:moment(date).format("DD-MM-YYYY")
    })
  }

  hideDatePicked = () => {
    this.setState({
      isDatePickerVisible: false
    })
  }

  hideTimePicked = () => {
    this.setState({
      isTimePickerVisible: false
    })
  }

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true
    })
  }

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true
    })
  }

  render(){
    let items = [0, 1, 2, 3, 4, 5];
    return ( 
      <ImageBackground   source={bgImage} style={styles.ImageBackgroundCon}>
        <ScrollView>
          <View style={styles.container}> 
            <StatusBar backgroundColor='black' barStyle="light-content"/>
              <View style={styles.cover}>
                  <TouchableWithoutFeedback>
                    <Image  style={styles.coverPhoto} source={coverPhoto} />
                  </TouchableWithoutFeedback>
                  <View style={styles.profilecontainer}>
                  <TouchableOpacity ><Image style={styles.itemPhoto} source={reservationImg}
       />
       </TouchableOpacity>
                          <Text style={styles.profileinfoName}> </Text>
                       
                        </View>
              
              </View>

              <View style={styles.fieldContainer}>

              <View style={styles.sectionone}>

<View style={styles.holder}>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetDateLocalState}
                    placeholder={this.state.dateholder}
                    underlineColorAndroid='transparent'
                    onFocus={this.showDatePicker}
                    Value={this.state.date}
                    maxLength={10}
                  
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                   
                />
    <DateTimePicker
                     isVisible={this.state.isDatePickerVisible}
                       onConfirm={this.handleDatePicked}
                        onCancel={this.hideDatePicked}
                        mode={'date'}
                          datePickerModeAndroid={'spinner'}
        /> 
</View>
</View>

{/* <Text style={styles.profileinfo}>Address: {this.state.address} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-time'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                 
                  
                
                onChangeText={this.handleSetTimeLocalState} 
                placeholder={this.state.timeholder}
            
                underlineColorAndroid='transparent'
                onFocus={this.showTimePicker}
               
                maxLength={8}
                 
                />

<DateTimePicker
                        isVisible={this.state.isTimePickerVisible}
                        onConfirm={this.handleTimePicked}
                        onCancel={this.hideTimePicked}
                        mode={'time'}    
                        timePickerModeAndroid={'spinner'}          
                /> 
</View>
</View>

{/* <Text style={styles.profileinfo}>Email: {this.state.email} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-people'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    // onChangeText={this.handleSetFirstNameLocalState}
                    
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    // onChangeText={this.handleSetDOBLocalState} 
                    // defaultValue={this.state.dob}
                      // defaultValue={this.state.value}
                onChangeText={this.handleSetNumberOfAttendeesLocalState} 
                placeholder="number of attendees"
               
                underlineColorAndroid='transparent'
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Phone: {this.state.phoneNumber} </Text> */}

<View style={[styles.innerres,styles.comment,]}>
<Icon style={styles.innerresa} name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput    
                    style={[styles.input,styles.textArea]}
                    // defaultValue={this.state.value}
                    // onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    // onChangeText={this.handleSetAdressLocalState} 
                    // defaultValue={this.state.address}
                    numberOfLine={7}
                    multiline={true}
                    onChangeText={this.handleSetCommentsLocalState}
                    placeholder="Comment..."
                   
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Date Of Birth: {this.state.dob} </Text> */}



{/* <Text style={styles.profileinfo}>Gender: {this.state.gender} </Text> */}



</View> 


                      
                      </View>

                      <View style={styles.logoutsec}>
                    
                    <TouchableOpacity style={styles.btnLoginh}
                            onPress={this.handleUpdateUsers}
                          >
                          <Text style={styles.btnTexth}>Book</Text>
                      </TouchableOpacity>
                                 </View>







































                 {/* <View>
                
                <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'} style={styles.inputIcon} /> 
              
                <TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    // onChangeText={this.handleSetDateLocalState}
                    // placeholder={this.state.date}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    onFocus={this.showDatePicker}
                    Value={this.state.date}
                    maxLength={10}
                   
                /> 

                <DateTimePicker
                     isVisible={this.state.isDatePickerVisible}
                       onConfirm={this.handleDatePicked}
                        onCancel={this.hideDatePicked}
                        mode={'date'}
                          datePickerModeAndroid={'spinner'}
        /> 
         </View>
        
       

          <View>
            <Icon  name={'md-time'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetTimeLocalState} 
                placeholder="Time"
                placeholderTextColor='white'
                underlineColorAndroid='transparent'
                onFocus={this.showTimePicker}
                defaultValue={this.state.time}
                maxLength={8}
               />
               <DateTimePicker
                        isVisible={this.state.isTimePickerVisible}
                        onConfirm={this.handleTimePicked}
                        onCancel={this.hideTimePicked}
                        mode={'time'}    
                        timePickerModeAndroid={'spinner'}          
                /> 
       
          </View>

        <View>


            <Icon  name={'md-people'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 

              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetNumberOfAttendeesLocalState} 
                placeholder="number of attendees"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
              />

        </View>

          <View>
            

                                     <View style={styles.textAreaContainer}>
                                            <TextInput 
                                            style={styles.textArea}
                                            onChangeText={this.handleSetCommentsLocalState}
                                            placeholder="Comment about your reservation..."
                                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                                            
                                            underlineColorAndroid='transparent'
                                          
                                            numberOfLine={7}
                                            multiline={true}
                                            />
                                        </View>

          </View>
        
     



            <TouchableOpacity style={styles.btnLogin}
                onPress={this.handleUpdateUsers}>
                <Text style={styles.btnText}>Add Reservation</Text>
            </TouchableOpacity> */}


            </View>
            
    </View>
    </ScrollView>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
    ImageBackgroundCon: {
      flex: 1,
      justifyContent: 'center',
      width: null,
      height: null,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding:0,
    },
    coverPhoto:{
      width: WIDTH,
      height: WIDTH * (9/16),
      marginBottom: -70,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 2,
      },  
      profilecontainer :{
        marginBottom: 30
      },
    fieldContainer: {
      flex:6,
      marginTop: 10,
      elevation:1,
      justifyContent: 'center',
    },
    // input:{
    //   width: WIDTH - 36,
    //   height: 45,
    //   fontSize: 16,
    //   color: 'rgba(245, 245, 245, 0.993)',
    //   backgroundColor:  'rgba(0,0,0,0.45)',
    //   marginHorizontal: 20,
    //   height: 40,
    //   paddingLeft: 45,
    //   borderRadius: 25,
    //   marginBottom: 10
    // },
    inputIcon:{
      position: 'absolute',
      top: 4,
      left:34,
    },
    btnEye:{
      position: 'absolute',
      top: 4,
      right:34,
    },
    btnLogin:{
        width: WIDTH - 36,
      height: 45,
      borderRadius: 12,
      backgroundColor: '#561a1a',
      marginHorizontal: 20,
      marginTop: 0,
      justifyContent: 'center',
      marginBottom: 15
    },
    btnText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white'
    }, 
    btnSignUpText:{
      fontSize: 14,
      color: 'white',
      textAlign: 'center'
    }, 
    button:{
      width: WIDTH - 36,
      height: 45,
      fontSize: 16,
      color: 'rgba(245, 245, 245, 0.993)',
      backgroundColor:  'rgba(0,0,0,0.45)', 
      marginHorizontal: 20,
      height: 40,
      paddingLeft: 45,
      borderRadius: 25,
      marginBottom: 10 
    }, textAreaContainer: {
      marginTop: 2,
      padding:5,
      width: WIDTH - 36,
      borderRadius: 27,
      marginBottom:10, 
      color: 'rgba(245, 245, 245, 0.993)',
      backgroundColor:  'rgba(0,0,0,0.45)',
      marginHorizontal: 20,
  }, textArea:{
    fontSize: 14,
    color: 'rgba(245, 245, 245, 0.993)',
      height:90,
      justifyContent:"flex-end",
      padding: 10,

  },sectionone:{
    marginBottom: 10,
    backgroundColor:  'rgba(0,0,0,0.1)',
    borderBottomColor: "rgba(1,1,1,00000000000000.1)",
    borderBottomWidth: 30,
    width: WIDTH - 40,
    height: WIDTH * (9/13),
    borderRadius: 30,
    marginHorizontal:22
  }, holder:{
    marginLeft: 20,
    marginTop: 6
  },innerres:{
    flexDirection: "row",
    width: 250,
    height:40,
    borderBottomColor: "rgba(1,1,1,00000000000000.1)",
    borderBottomWidth: 7,
    marginBottom:3
  },innerresa:{
    flex: 1,
    width: 30,
    marginBottom: -10
  },
  innerresb:{
    flex: 6,
    width: 100,
    marginTop:-2,
    height:40
  }, input :{
    height:40,
    marginTop: 0,
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
},   itemPhoto: {
  // width: WIDTH - 200,
  // height: WIDTH * (9/25),
  width: 140,
  height:140,
  margin: 10,
  padding: 10,
  marginBottom: -50,
  borderRadius: 100
},
logoutsec:{
  width: WIDTH,
  paddingBottom: 10,
  marginBottom: 10,
},btnLoginh:{
  width: WIDTH - 80,
  height: 35,
  borderRadius: 12,
  backgroundColor:  'rgba(0,0,0,0.1)',
  marginHorizontal: 40,
  marginTop: 0,
  justifyContent: 'center',
}, btnTexth: {
  fontSize: 16,
  textAlign: 'center',
  color: 'rgba(0,0,0,0.5)'
}, comment :{
  height:90
}

  });
  
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
    Alert
  } from 'react-native';

  import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
  import firebase from 'react-native-firebase';

  const {width: WIDTH} = Dimensions.get('window');
  import bgImage from './images/background.jpg' 
  import logoImage from './images/logo.png'
  import Icon from 'react-native-vector-icons/Ionicons'
    import DateTimePicker from "react-native-modal-datetime-picker";
    import reservationImg from './images/reservation.jpg' 
import moment from 'moment'


export default class cusupdateResinfo extends Component  {

    constructor(props) {
        super(props)

        this.state = {
          currentUserId: firebase.auth().currentUser.uid,
          date:"",
          time:"",
          numberofattendees:"",
          comments: "",
          dateholder:"Date",
          timeholder:"Time",
          isDatePickerVisible: false,
          isTimePickerVisible: false,
          datedet:""
       
        }
    }

    handleUpdateUsers = () => {

      const db = firebase.firestore();
      Alert.alert(
        '',
        'Are you sure you want to Update',
        [
          {text: 'yes',onPress: () =>  {
            const { resid } = this.props.navigation.state.params;
    
            const db = firebase.firestore();
            const updateUser = db.collection("reservation").doc(resid)
            
            updateUser.update({
                date:  this.state.date,
                time: this.state.time,
                numberofattendees:  this.state.numberofattendees,
                comments: this.state.comments,
            });

            
        if(updateUser){
          this.props.navigation.goBack();
            alert("Updated sucessfully"); 
           
          
         
       }

          } ,style: 'cancel',},
          {text: 'no', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );

    }


    componentDidMount() {
        
        const { resid } = this.props.navigation.state.params;
        
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      const myProfile = db.collection("reservation").doc(resid)
      
      myProfile.get()
        .then(doc => {
            const realdatee = doc.data().date.toDate()
            const realtimee = doc.data().time.toDate()
            this.setState({
              date: moment(realdatee).format("DD-MM-YYYY"),
              datedet: moment(realdatee).format("dddd,MMMM Do YYYY"),
              time: moment(realtimee).format("LT"),
                    numberofattendees: doc.data().numberofattendees,
                    comments:  doc.data().comments,
                  })
        })
      
}

// handleSetDateLocalState = (date) => {
//     this.setState({
//       date,
//     });
//   }
//   handleSetTimeLocalState = (time) => {
//     this.setState({
//       time,
//     });
//   }
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
    return ( 
      <ImageBackground   source={bgImage} style={styles.ImageBackgroundCon}>
                <ScrollView>
       <View style={styles.container}> 
      
      <StatusBar 
      backgroundColor='black'
      barStyle="light-content"
      />

        <View style={styles.cover}>
            <TouchableWithoutFeedback>
              <Image  style={styles.coverPhoto} source={coverPhoto} />
            </TouchableWithoutFeedback>
            <View style={styles.profilecontainer}>
                  <TouchableOpacity ><Image style={styles.itemPhoto} source={reservationImg}
       />
       </TouchableOpacity>
                          <Text style={styles.profileinfoName}>{this.state.datedet} </Text>
                        </View>
        </View>

        <View style={styles.postionabs}>
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
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onFocus={this.showDatePicker}
                    defaultValue={this.state.date}
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
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetTimeLocalState} 
                    placeholder={this.state.timeholder}
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    defaultValue={this.state.time}
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
                    onChangeText={this.handleSetNumberOfAttendeesLocalState}
                  
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetDOBLocalState} 
                    defaultValue={this.state.numberofattendees}
                    keyboardType={'numeric'}
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Phone: {this.state.phoneNumber} </Text> */}


<View style={[styles.innerres,styles.comment,]}>
<Icon style={styles.innerresa} name={'md-chatboxes'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput    
                    style={[styles.input,styles.textArea]}
                    // defaultValue={this.state.value}
                    // onChangeText={this.handleSetFirstNameLocalState}
            
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    // onChangeText={this.handleSetAdressLocalState} 
                    // defaultValue={this.state.address}
                    numberOfLine={7}
                    multiline={true}
                    onChangeText={this.handleSetCommentsLocalState} 
                    placeholder="Comment..."
                    defaultValue={this.state.comments}
                />
</View>
</View>


</View> 


                      
                      </View>
                     
 
          

          <View style={styles.logoutsec}>
                    
                    <TouchableOpacity style={styles.btnLoginh}
                            onPress={this.handleUpdateUsers}
                          >
                          <Text style={styles.btnTexth}>Update</Text>
                      </TouchableOpacity>
                                 </View>
          
                  
          </View>
                 




























































{/* 
        <View style={styles.fieldContainer}>
            <View>
                <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
                style={styles.inputIcon}
                /> 
                <TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetDateLocalState}
                    placeholder="Date"
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    defaultValue={this.state.date}
                    
                />
        </View>

          <View>
            <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetTimeLocalState} 
                placeholder="Time"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.time}
             
              />
          </View>

        <View>
            <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetNumberOfAttendeesLocalState} 
                placeholder="number of attendees"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.numberofattendees}
               
              />
        </View>

          <View>
            <Icon  name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetCommentsLocalState} 
                placeholder="Comments"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.comments}
              />
          </View>
        
  
            <TouchableOpacity style={styles.btnLogin}
                onPress={this.handleUpdateUsers}>
                <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>


            </View> */}
            
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
      alignItems: "center",
      height: WIDTH * (9/5.2),
    },
    coverPhoto:{
      width: WIDTH,
      height: WIDTH * (9/16),
      marginBottom: -70,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 2,
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
      borderRadius: 25,
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
    }, postionabs:{
      position:"absolute",
      top:293,
      left:21
    },
    sectionone:{
      marginBottom: 10,
      backgroundColor:  'rgba(0,0,0,0.1)',
      borderBottomColor: "rgba(1,1,1,00000000000000.1)",
      borderBottomWidth: 30,
      width: WIDTH - 40,
      height: WIDTH * (9/13),
      borderRadius: 30,
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
    },innerresb:{
      flex: 6,
      width: 100,
      marginTop:-2,
      height:40
    }, input :{
      height:40,
      marginTop: 0,
      color: 'rgba(0,0,0,0.5)'
  },
  logoutsec:{
    width: WIDTH,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: -18,
  },
  btnLoginh:{
    width: WIDTH - 80,
    height: 35,
    borderRadius: 12,
    backgroundColor:  'rgba(0,0,0,0.1)',
    marginHorizontal: 40,
    marginTop: 0,
    justifyContent: 'center',
  },btnTexth: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)'
  }, comment :{
    height:90,
    borderBottomColor: "rgba(0,0,0,0.0)",
    borderBottomWidth: 1,
  },   itemPhoto: {
    // width: WIDTH - 200,
    // height: WIDTH * (9/25),
    width: 140,
    height:140,
    margin: 10,
    padding: 10,
    marginBottom: -50,
    borderRadius: 100
  }, profileinfoName:{
    position:"absolute",
    top: 75,
    left:160,
     fontSize: 15,
     color: "white",
     // borderBottomColor: "rgba(1,1,1,00000000000000.1)",
     // borderBottomWidth: 3,
     marginBottom:3
  }
  });
  
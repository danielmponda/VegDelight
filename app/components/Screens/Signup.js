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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';

const {width: WIDTH} = Dimensions.get('window');
import bgImage from './images/background.jpg' 
import logoImage from './images/logo.png'
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'

export default class SignupScreen extends Component  {
  
  constructor(props) {
    super(props)
    this.state = {
      showPass: true,
      press: false,
      firstName: '',
      lastName: '',
      date: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: '',
      loading: false,
      currentUser: "",
      dateholder:"Date of Birth",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      dob:'',
      gender:''
      ,

    }
  }
  
  static navigationOptions = {
    header: null
  }

  showPass = () => {
    if(this.state.press == false){
      this.setState({showPass: false, press: true})
    } else {
      this.setState({showPass: true, press: false})
    }
  }

  handleRegisterUsers = () => {
    const {
      firstName,
      lastName,
      dob,
      address,
      phoneNumber,
      email,
      password,
      gender
      } = this.state; 

      if(firstName=="" || lastName=="" || dob=="" || address=="" || phoneNumber=="" || email=="" || password=="" || gender=="" ){
        alert("Please fill in all Fields")
        } else {
          this.setState({ loading: true} )


          firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
          .then((user) => {

            
  
            const fbRootRefFS = firebase.firestore();
            const userID = user.user.uid;
            const signupdate = new Date()
            const userRef = fbRootRefFS.collection('users').doc(userID)
             userRef.set({
              firstName,
              lastName,
              dob,
              gender,
              address,
              phoneNumber,
              email,
              usertype:"User",
              signupdate:signupdate
            }).then(() => {
              this.setState({ loading: false} ) 
              var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function() {
                            }).catch(function(error) {
                           // An error happened.
                  });
                  this.props.navigation.goBack();
                   alert("A  verification link has been sent to your email, please verify your email by clicking the verification link in your Inbox")

                     const update = {
                        displayName: 'User'
                      };

              firebase.auth().currentUser.updateProfile(update);
            })

           
          


            
          }).catch((error) => {
            console.log("couldnt connect", error);
            alert("System Failed To Register");
           
            this.props.navigation.goBack();
          });
        }

     
      }

      handleSetFirstNameLocalState = (firstName) => {
        this.setState({
          firstName,
        });
      }
      handleSetLastNameLocalState = (lastName) => {
        this.setState({
          lastName,
        });
      }
      handleSetGenderLocalState = (gender) => {
        this.setState({
          gender,
        });
      }

      handleSetAdressLocalState = (address) => {
        this.setState({
          address,
        });
      }
      handleSetphoneNumberLocalState = (phoneNumber) => {
        this.setState({
          phoneNumber,
        });
      }
      handleSetemailLocalState = (email) => {
        this.setState({
          email,
        });
      }
      handleSetpasswordLocalState = (password) => {
        this.setState({
          password,
        });
      }

      handleDatePicked = (date) => {
        this.setState({
          isDatePickerVisible: false,
          dob:date,
          dateholder:moment(date).format("DD-MM-YYYY")
        })
      }

      showDatePicker = () => {
        this.setState({
          isDatePickerVisible: true
        })
      }

      hideDatePicked = () => {
        this.setState({
          isDatePickerVisible: false
        })
      }

  render(){

    const dpr = this.state.currentUser ? ( 
      <View>

<ScrollView>
      <View style={styles.container}> 
      
      <StatusBar 
        backgroundColor='rgba(0,0,0,0.45)'
        barStyle="light-content"
        />

           <View style={styles.logoContainer}>
               
                <Text style={styles.logoText}> Create your {'\n'} Veg-Delight Account</Text> 
            </View>

        <View style={styles.fieldContainer}>
            <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetFirstNameLocalState}
                  placeholder="First name"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetLastNameLocalState} 
                  placeholder="Last name"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

                        <View>
              <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                      <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetDOBLocalState} 
                  placeholder="Date Of Birth"
                  placeholder={this.state.dateholder}
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
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
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetGenderLocalState} 
                  placeholder="Gender"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View>
              <Icon  name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetAdressLocalState} 
                  placeholder="Address"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>
          
                <View>
                <Icon  name={'md-phone-portrait'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetphoneNumberLocalState} 
                placeholder="Mobile"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
              />
          </View>

            <View>
              <Icon  name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetemailLocalState} 
                  placeholder="Email Address"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>


            <View>
              <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              />
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetpasswordLocalState} 
                  placeholder="Password"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  secureTextEntry={this.state.showPass}
                  underlineColorAndroid='transparent'
                />
                <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                  size={26} color={'rgba(0,0,0,0.45)'}/>
                </TouchableOpacity>
            </View>

              <TouchableOpacity 
              style={styles.btnLogin}
              onPress={this.handleRegisterUsers}
            >
                  <Text style={styles.btnText}>SignUp</Text>
              </TouchableOpacity>

                <TouchableOpacity style={styles.btnSignUpText}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.btnSignUpText}> I already have an account {'\n'} Login</Text>
              </TouchableOpacity>

              </View>      
            </View>
          </ScrollView>

   </View>
   ) : (

    <View>

<ScrollView>
      <View style={styles.container}> 
      
      <StatusBar 
        backgroundColor='rgba(0,0,0,0.45)'
        barStyle="light-content"
        />

           <View style={styles.logoContainer}>
               
                <Text style={styles.logoText}> Create your {'\n'} Veg-Delight Account</Text> 
            </View>

        <View style={styles.fieldContainer}>
            <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetFirstNameLocalState}
                  placeholder="First name"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetLastNameLocalState} 
                  placeholder="Last name"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

                        <View>
              <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetDOBLocalState} 
                  placeholder="Date Of Birth"
                  placeholder={this.state.dateholder}
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
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
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetGenderLocalState} 
                  placeholder="Gender"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View>
              <Icon  name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetAdressLocalState} 
                  placeholder="Address"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>
          
                <View>
                <Icon  name={'md-phone-portrait'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetphoneNumberLocalState} 
                placeholder="Mobile"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
              />
          </View>

            <View>
              <Icon  name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetemailLocalState} 
                  placeholder="Email Address"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

           

            <View>
              <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              />
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetpasswordLocalState} 
                  placeholder="Password"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  secureTextEntry={this.state.showPass}
                  underlineColorAndroid='transparent'
                />
                <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                  size={26} color={'rgba(0,0,0,0.45)'}/>
                </TouchableOpacity>
            </View>

              <TouchableOpacity 
              style={styles.btnLogin}
              onPress={this.handleRegisterUsers}
            >
                  <Text style={styles.btnText}>SignUp</Text>
              </TouchableOpacity>

                <TouchableOpacity style={styles.btnSignUpText}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.btnSignUpText}> I already have an account{'\n'} Login</Text>
              </TouchableOpacity>

              </View>      
            </View>
          </ScrollView>
  
   </View>

   ) 

   const dps = this.state.loading ?  (
    <View  style={styles.loading}>
           <ActivityIndicator animating={this.state.loading} /> 
         
                      <Text style={styles.loadingtext}> Connecting...</Text>
                     
                  
     </View>
      
      ):
          (<View >
              { dpr }
          </View>)


    return ( 
      <ImageBackground source={bgImage} style={styles.ImageBackgroundCon}>
       {/* <ScrollView>
      <View style={styles.container}> 
      
        <StatusBar 
        backgroundColor='black'
        barStyle="light-content"
        />

           <View style={styles.logoContainer}>
               
                <Text style={styles.logoText}> Create your {'\n'} Veg-Delight Account</Text> 
            </View>

        <View style={styles.fieldContainer}>
            <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetFirstNameLocalState}
                  placeholder="First name"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetLastNameLocalState} 
                  placeholder="Last name"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

                        <View>
              <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetDOBLocalState} 
                  placeholder="Date Of Birth"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

            <View>
              <Icon  name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetAdressLocalState} 
                  placeholder="Address"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>
          
                <View>
                <Icon  name={'md-phone-portrait'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetphoneNumberLocalState} 
                placeholder="Mobile"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
              />
          </View>

            <View>
              <Icon  name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetemailLocalState} 
                  placeholder="Email Address"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
            </View>

           

            <View>
              <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              />
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleSetpasswordLocalState} 
                  placeholder="Password"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  secureTextEntry={this.state.showPass}
                  underlineColorAndroid='transparent'
                />
                <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                  size={26} color={'rgba(0,0,0,0.45)'}/>
                </TouchableOpacity>
            </View>

              <TouchableOpacity 
              style={styles.btnLogin}
              onPress={this.handleRegisterUsers}
            >
                  <Text style={styles.btnText}>SignUp</Text>
              </TouchableOpacity>

                <TouchableOpacity style={styles.btnSignUpText}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.btnSignUpText}> I already have an account Login</Text>
              </TouchableOpacity>

              </View>      
            </View>
          </ScrollView> */}

<View>

{ dps }
</View>

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
    padding:10,
  },
  logoContainer:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  logoText:{
    flex: 3,
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    opacity: 0.7,
    textAlign: 'center'
  },
  logo:{
    flex: 1,
    height: 58,
    width: 60,
    marginBottom: 5
  },
  fieldContainer: {
    flex:6
  },
  input:{
    width: WIDTH - 55,
    height: 45,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    backgroundColor:  'rgba(0,0,0,0.45)',
    marginHorizontal: 20,
    height: 40,
    paddingLeft: 45,
    borderRadius: 25,
    marginBottom: 10
  },
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
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#561a1a',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 5
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  }, 
  btnSignUpText:{
    marginTop:10,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  } , loading :{
    marginTop: -80,
  }, loadingtext :{
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  }
});

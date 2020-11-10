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
   ActivityIndicator,
} from 'react-native';

import firebase from 'react-native-firebase';

import bgImage from './images/background.jpg'
import logoImage from './images/logo.png'
import Icon from 'react-native-vector-icons/Ionicons'

const {width: WIDTH} = Dimensions.get('window');


export default class LoginScreen extends Component  {
 
  constructor(props) {
    super(props)
    this.state = {
      showPass: true,
      press: false, 
      email: '',
      password: '',
      loading: false,
      currentUser: "",
    }
  }

  //}
  handleforgotpassword = () => {
    this.props.navigation.navigate('forgotpassword');
  }

  handleSinguoUser = () => {
    this.props.navigation.navigate('Signup');
  }

  handleLoginUser = () => {
    const {email,password } = this.state; 
    if(email==="" || password===""){
    alert("Please fill in all Fields")
    } else {
      this.setState({ loading: true} )

            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then((user) => {
                  this.setState({ loading: false} )
                  var userr = firebase.auth().currentUser;
                  var userrr = userr.emailVerified
            

                 if(userrr){
                      var usrrr = userr.displayName
                      if(usrrr=="User"){
                        this.props.navigation.navigate('Cus');
                      } else if(usrrr=="Emp") {
                        this.props.navigation.navigate('Emp');
                      } else if(usrrr=="Admin") {
                      this.props.navigation.navigate('Admin');
                      } else if(usrrr=="Chef") {
                      this.props.navigation.navigate('Chef');
                      }
                    }else {
                      alert("The email used is not yet verified, please verify your email by clicking the verification link in your Inbox");
                      }
                      

                }).catch((error) => {
                  this.setState({ loading: false} )
                  console.log("C connect", error);

                  alert("Make sure you have internet connection on this device and you have used the correct email and password");
                  alert("System Failed to Connect..");
                });
    }
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

  // MarkUp Language 
  render(){

    const dpr = this.state.currentUser ? ( 

      <View>

            <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
                <Text style={styles.text} style={styles.logoText}>Veg-Delight Malawi</Text> 
            </View>

            <View>
                          <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
                          style={styles.inputIcon}
                          /> 
                            <TextInput
                              style={styles.input}
                              // defaultValue={this.state.value}
                              onChangeText={this.handleChangeUsername} 
                              placeholder="Email"
                              placeholderTextColor={'rgba(255,255,255,0.7)'}
                              underlineColorAndroid='transparent'
                              // onChangeText={(email) => this.setState({email: email})}
                              onChangeText={this.handleSetemailLocalState} 
                              keyboardType="email-address"
                            />
              </View>

                  <View>
                  <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
                  style={styles.inputIcon}
                  />
                    <TextInput
                      style={styles.input}
                      // defaultValue={this.state.value}
                      onChangeText={this.handleChangePassword} 
                      placeholder="Password"
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      secureTextEntry={this.state.showPass}
                      underlineColorAndroid='transparent'
                      //onChangeText={(password) => this.setState({password: password})}
                      onChangeText={this.handleSetpasswordLocalState} 
                      autoCapitalize={'none'}
                      autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.btnEye}
                    onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                      size={26} color={'rgba(0,0,0,0.45)'}/>
                    </TouchableOpacity>
                </View>

                    <TouchableOpacity style={styles.btnLogin}
                    onPress={this.handleLoginUser}
                  //onPress={() => this.props.navigation.navigate('Profile')}
                  >
                      <Text style={styles.btnText}>Sign In</Text>
                  </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSignp}
                                onPress={this.handleSinguoUser}
                                //onPress={() => this.props.navigation.navigate('Profile')}
                                >
                                    <Text style={styles.btnSingUpText}>Dont have an account? </Text>
                                    <Text style={styles.btnSingUpText}> SignUp </Text>
                                </TouchableOpacity>

                    <TouchableOpacity style={styles.btnforgotpassword}
                    onPress={this.handleforgotpassword}
                    //onPress={() => this.props.navigation.navigate('Profile')}
                    >
                      <Text style={styles.btnSingUpText}>Forgot Password </Text>
                      
                    </TouchableOpacity>
   </View>
   ) : (

    <View>

            <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
                <Text style={styles.text} style={styles.logoText}>Veg-Delight Malawi</Text> 
                  </View>

                <View>
                              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
                              style={styles.inputIcon}
                              /> 
                                <TextInput
                                  style={styles.input}
                                  // defaultValue={this.state.value}
                                  onChangeText={this.handleChangeUsername} 
                                  placeholder="Email"
                                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                                  underlineColorAndroid='transparent'
                                  // onChangeText={(email) => this.setState({email: email})}
                                  onChangeText={this.handleSetemailLocalState} 
                                  keyboardType="email-address"
                                />
                            </View>


                      <View>
                      <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
                      style={styles.inputIcon}
                      />
                        <TextInput
                          style={styles.input}
                          // defaultValue={this.state.value}
                          onChangeText={this.handleChangePassword} 
                          placeholder="Password"
                          placeholderTextColor={'rgba(255,255,255,0.7)'}
                          secureTextEntry={this.state.showPass}
                          underlineColorAndroid='transparent'
                          //onChangeText={(password) => this.setState({password: password})}
                          onChangeText={this.handleSetpasswordLocalState} 
                          autoCapitalize={'none'}
                          autoCorrect={false}
                        />
                        <TouchableOpacity style={styles.btnEye}
                        onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                          size={26} color={'rgba(0,0,0,0.45)'}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btnLogin}
                    onPress={this.handleLoginUser}
                  //onPress={() => this.props.navigation.navigate('Profile')}
                  >
                      <Text style={styles.btnText}>Sign In</Text>
                  </TouchableOpacity>

                <TouchableOpacity style={styles.btnSignp}
               onPress={this.handleSinguoUser}
              //onPress={() => this.props.navigation.navigate('Profile')}
              >
                  <Text style={styles.btnSingUpText}>Dont Have An Account? </Text>
                  <Text style={styles.btnSingUpText}> SignUp </Text>
              </TouchableOpacity>

                              <TouchableOpacity style={styles.btnforgotpassword}
                onPress={this.handleforgotpassword}
                //onPress={() => this.props.navigation.navigate('Profile')}
                >
                  <Text style={styles.btnSingUpText}>Forgot Password </Text>
                  
                </TouchableOpacity>
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
       
      <View style={styles.container}> 
      
        <StatusBar 
        backgroundColor='rgba(0,0,0,0.45)'
        barStyle="light-content"
        />

            {/* <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logo} />
                <Text style={styles.text} style={styles.logoText}>Veg-Delight Malawi</Text> 
            </View> */}

            {/* <View>
              <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              /> 
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleChangeUsername} 
                  placeholder="Email"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                  // onChangeText={(email) => this.setState({email: email})}
                  onChangeText={this.handleSetemailLocalState} 
                  keyboardType="email-address"
                />
            </View> */}

            {/* <View>
              <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              />
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleChangePassword} 
                  placeholder="Password"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  secureTextEntry={this.state.showPass}
                  underlineColorAndroid='transparent'
                  //onChangeText={(password) => this.setState({password: password})}
                  onChangeText={this.handleSetpasswordLocalState} 
                  autoCapitalize={'none'}
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                  size={26} color={'rgba(0,0,0,0.45)'}/>
                </TouchableOpacity>
            </View> */}
              <View>

                 { dps }
              </View>

           

              {/* <TouchableOpacity style={styles.btnLogin}
               onPress={this.handleLoginUser}
              //onPress={() => this.props.navigation.navigate('Profile')}
              >
                  <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity> */}

              {/* <TouchableOpacity style={styles.btnSignp}
               onPress={this.handleSinguoUser}
              //onPress={() => this.props.navigation.navigate('Profile')}
              >
                  <Text style={styles.btnSingUpText}>Dont have an account? </Text>
                  <Text style={styles.btnSingUpText}> SignUp </Text>
              </TouchableOpacity> */}

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
    alignItems: 'center',
    marginBottom: 20
  },
  logoText:{
    color: 'white',
    fontSize: 18,
    fontWeight: '100',
  },
  logo:{
    height: 188,
    width: 210,
    marginBottom: 5
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
    marginTop: 10,
    justifyContent: 'center',
    marginBottom: 40
  },
  btnSignp:{
    width: WIDTH - 55,
    height: 75,
    borderRadius: 25,
    color: "white",
    backgroundColor:  'rgba(0,0,0,0.0)',
    marginHorizontal: 20,
    marginTop: 0,
    justifyContent: 'center',
    marginBottom: 10
  },btnforgotpassword:{
    width: WIDTH - 55,
    height: 75,
    borderRadius: 25,
    color: "white",
    backgroundColor:  'rgba(0,0,0,0.0)',
    marginHorizontal: 20,
    marginTop: 0,
    justifyContent: 'center',
    marginBottom: 10
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  }, 
  btnSingUpText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white'
  }, 
  btnSignUpText:{
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: -35,
  }, loading: {
    marginTop: -80,
  }, loadingtext: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  }
});

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



export default class forgotpasswordScreen extends Component  {
 
  constructor(props) {
    super(props)
    this.state = {

      press: false, 
      email: '',

      loading: false,
      currentUser: "",
    }
  }

 


  handleSinguoUser = () => {
    this.props.navigation.goBack();
  }

  handleLoginUser = () => {
  
    const {
      email,
      } = this.state; 

    if(email===""){
       
    alert("Please fill in all Fields")
    } else {
      this.setState({ loading: true} )
      var auth = firebase.auth();
auth.sendPasswordResetEmail(email).then(() => {
  this.setState({ loading: false})
  this.props.navigation.goBack();
  alert("A reset link has been sent to you inbox")
}).catch(function(error) {
  this.setState({ loading: false} )
  alert("A reset link has been sent to you inbox")
});


    }
  }
  

  handleSetemailLocalState = (email) => {
    this.setState({
      email,
    });
  }



  static navigationOptions = {
    header: null
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

    

    <TouchableOpacity style={styles.btnLogin}
    onPress={this.handleLoginUser}
   //onPress={() => this.props.navigation.navigate('Profile')}
   >
       <Text style={styles.btnText}>RESET Password</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.btnSignp}
               onPress={this.handleSinguoUser}
              //onPress={() => this.props.navigation.navigate('Profile')}
              >
                  
                  <Text style={styles.btnSingUpText}> Login Instead </Text>
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



    <TouchableOpacity style={styles.btnLogin}
    onPress={this.handleLoginUser}
   //onPress={() => this.props.navigation.navigate('Profile')}
   >
       <Text style={styles.btnText}>RESET PASSWORD</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.btnSignp}
               onPress={this.handleSinguoUser}
              //onPress={() => this.props.navigation.navigate('Profile')}
              >
                  
                  <Text style={styles.btnSingUpText}> Login Instead </Text>
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
         <StatusBar backgroundColor='#c0b5b9' barStyle="light-content"/>
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
    marginBottom: 20
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

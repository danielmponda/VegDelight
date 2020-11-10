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

export default class emailverification extends Component  {
 
  constructor(props) {
    super(props)
    this.state = {
      currentUser: firebase.auth().currentUser,
    }
  }


  render(){
    return ( 
      <ImageBackground source={bgImage} style={styles.ImageBackgroundCon}>
      <View style={styles.container}> 
      
        <StatusBar 
        backgroundColor='rgba(0,0,0,0.45)'
        barStyle="light-content"
        />

        <Text> Please Verify you email </Text>

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

import React, {Component} from 'react';

// Import all the Screens / Components 
// import HomeScreen from './app/components/Screens/Home'
import LoginScreen from './app/components/Screens/Login'
// import ProfileScreen from './app/components/Screens/Profile'
import SignupScreen from './app/components/Screens/Signup'

// Import Navigation Components 
import {createStackNavigator, } from 'react-navigation'


// LEVEL 3 
// AuthStack => loginPage, SignupPage 
const AuthStack = createStackNavigator({
    Login: {screen:LoginScreen},
    Signup: {screen:SignupScreen}
  });


  export default AuthStack;
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
// Import Navigation Components 
import {createStackNavigator, } from 'react-navigation'

import DashboardTabNavigator from './app/components/Navigator/DashboardTabNavigator'

// LEVEL 6
// DashboardStackNavigator => DashboardTabNavigator
const DashboardStackNavigator =  createStackNavigator({
    DashboardTabNavigator:DashboardTabNavigator
  },
  {
    defaultNavigationOptions: 
    ({navigation}) => {
      return{
        headerLeft: ( 
                      <Icon 
                      style={{paddingLeft: 20}} 
                      onPress={() => navigation.openDrawer()}
                      name='md-menu' size={30} />
        )
      }
    }
  })


  export default DashboardStackNavigator;
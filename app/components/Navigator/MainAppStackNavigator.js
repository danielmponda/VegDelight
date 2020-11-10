
import React from 'react'; 

// Import Navigation Components 
import {createStackNavigator } from 'react-navigation'

import AppDrawnavigator from './app/components/Navigator/AppDrawnavigator'


// LEVEL 4
// Profile Page With the Drawnavigation  
const MainAppStackNavigator = createStackNavigator(
    { 
      Profile: AppDrawnavigator
    },{ 
      defaultNavigationOptions:{
        headerStyle:{
          backgroundColor:'orange'
        },
        header: null
      }
  });

  export default MainAppStackNavigator;
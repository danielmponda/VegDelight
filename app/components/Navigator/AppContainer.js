import React, {Component} from 'react';

// Import Navigation Components 
import {createAppContainer,createSwitchNavigator,} from 'react-navigation'

import MainAppStackNavigator from './app/components/Navigator/MainAppStackNavigator'
import AuthStack from './app/components/Navigator/AuthStack'


// LEVEL 2 
// 1 AppContainer 
const AppContainer = createAppContainer(createSwitchNavigator({
    Auth: {screen:AuthStack},
    App: {screen:MainAppStackNavigator},
  }, 
  {
    intialRouteName: 'AuthLoading',
  }
  ));
  
  export default AppContainer;
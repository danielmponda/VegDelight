import React, {Component} from 'react';

import {createDrawerNavigator} from 'react-navigation'

import DashboardStackNavigator from './app/components/Navigator/DashboardStackNavigator'



// LEVEL 5
// Drawnavigation => DashboardStackNavigator
const AppDrawnavigator = createDrawerNavigator({
    Dashboard:{
      screen: DashboardStackNavigator
    }
  });

  export default AppDrawnavigator;
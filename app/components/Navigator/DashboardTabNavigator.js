import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator} from 'react-navigation'


import FeedStack from './app/components/Navigator/FeedStack'
import ProfileStack from './app/components/Navigator/ProfileStack'
import SettingsStack from './app/components/Screens/SettingsStack'

// LEVEL7
// DashboardTabNavigator  => FeedStack, ProfileStack, SettingsStack
const DashboardTabNavigator = createBottomTabNavigator({
    Feed: {
      screen:FeedStack, 
      navigationOptions: ({navigation}) => {
        const {routeName} = navigation.state.routes
        [navigation.state.index];
          return {
            header: null,
            headerTitle: routeName,
            tabBarIcon: ({tintColor}) => (<Icon name="md-apps" color={tintColor} size={24}/>
            ),
          };
        }
      },
      Profile: {
        screen:ProfileStack, 
        navigationOptions: ({navigation}) => {
          const {routeName} = navigation.state.routes
          [navigation.state.index];
            return {
              header: null,
              headerTitle: routeName,
              tabBarIcon: ({tintColor}) => (<Icon name="md-person" color={tintColor} size={24}/>
              ),
            };
          }
        },
        Settings: {
          screen:SettingsStack, 
          navigationOptions: ({navigation}) => {
            const {routeName} = navigation.state.routes
            [navigation.state.index];
              return {
                header: null,
                headerTitle: routeName,
                tabBarIcon: ({tintColor}) => (<Icon name="md-settings" color={tintColor} size={24}/>
                ),
              };
            }
          },
          Order: {
            screen:FeedStack, 
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="md-restaurant" color={tintColor} size={24}/>
                  ),
                };
              }
            }
    },
    { 
      navigationOptions: ({navigation}) => {
        const {routeName} = navigation.state.routes
        [navigation.state.index];
        return {
          header: null,
          headerTitle: routeName,
        };
      },
      animationEnabled: false,
      swipeEnabled:false,
      lazy: true,
      tabBarOptions:{
        activeTintColor: 'black',
        showIcon: true,
        showLabel: false, 
        activeBackgroundColor: 'rgba(215,215,215,0.1)',
        inactiveBackgroundColor: 'rgba(215,215,215,0.1)',
        labelStyle: {
          fontSize: 10,
        },
        style:{
          backgroundColor: 'rgba(215,215,215,0.1)',
        }
      }
    }
  );

  export default DashboardTabNavigator;
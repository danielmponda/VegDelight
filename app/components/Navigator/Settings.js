import React, {Component} from 'react'; 
import Icon from 'react-native-vector-icons/Ionicons'
import {createStackNavigator} from 'react-navigation'

    
import Settings from './app/components/Screens/Settings'


// SettingsStack => SettingsPage 
const SettingsStack = createStackNavigator({
    Settings: { 
      screen: Settings, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Settings',
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          ), 
          headerStyle:{
            backgroundColor:'gray'
          }
        }
      }
    },
    Detail: {screen: Detail}
  })

  export default SettingsStack;
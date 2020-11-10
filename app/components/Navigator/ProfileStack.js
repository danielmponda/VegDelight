import React, {Component} from 'react'; 
import Icon from 'react-native-vector-icons/Ionicons'
import {createStackNavigator} from 'react-navigation'

    
import Profile from './app/components/Screens/Profile'


// ProfileStack => ProfilePage 
const ProfileStack = createStackNavigator({
    Profile: { 
      screen: Profile, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Profile',
          tabBarIcon: ({tintColor}) => (
            <Icon
                name="bookmark"
                color={tintColor}
                size={24}
            />),
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          )
        }
      }
    },
    Detail: {screen: Detail}
  })

  export default ProfileStack;
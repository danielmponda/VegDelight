import React, {Component} from 'react'; 

import Icon from 'react-native-vector-icons/Ionicons'
import {createStackNavigator} from 'react-navigation'

    
import Feed from './app/components/Screens/Feeds'
import Detail from './app/components/Screens/Detail'

// FeedStack => FeedPage, DetailPage 
 const FeedStack = createStackNavigator({
    Feed: { 
      screen: Feed, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Feed',
          tabBarIcon:(
            <Icon 
            style={{paddingLeft: 15}}
            name='md-menu' 
            size={30}/>
            ),
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          ),
        }
      }
    },
    Detail: {screen: Detail}
  },{
    defaultNavigationOptions:{
      gesturesEnabled: false
    }
  })

  export default FeedStack; 
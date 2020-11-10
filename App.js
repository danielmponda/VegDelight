import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import firebase from 'react-native-firebase';


import forgotpasswordScreen from './app/components/Screens/forgotpasswordScreen'
import LoginScreen from './app/components/Screens/Login'
import SignupScreen from './app/components/Screens/Signup'
import emailverification from './app/components/Screens/emailverification'






///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> CUSTOMER VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

import cusFeed from './app/components/Screens/cusFeeds'
import cusOrder from './app/components/Screens/cusOrder' 
import cusDetail from './app/components/Screens/cusDetail'
import cusupdateResInfo from './app/components/Screens/cusupdateResInfo'
import cusaddReorder from './app/components/Screens/cusaddReorder'
import cusupdateUserInfo from './app/components/Screens/cusupdateUserInfo'
import cusEditProfile from './app/components/Screens/cusEditProfile'

import cusChangePassword from './app/components/Screens/cusChangePassword'
import cusupdateUserEmailorPass from './app/components/Screens/cusupdateUserEmailorPass'
import cusSettings from './app/components/Screens/cusSettings' 
import cusProfile from './app/components/Screens/cusProfile'
import cusCart from './app/components/Screens/cusCart'
import cusMessage from './app/components/Screens/cusMessage'
import cusReadsent from './app/components/Screens/cusReadsent'
import cusreply from './app/components/Screens/cusreply'
import cusSendMessage from './app/components/Screens/cusSendMessage'
import cusViewContact from './app/components/Screens/cusViewContact'
import cusChangeUserType from './app/components/Screens/cusChangeUserType'





// FeedStack => FeedPage, DetailPage 
const cusMessageStack = createStackNavigator({
  cusMessage: { 
    screen: cusMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Messages',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('cusSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          backgroundColor:'white',
          height: 40,
          color: "white"
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  cusViewContact: {
    screen: cusViewContact,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Contact Profile',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, 
  cusSendMessage: {
    screen: cusSendMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Send Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },  
  cusreply:{
    screen:cusreply, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, cusReadsent:{
    screen:cusReadsent, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Sent Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },

},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
}
)

// FeedStack => FeedPage, DetailPage 
 const cusFeedStack = createStackNavigator({
    cusFeed: { 
      screen: cusFeed, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          ), headerRight:(
            <Icon 
            style={{paddingRight: 15}} 
            onPress={() => navigation.navigate('cusSettings')}
            name='md-cart' size={25} /> 
          ),
          headerStyle:{
            // backgroundColor:'gray'
            height: 40
          }
        }
      }
    },
    cusDetail: {
      screen: cusDetail,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Book Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }, 
    cusupdateResInfo: {
      screen: cusupdateResInfo,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Update Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }
  },{
    defaultNavigationOptions:{
      gesturesEnabled: false
    }
  }
  )

// FeedStack => FeedPage, DetailPage 


const cusOrderStack = createStackNavigator({
  cusOrder: { 
    screen: cusOrder, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Items ',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('cusSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  cusaddReorder: {
    screen: cusaddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item ',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
}
},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
})
  
// ProfileStack => ProfilePage 
const cusProfileStack = createStackNavigator({
  cusProfile: { 
    screen: cusProfile, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:"Customer's Profile",
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), 
        headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('cusSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  cusupdateUserInfo: {
    screen: cusupdateUserInfo,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  cusEditProfile: {
    screen: cusEditProfile,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  cusChangePassword: {
    screen: cusChangePassword,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Change Password',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, cusChangeUserType: {
    screen: cusChangeUserType,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Change User Type',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }
})

// SettingsStack => SettingsPage 
const cusSettingsStack = createStackNavigator({
  cusSettings: { 
    screen: cusSettings, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Menu',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ),  headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('cusCart')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  cusaddReorder: {
    screen: cusaddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
},  cusCart: {
  screen: cusCart,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Ordering Process',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}
})

// LEVEL7
// DashboardTabNavigator  => Order, ProfileStack, SettingsStack,FeedStack
// DashboardTabNavigator Arrangement 
const cusDashboardTabNavigator = createBottomTabNavigator({
      Profile: {
        screen:cusProfileStack, 
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
        Items: {
          screen:cusOrderStack, 
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
          },
        Menu: {
          screen:cusSettingsStack, 
          navigationOptions: ({navigation}) => {
            const {routeName} = navigation.state.routes
            [navigation.state.index];
              return {
                header: null,
                headerTitle: routeName,
                tabBarIcon: ({tintColor}) => (<Icon name="md-book" color={tintColor} size={24}/>
                ),
              };
            }
          },
          Reservation: {
            screen:cusFeedStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="logo-buffer" color={tintColor} size={24}/>
                  ),
                };
              }
            },
            Message: {
              screen:cusMessageStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="md-mail-unread" color={tintColor} size={24}/>
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
        activeTintColor: '#561a1a',
        showIcon: true,
        showLabel: true, 
        activeBackgroundColor: 'rgba(215,215,215,0.1)',
        inactiveBackgroundColor: 'rgba(215,215,215,0.1)',
        labelStyle: {
          fontSize: 10,
        },
        style:{
          backgroundColor: 'black',
          height: 43,
         
        }
      }
    }
  );

// LEVEL 6
// DashboardStackNavigator => DashboardTabNavigator
const cusDashboardStackNavigator =  createStackNavigator({
    cusDashboardTabNavigator:cusDashboardTabNavigator
    
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
  
// LEVEL 5
// createDrawerNavigator 
// Content screen 
// Drawnavigation => DashboardStackNavigator
const cusDrawnavigator = createDrawerNavigator({
  Dashboard:{
    screen: cusDashboardStackNavigator
  },
  LogOut:{
    screen: cusSettings
  }
},{ 
    defaultNavigationOptions:{
      style:{
        backgroundColor: 'rgba(5,134,215,0.6)',
      }
}
});

// LEVEL 4
// Profile Page With the Drawnavigation  
const CusStack = createStackNavigator(
    { 
      Profile: cusDrawnavigator
    },{ 
      defaultNavigationOptions:{
        headerStyle:{
          backgroundColor:'orange'
        },
        header: null
      }
  });

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> CUSTOMER VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> waiter VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

import waiterFeed from './app/components/Screens/waiterFeeds'
import waiterOrder from './app/components/Screens/waiterOrder' 
import waiterDetail from './app/components/Screens/waiterDetail'
import waiterupdateResInfo from './app/components/Screens/waiterupdateResInfo'
import waiteraddReorder from './app/components/Screens/waiteraddReorder'
import waiterupdateUserInfo from './app/components/Screens/waiterupdateUserInfo'
import waiterEditProfile from './app/components/Screens/waiterEditProfile'

import waiterChangePassword from './app/components/Screens/waiterChangePassword'
import waiterupdateUserEmailorPass from './app/components/Screens/waiterupdateUserEmailorPass'
import waiterSettings from './app/components/Screens/waiterSettings' 
import waiterProfile from './app/components/Screens/waiterProfile'
import waiterCart from './app/components/Screens/waiterCart'
import waiterMessage from './app/components/Screens/waiterMessage'
import waiterReadsent from './app/components/Screens/waiterReadsent'
import waiterreply from './app/components/Screens/waiterreply'
import waiterSendMessage from './app/components/Screens/waiterSendMessage'
import waiterViewContact from './app/components/Screens/waiterViewContact'




// FeedStack => FeedPage, DetailPage 
const waiterMessageStack = createStackNavigator({
  waiterMessage: { 
    screen: waiterMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Messages',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('waiterSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          backgroundColor:'white',
          height: 40,
          color: "white"
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  waiterViewContact: {
    screen: waiterViewContact,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Contact Profile',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, 
  waiterSendMessage: {
    screen: waiterSendMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Send Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },  
  waiterreply:{
    screen:waiterreply, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, waiterReadsent:{
    screen:waiterReadsent, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Sent Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },

},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
}
)

// FeedStack => FeedPage, DetailPage 
 const waiterFeedStack = createStackNavigator({
    waiterFeed: { 
      screen: waiterFeed, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          ), headerRight:(
            <Icon 
            style={{paddingRight: 15}} 
            onPress={() => navigation.navigate('waiterSettings')}
            name='md-cart' size={25} /> 
          ),
          headerStyle:{
            // backgroundColor:'gray'
            height: 40
          }
        }
      }
    },
    waiterDetail: {
      screen: waiterDetail,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }, 
    waiterupdateResInfo: {
      screen: waiterupdateResInfo,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }
  },{
    defaultNavigationOptions:{
      gesturesEnabled: false
    }
  }
  )

// FeedStack => FeedPage, DetailPage 


const waiterOrderStack = createStackNavigator({
  waiterOrder: { 
    screen: waiterOrder, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Items ',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('waiterSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  waiteraddReorder: {
    screen: waiteraddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
}
},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
})
  
// ProfileStack => ProfilePage 
const waiterProfileStack = createStackNavigator({
  waiterProfile: { 
    screen: waiterProfile, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:"Waiter's Profile",
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), 
        headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('waiterSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  waiterupdateUserInfo: {
    screen: waiterupdateUserInfo,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  waiterEditProfile: {
    screen: waiterEditProfile,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  waiterChangePassword: {
    screen: waiterChangePassword,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Update Password',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, waiterupdateUserEmailorPass: {
    screen: waiterupdateUserEmailorPass,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Update Password & Email',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }
})

// SettingsStack => SettingsPage 
const waiterSettingsStack = createStackNavigator({
  waiterSettings: { 
    screen: waiterSettings, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Menu',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ),  headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('waiterCart')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  waiteraddReorder: {
    screen: waiteraddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
},  waiterCart: {
  screen: waiterCart,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Ordering Process',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}
})

// LEVEL7
// DashboardTabNavigator  => Order, ProfileStack, SettingsStack,FeedStack
// DashboardTabNavigator Arrangement 
const waiterDashboardTabNavigator = createBottomTabNavigator({
      Profile: {
        screen:waiterProfileStack, 
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
        Items: {
          screen:waiterOrderStack, 
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
          },
        Menu: {
          screen:waiterSettingsStack, 
          navigationOptions: ({navigation}) => {
            const {routeName} = navigation.state.routes
            [navigation.state.index];
              return {
                header: null,
                headerTitle: routeName,
                
                tabBarIcon: ({tintColor}) => (<Icon name="md-book" color={tintColor} size={24}/>
                ),
              };
            }
          },
          Reservation: {
            screen:waiterFeedStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="logo-buffer" color={tintColor} size={24}/>
                  ),
                };
              }
            },
            Message: {
              screen:waiterMessageStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="md-mail-unread" color={tintColor} size={24}/>
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
        activeTintColor: '#561a1a',
        showIcon: true,
        showLabel: true, 
        activeBackgroundColor: 'rgba(215,215,215,0.1)',
        inactiveBackgroundColor: 'rgba(215,215,215,0.1)',
        labelStyle: {
          fontSize: 10,
        },
        style:{
          backgroundColor: 'black',
          height: 43,
         
        }
      }
    }
  );

// LEVEL 6
// DashboardStackNavigator => DashboardTabNavigator
const waiterDashboardStackNavigator =  createStackNavigator({
    waiterDashboardTabNavigator:waiterDashboardTabNavigator
    
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
  
// LEVEL 5
// createDrawerNavigator 
// Content screen 
// Drawnavigation => DashboardStackNavigator
const waiterDrawnavigator = createDrawerNavigator({
  Dashboard:{
    screen: waiterDashboardStackNavigator
  },
  LogOut:{
    screen: waiterSettings
  }
},{ 
    defaultNavigationOptions:{
      style:{
        backgroundColor: 'rgba(5,134,215,0.6)',
      }
}
});

// LEVEL 4
// Profile Page With the Drawnavigation  
const WaiterStack = createStackNavigator(
    { 
      Profile: waiterDrawnavigator
    },{ 
      defaultNavigationOptions:{
        headerStyle:{
          backgroundColor:'orange'
        },
        header: null
      }
  });

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> waiterTOMER VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> chefTOMER VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

import chefFeed from './app/components/Screens/chefFeeds'
import chefOrder from './app/components/Screens/chefOrder' 
import chefDetail from './app/components/Screens/chefDetail'
import chefupdateResInfo from './app/components/Screens/chefupdateResInfo'
import chefaddReorder from './app/components/Screens/chefaddReorder'
import chefupdateUserInfo from './app/components/Screens/chefupdateUserInfo'
import chefEditProfile from './app/components/Screens/chefEditProfile'

import chefChangePassword from './app/components/Screens/chefChangePassword'
import chefupdateUserEmailorPass from './app/components/Screens/chefupdateUserEmailorPass'
import chefSettings from './app/components/Screens/chefSettings' 
import chefProfile from './app/components/Screens/chefProfile'
import chefCart from './app/components/Screens/chefCart'
import chefMessage from './app/components/Screens/chefMessage'
import chefReadsent from './app/components/Screens/chefReadsent'
import chefreply from './app/components/Screens/chefreply'
import chefSendMessage from './app/components/Screens/chefSendMessage'
import chefViewContact from './app/components/Screens/chefViewContact'
import chefaddfoodItem from './app/components/Screens/chefaddfoodItem'
import chefupdatefooditem from './app/components/Screens/chefupdatefooditem'




// FeedStack => FeedPage, DetailPage 
const chefMessageStack = createStackNavigator({
  chefMessage: { 
    screen: chefMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Messages',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('chefSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          backgroundColor:'white',
          height: 40,
          color: "white"
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  chefViewContact: {
    screen: chefViewContact,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Contact Profile',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, 
  chefSendMessage: {
    screen: chefSendMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Send Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },  
  chefreply:{
    screen:chefreply, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, chefReadsent:{
    screen:chefReadsent, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Sent Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },

},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
}
)

// FeedStack => FeedPage, DetailPage 
 const chefFeedStack = createStackNavigator({
    chefFeed: { 
      screen: chefFeed, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          ), headerRight:(
            <Icon 
            style={{paddingRight: 15}} 
            onPress={() => navigation.navigate('chefSettings')}
            name='md-cart' size={25} /> 
          ),
          headerStyle:{
            // backgroundColor:'gray'
            height: 40
          }
        }
      }
    },
    chefDetail: {
      screen: chefDetail,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }, 
    chefupdateResInfo: {
      screen: chefupdateResInfo,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }
  },{
    defaultNavigationOptions:{
      gesturesEnabled: false
    }
  }
  )

// FeedStack => FeedPage, DetailPage 


const chefOrderStack = createStackNavigator({
  chefOrder: { 
    screen: chefOrder, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Items ',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('chefSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  chefaddReorder: {
    screen: chefaddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
}
},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
})
  
// ProfileStack => ProfilePage 
const chefProfileStack = createStackNavigator({
  chefProfile: { 
    screen: chefProfile, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:"Chef's Profile",
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), 
        headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('chefSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  chefupdateUserInfo: {
    screen: chefupdateUserInfo,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  chefEditProfile: {
    screen: chefEditProfile,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  chefChangePassword: {
    screen: chefChangePassword,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Update Password',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, chefupdateUserEmailorPass: {
    screen: chefupdateUserEmailorPass,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Update Password & Email',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }
})

// SettingsStack => SettingsPage 
const chefSettingsStack = createStackNavigator({
  chefSettings: { 
    screen: chefSettings, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Menu',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ),  headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('chefCart')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  chefaddReorder: {
    screen: chefaddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
},  chefCart: {
  screen: chefCart,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Ordering Process',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}, chefaddfoodItem: {
  screen: chefaddfoodItem,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Add Item',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}, chefupdatefooditem: {
  screen: chefupdatefooditem,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Update Item',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}
})

// LEVEL7
// DashboardTabNavigator  => Order, ProfileStack, SettingsStack,FeedStack
// DashboardTabNavigator Arrangement 
const chefDashboardTabNavigator = createBottomTabNavigator({
      Profile: {
        screen:chefProfileStack, 
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
        Items: {
          screen:chefOrderStack, 
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
          },
        Menu: {
          screen:chefSettingsStack, 
          navigationOptions: ({navigation}) => {
            const {routeName} = navigation.state.routes
            [navigation.state.index];
              return {
                header: null,
                headerTitle: routeName,
                
                tabBarIcon: ({tintColor}) => (<Icon name="md-book" color={tintColor} size={24}/>
                ),
              };
            }
          },
          Reservation: {
            screen:chefFeedStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="logo-buffer" color={tintColor} size={24}/>
                  ),
                };
              }
            },
            Message: {
              screen:chefMessageStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="md-mail-unread" color={tintColor} size={24}/>
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
        activeTintColor: '#561a1a',
        showIcon: true,
        showLabel: true, 
        activeBackgroundColor: 'rgba(215,215,215,0.1)',
        inactiveBackgroundColor: 'rgba(215,215,215,0.1)',
        labelStyle: {
          fontSize: 10,
        },
        style:{
          backgroundColor: 'black',
          height: 43,
         
        }
      }
    }
  );

// LEVEL 6
// DashboardStackNavigator => DashboardTabNavigator
const chefDashboardStackNavigator =  createStackNavigator({
    chefDashboardTabNavigator:chefDashboardTabNavigator
    
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
  
// LEVEL 5
// createDrawerNavigator 
// Content screen 
// Drawnavigation => DashboardStackNavigator
const chefDrawnavigator = createDrawerNavigator({
  Dashboard:{
    screen: chefDashboardStackNavigator
  },
  LogOut:{
    screen: chefSettings
  }
},{ 
    defaultNavigationOptions:{
      style:{
        backgroundColor: 'rgba(5,134,215,0.6)',
      }
}
});

// LEVEL 4
// Profile Page With the Drawnavigation  
const ChefStack = createStackNavigator(
    { 
      Profile: chefDrawnavigator
    },{ 
      defaultNavigationOptions:{
        headerStyle:{
          backgroundColor:'orange'
        },
        header: null
      }
  });

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> Chef VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> Admin VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

import adminFeed from './app/components/Screens/adminFeeds'
import adminOrder from './app/components/Screens/adminOrder' 
import adminDetail from './app/components/Screens/adminDetail'
import adminupdateResInfo from './app/components/Screens/adminupdateResInfo'
import adminaddReorder from './app/components/Screens/adminaddReorder'
import adminupdateUserInfo from './app/components/Screens/adminupdateUserInfo'
import adminEditProfile from './app/components/Screens/adminEditProfile'

import adminChangePassword from './app/components/Screens/adminChangePassword'
import adminupdateUserEmailorPass from './app/components/Screens/adminupdateUserEmailorPass'
import adminSettings from './app/components/Screens/adminSettings' 
import adminProfile from './app/components/Screens/adminProfile'
import adminReports from './app/components/Screens/adminReports'


import adminResReport from './app/components/Screens/adminResReport'
import adminOrderReport from './app/components/Screens/adminOrderReport'
import adminCart from './app/components/Screens/adminCart'
import adminMessage from './app/components/Screens/adminMessage'
import adminReadsent from './app/components/Screens/adminReadsent'
import adminreply from './app/components/Screens/adminreply'
import adminSendMessage from './app/components/Screens/adminSendMessage'
import adminViewContact from './app/components/Screens/adminViewContact'
import adminaddfoodItem from './app/components/Screens/adminaddfoodItem'
import adminupdatefooditem from './app/components/Screens/adminupdatefooditem'


// FeedStack => FeedPage, DetailPage 
const adminMessageStack = createStackNavigator({
  adminMessage: { 
    screen: adminMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Messages',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('adminSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          backgroundColor:'white',
          height: 40,
          color: "white"
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  adminViewContact: {
    screen: adminViewContact,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Contact Profile',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, 
  adminSendMessage: {
    screen: adminSendMessage, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Send Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },  
  adminreply:{
    screen:adminreply, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, adminReadsent:{
    screen:adminReadsent, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Read Sent Message',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },

},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
}
)

// FeedStack => FeedPage, DetailPage 
 const adminFeedStack = createStackNavigator({
    adminFeed: { 
      screen: adminFeed, 
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerLeft:(
            <Icon 
            style={{paddingLeft: 15}} 
            onPress={() => navigation.openDrawer()}
            name='md-menu' size={30} />
          ), headerRight:(
            <Icon 
            style={{paddingRight: 15}} 
            onPress={() => navigation.navigate('adminSettings')}
            name='md-cart' size={25} /> 
          ),
          headerStyle:{
            // backgroundColor:'gray'
            height: 40
          }
        }
      }
    },
    adminDetail: {
      screen: adminDetail,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }, 
    adminupdateResInfo: {
      screen: adminupdateResInfo,
      navigationOptions:({navigation}) => {
        return {
          headerTitle:'Reservation',
          headerStyle:{
            //  backgroundColor:'#b3a7a9',
            height: 40,
            margin: 0,
          }
        }
      }
    }
  },{
    defaultNavigationOptions:{
      gesturesEnabled: false
    }
  }
  )

// FeedStack => FeedPage, DetailPage 


const adminOrderStack = createStackNavigator({
  adminOrder: { 
    screen: adminOrder, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Items ',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('adminSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  adminaddReorder: {
    screen: adminaddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
}
},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
})
  
// ProfileStack => ProfilePage 
const adminProfileStack = createStackNavigator({
  adminProfile: { 
    screen: adminProfile, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:"admin's Profile",
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), 
        headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('adminSettings')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  },
  adminupdateUserInfo: {
    screen: adminupdateUserInfo,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  adminEditProfile: {
    screen: adminEditProfile,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Edit Profile Info',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  },
  adminChangePassword: {
    screen: adminChangePassword,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Update Password',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }, adminupdateUserEmailorPass: {
    screen: adminupdateUserEmailorPass,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Update Password & Email',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }
    }
  }
})

// SettingsStack => SettingsPage 
const adminSettingsStack = createStackNavigator({
  adminSettings: { 
    screen: adminSettings, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Menu',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ),  headerRight:(
          <Icon 
          style={{paddingRight: 15}} 
          onPress={() => navigation.navigate('adminCart')}
          name='md-cart' size={25} /> 
        ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  },
  adminaddReorder: {
    screen: adminaddReorder,
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Display Item',
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40,
          margin: 0,
        }
      }  
    }
},  adminCart: {
  screen: adminCart,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Ordering Process',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}, adminaddfoodItem: {
  screen: adminaddfoodItem,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Add Item',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}, adminupdatefooditem: {
  screen: adminupdatefooditem,
  navigationOptions:({navigation}) => {
    return {
      headerTitle:'Update Item',
      headerStyle:{
        //  backgroundColor:'#b3a7a9',
        height: 40,
        margin: 0,
      }
    }
  }
}
})

// LEVEL7
// DashboardTabNavigator  => Order, ProfileStack, SettingsStack,FeedStack
// DashboardTabNavigator Arrangement 
const adminDashboardTabNavigator = createBottomTabNavigator({
      Profile: {
        screen:adminProfileStack, 
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
        Items: {
          screen:adminOrderStack, 
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
          },
        Menu: {
          screen:adminSettingsStack, 
          navigationOptions: ({navigation}) => {
            const {routeName} = navigation.state.routes
            [navigation.state.index];
              return {
                header: null,
                headerTitle: routeName,
                
                tabBarIcon: ({tintColor}) => (<Icon name="md-book" color={tintColor} size={24}/>
                ),
              };
            }
          },
          Reservation: {
            screen:adminFeedStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="logo-buffer" color={tintColor} size={24}/>
                  ),
                };
              }
            },
            Message: {
              screen:adminMessageStack,
            navigationOptions: ({navigation}) => {
              const {routeName} = navigation.state.routes
              [navigation.state.index];
                return {
                  header: null,
                  headerTitle: routeName,
                  tabBarIcon: ({tintColor}) => (<Icon name="md-mail-unread" color={tintColor} size={24}/>
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
        activeTintColor: '#561a1a',
        showIcon: true,
        showLabel: true, 
        activeBackgroundColor: 'rgba(215,215,215,0.1)',
        inactiveBackgroundColor: 'rgba(215,215,215,0.1)',
        labelStyle: {
          fontSize: 10,
        },
        style:{
          backgroundColor: 'black',
          height: 43,
         
        }
      }
    }
  );

// LEVEL 6
// DashboardStackNavigator => DashboardTabNavigator
const adminDashboardStackNavigator =  createStackNavigator({
    adminDashboardTabNavigator:adminDashboardTabNavigator
    
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

  
// REPORTS  ---------------------------------------
// ProfileStack => ProfilePage 
const adminCustomersReportStack = createStackNavigator({
  adminProfile: { 
    screen: adminReports, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:"Customers Report",
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), 
        // headerRight:(
        //   <Icon 
        //   style={{paddingRight: 15}} 
        //   onPress={() => navigation.navigate('adminSettings')}
        //   name='md-cart' size={25} /> 
        // ),
        headerStyle:{
          //  backgroundColor:'#b3a7a9',
          height: 40
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  }
})

// SettingsStack => SettingsPage 
const adminitemReportStack = createStackNavigator({
  adminSettings: { 
    screen: adminOrderReport, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Order Reports',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ),  
        // headerRight:(
        //   <Icon 
        //   style={{paddingRight: 15}} 
        //   onPress={() => navigation.navigate('adminCart')}
        //   name='md-cart' size={25} /> 
        // ),
        headerStyle:{
          // backgroundColor:'gray'
          height: 40
        }
      }
    }
  }
})



// FeedStack => FeedPage, DetailPage 
const adminReservationReportStack = createStackNavigator({
  adminMessage: { 
    screen: adminResReport, 
    navigationOptions:({navigation}) => {
      return {
        headerTitle:'Reservation Report',
        headerLeft:(
          <Icon 
          style={{paddingLeft: 15}} 
          onPress={() => navigation.openDrawer()}
          name='md-menu' size={30} />
        ), 
        // headerRight:(
        //   <Icon 
        //   style={{paddingRight: 15}} 
        //   onPress={() => navigation.navigate('adminSettings')}
        //   name='md-cart' size={25} /> 
        // ),
        headerStyle:{
          backgroundColor:'white',
          height: 40,
          color: "white"
        }, headerTitleStyle:{
          color: "black",
          paddingTop:0,
          justifyContent: "center",
          marginLeft: 20
          
        }
      }
    }
  }
}
)

// // FeedStack => FeedPage, DetailPage 
//  const adminOrderReportStack = createStackNavigator({
//     adminFeed: { 
//       screen: adminOrderReport, 
//       navigationOptions:({navigation}) => {
//         return {
//           headerTitle:'Reservation',
//           headerLeft:(
//             <Icon 
//             style={{paddingLeft: 15}} 
//             onPress={() => navigation.openDrawer()}
//             name='md-menu' size={30} />
//           ), headerRight:(
//             <Icon 
//             style={{paddingRight: 15}} 
//             onPress={() => navigation.navigate('adminSettings')}
//             name='md-cart' size={25} /> 
//           ),
//           headerStyle:{
//             // backgroundColor:'gray'
//             height: 40
//           }
//         }
//       }
//     },
//     adminDetail: {
//       screen: adminDetail,
//       navigationOptions:({navigation}) => {
//         return {
//           headerTitle:'Reservation',
//           headerStyle:{
//             //  backgroundColor:'#b3a7a9',
//             height: 40,
//             margin: 0,
//           }
//         }
//       }
//     }, 
//     adminupdateResInfo: {
//       screen: adminupdateResInfo,
//       navigationOptions:({navigation}) => {
//         return {
//           headerTitle:'Reservation',
//           headerStyle:{
//             //  backgroundColor:'#b3a7a9',
//             height: 40,
//             margin: 0,
//           }
//         }
//       }
//     }
//   },{
//     defaultNavigationOptions:{
//       gesturesEnabled: false
//     }
//   }
//   )

// // FeedStack => FeedPage, DetailPage 


// const adminStaffReportStack = createStackNavigator({
//   adminOrder: { 
//     screen: adminReports, 
//     navigationOptions:({navigation}) => {
//       return {
//         headerTitle:'Display Items ',
//         headerLeft:(
//           <Icon 
//           style={{paddingLeft: 15}} 
//           onPress={() => navigation.openDrawer()}
//           name='md-menu' size={30} />
//         ), headerRight:(
//           <Icon 
//           style={{paddingRight: 15}} 
//           onPress={() => navigation.navigate('adminSettings')}
//           name='md-cart' size={25} /> 
//         ),
//         headerStyle:{
//           // backgroundColor:'gray'
//           height: 40
//         }
//       }
//     }
//   },
//   adminaddReorder: {
//     screen: adminaddReorder,
//     navigationOptions:({navigation}) => {
//       return {
//         headerTitle:'Display Item',
//         headerStyle:{
//           //  backgroundColor:'#b3a7a9',
//           height: 40,
//           margin: 0,
//         }
//       }
//     }
// }
// },{
//   defaultNavigationOptions:{
//     gesturesEnabled: false
//   }
// })
  
// LEVEL7 REPORTS 
// DashboardTabNavigator  => Order, ProfileStack, SettingsStack,FeedStack
// DashboardTabNavigator Arrangement 
const adminREPORTSDashboardTabNavigator = createBottomTabNavigator({
  Users: {
    screen:adminCustomersReportStack, 
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
    Items: {
      screen:adminitemReportStack, 
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
      },
    Reservation: {
      screen:adminReservationReportStack, 
      navigationOptions: ({navigation}) => {
        const {routeName} = navigation.state.routes
        [navigation.state.index];
          return {
            header: null,
            headerTitle: routeName,
            
            tabBarIcon: ({tintColor}) => (<Icon name="md-book" color={tintColor} size={24}/>
            ),
          };
        }
      },
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
    activeTintColor: '#561a1a',
    showIcon: true,
    showLabel: true, 
    activeBackgroundColor: 'rgba(215,215,215,0.1)',
    inactiveBackgroundColor: 'rgba(215,215,215,0.1)',
    labelStyle: {
      fontSize: 10,
    },
    style:{
      backgroundColor: 'black',
      height: 43,
     
    }
  }
}
);
  // LEVEL 6 REPORST 
// DashboardStackNavigator => DashboardTabNavigator
const adminREPORTSDashboardStackNavigator =  createStackNavigator({
  adminREPORTSDashboardTabNavigator:adminREPORTSDashboardTabNavigator
  
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
  
// LEVEL 5
// createDrawerNavigator 
// Content screen 
// Drawnavigation => DashboardStackNavigator
const adminDrawnavigator = createDrawerNavigator({
  Dashboard:{
    screen: adminDashboardStackNavigator
  },
  Reports:{
    screen: adminREPORTSDashboardStackNavigator,
  }
},{ 
    defaultNavigationOptions:{
      style:{
        backgroundColor: 'rgba(5,134,215,0.6)',
      }
}
});

// LEVEL 4
// Profile Page With the Drawnavigation  
const AdminStack = createStackNavigator(
    { 
      Profile: adminDrawnavigator
    },{ 
      defaultNavigationOptions:{
        headerStyle:{
          backgroundColor:'orange'
        },
        header: null
      }
  });

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// >> adminTOMER VIEW <<  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// LEVEL 3 
// AuthStack => loginPage, SignupPage 
const AuthStack = createStackNavigator({
  Login : {screen:LoginScreen},
  Signup: {screen:SignupScreen},   
  forgotpassword: {screen:forgotpasswordScreen},
},{
  initialRouteName: 'Login'
}
);


// LEVEL 2 
// 1 AppContainer 
const AppContainer = createAppContainer(createSwitchNavigator({
  Auth:  {screen:AuthStack},
  Cus:   {screen:CusStack},
  Admin: {screen:AdminStack},
  Emp:   {screen:WaiterStack},
  Chef:  {screen:ChefStack},
},{
  initialRouteName: 'Auth'
}
));


export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }


  

  render (){
 
    return(
      <AppContainer/>
    )
  }
}

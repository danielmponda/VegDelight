import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView
  } from 'react-native';

  import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
  import firebase from 'react-native-firebase';

  const {width: WIDTH} = Dimensions.get('window');
  import bgImage from './images/background.jpg' 
  import logoImage from './images/logo.png'
  import Icon from 'react-native-vector-icons/Ionicons'
  


export default class adminupdateUserEmailorPass extends Component  {

    constructor(props) {
        super()

        this.state = {
          currentUser: firebase.auth().currentUser.uid,
          currentPassword:"",
          newPassword:"",
          newEmail:"", 
         
        }
    }


    reauthenticate = (currentPassword) => {
      let user = firebase.auth().currentUser;
      let cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
      return user.reauthenticateWithCredential(cred);
    }

   onChangePasswordPress = () =>{
      this.reauthenticate(this.state.currentPassword).then(()=>{
        let user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPassword).then(()=> {
          alert("Password was changed")
          this.props.navigation.navigate('Profile');
        }).catch((error) =>{
          alert(error.message)
        });
    }).catch((error) => {
        alert(error.message)
    });
    }

    onChangeEmailPress = () =>{
      this.reauthenticate(this.state.currentPassword).then(()=>{
        let user = firebase.auth().currentUser;
        user.updateEmail(this.state.newEmail).then(()=> {
          alert("Email was changed")
          this.props.navigation.navigate('Profile');
        }).catch((error) =>{
          alert(error.message)
        });
    }).catch((error) => {
        alert(error.message)
    });
    }


    showPass = () => {
      if(this.state.press == true){
        this.setState({showPass: false, 
                       press: true
                      })
      } else {
        this.setState({showPass: true, 
                      press: false
                    })
      }
    }
    
  render(){
    return ( 
      <ImageBackground   source={bgImage} style={styles.ImageBackgroundCon}>
                <ScrollView>
       <View style={styles.container}> 
      
      <StatusBar 
      backgroundColor='black'
      barStyle="light-content"
      />

        <View style={styles.cover}>
            <TouchableWithoutFeedback>
              <Image  style={styles.coverPhoto} source={coverPhoto} />
            </TouchableWithoutFeedback>
        </View>


        <View style={styles.fieldContainer}>



  

<View>
              <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              />
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  // onChangeText={this.handleChangePassword} 
                  placeholder="Current Password"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  secureTextEntry={this.state.showPass}
                  underlineColorAndroid='transparent'
                  //onChangeText={(password) => this.setState({password: password})}
                  // onChangeText={this.handleSetpasswordLocalState} 
                  onChangeText={(text)=>{this.setState({currentPassword: text})}}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={this.state.currentPassword}
                />
                <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                  size={26} color={'rgba(0,0,0,0.45)'}/>
                </TouchableOpacity>
            </View>




        <View>
              <Icon name={'md-lock'} size={28} color={'rgba(0,0,0,0.45)'}
              style={styles.inputIcon}
              />
                <TextInput
                  style={styles.input}
                  // defaultValue={this.state.value}
                  onChangeText={this.handleChangePassword} 
                  placeholder="New Password"
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  secureTextEntry={this.state.showPass}
                  underlineColorAndroid='transparent'
                  //onChangeText={(password) => this.setState({password: password})}
                  // onChangeText={this.handleSetpasswordLocalState} 
                  onChangeText={(text)=>{this.setState({newPassword: text})}}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={this.state.newPassword}
                />
                <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false? 'md-eye' :'md-eye-off' } 
                  size={26} color={'rgba(0,0,0,0.45)'}/>
                </TouchableOpacity>
            </View>




            <TouchableOpacity style={styles.btnLogin}
              onPress={this.onChangePasswordPress}
                // onPress={this.handleUpdateUsers}
                >
                <Text style={styles.btnText}>Update Password</Text>
            </TouchableOpacity>


            <View>
            <Icon  name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={(text)=>{this.setState({newEmail: text})}}
                // onChangeText={this.handleSetemailLocalState} 
                placeholder="New Email"
                keyboardType ="email-address"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
              
              />
          </View> 

          <TouchableOpacity style={styles.btnLogin}
              onPress={this.onChangeEmailPress}
                // onPress={this.handleUpdateUsers}
                >
                <Text style={styles.btnText}>Update Email</Text>
            </TouchableOpacity>


            </View>
            
    </View>
    </ScrollView>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
    ImageBackgroundCon: {
      flex: 1,
      justifyContent: 'center',
      width: null,
      height: null,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding:0,
    },
    coverPhoto:{
        width: WIDTH,
        height: WIDTH * (9/19),
        marginBottom: 2,
        padding: 0,
      },  
    fieldContainer: {
      flex:6,
      marginTop: 10,
      elevation:1,
      justifyContent: 'center',
    },
    input:{
      width: WIDTH - 36,
      height: 45,
      fontSize: 16,
      color: 'rgba(245, 245, 245, 0.993)',
      backgroundColor:  'rgba(0,0,0,0.45)',
      marginHorizontal: 20,
      height: 40,
      paddingLeft: 45,
      borderRadius: 25,
      marginBottom: 10
    },
    inputIcon:{
      position: 'absolute',
      top: 4,
      left:34,
    },
    btnEye:{
      position: 'absolute',
      top: 4,
      right:34,
    },
    btnLogin:{
        width: WIDTH - 36,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#561a1a',
      marginHorizontal: 20,
      marginTop: 0,
      justifyContent: 'center',
      marginBottom: 15
    },
    btnText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white'
    }, 
    btnSignUpText:{
      fontSize: 14,
      color: 'white',
      textAlign: 'center'
    }
  });
  
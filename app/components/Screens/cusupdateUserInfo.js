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
  


export default class cusupdateUserInfo extends Component  {


    
    constructor(props) {
        super()

        this.state = {
          currentUser: firebase.auth().currentUser.uid,
          firstName:"",
          lastName:"",
          address:"",
          email: "",
          phoneNumber:"",
          dob:"",
          gender:"",
        }
    }

    handleUpdateUsers = () => {
        let userid = this.state.currentUser 
        const db = firebase.firestore();
        const updateUser = db.collection("users").doc(userid)
        
        updateUser.update({
            firstName: this.state.firstName,
            lastName:  this.state.lastName,
            address: this.state.address,
            phoneNumber:  this.state.phoneNumber,
            dob: this.state.dob,
        });

        if(updateUser){
             alert("Updated sucessfully"); 
             this.props.navigation.navigate('Profile');
        }

       

      

    }


    componentDidMount() {

        const db = firebase.firestore();

        db.settings({timestampsInSnapshots: true})

        const myProfile = db.collection("users").doc(this.state.currentUser)
        
        myProfile.get()
          .then(doc => {
              const data = doc.data()
              this.setState({
                      firstName: data.firstName,
                      lastName:  data.lastName,
                      address: data.address,
                      email:  data.email,
                      phoneNumber:  data.phoneNumber,
                      dob: data.dob,
                      gender: data.gender,
                     
                    })
          })
        
}


handleSetFirstNameLocalState = (firstName) => {
    this.setState({
      firstName,
    });
  }
  handleSetLastNameLocalState = (lastName) => {
    this.setState({
      lastName,
    });
  }
  handleSetDOBLocalState = (dob) => {
    this.setState({
      dob,
    });
  }
  handleSetAdressLocalState = (address) => {
    this.setState({
      address,
    });
  }
  handleSetphoneNumberLocalState = (phoneNumber) => {
    this.setState({
      phoneNumber,
    });
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
                <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
                style={styles.inputIcon}
                /> 
                <TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    defaultValue={this.state.firstName}
                />
        </View>

          <View>
            <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetLastNameLocalState} 
                placeholder="Last name"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.lastName}
              />
          </View>

        <View>
            <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetDOBLocalState} 
                placeholder="Date Of Birth"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.dob}
              />
        </View>

          <View>
            <Icon  name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetAdressLocalState} 
                placeholder="Address"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.address}
              />
          </View>
        
            <View>
                <Icon  name={'md-phone-portrait'} size={28} color={'rgba(0,0,0,0.45)'}
                style={styles.inputIcon}
                /> 
                <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetphoneNumberLocalState} 
                placeholder="Mobile"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.phoneNumber}
                />
            </View>

          {/* <View>
            <Icon  name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetemailLocalState} 
                placeholder="Email Address"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
              />
          </View> */}


            <TouchableOpacity style={styles.btnLogin}
                onPress={this.handleUpdateUsers}>
                <Text style={styles.btnText}>Update</Text>
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
  
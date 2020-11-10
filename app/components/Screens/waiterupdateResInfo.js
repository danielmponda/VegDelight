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
    ScrollView,
    Alert
  } from 'react-native';

  import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
  import firebase from 'react-native-firebase';

  const {width: WIDTH} = Dimensions.get('window');
  import bgImage from './images/background.jpg' 
  import logoImage from './images/logo.png'
  import Icon from 'react-native-vector-icons/Ionicons'
  


export default class waiterupdateResinfo extends Component  {

    constructor(props) {
        super(props)

        this.state = {
          currentUserId: firebase.auth().currentUser.uid,
          date:"",
          time:"",
          numberofattendees:"",
          comments: "",
        
       
        }
    }

    handleUpdateUsers = () => {

      const db = firebase.firestore();
      Alert.alert(
        '',
        'Are you sure you want to Update',
        [
          {text: 'yes',onPress: () =>  {
            const { resid } = this.props.navigation.state.params;
    
            const db = firebase.firestore();
            const updateUser = db.collection("reservation").doc(resid)
            
            updateUser.update({
                date:  this.state.date,
                time: this.state.time,
                numberofattendees:  this.state.numberofattendees,
                comments: this.state.comments,
            });

            
        if(updateUser){
          this.props.navigation.goBack();
            alert("Updated sucessfully"); 
           
          
         
       }

          } ,style: 'cancel',},
          {text: 'no', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );

    }


    componentDidMount() {
        
        const { resid } = this.props.navigation.state.params;
        
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      const myProfile = db.collection("reservation").doc(resid)
      
      myProfile.get()
        .then(doc => {
            const data = doc.data()
            this.setState({
                    date: data.date,
                    time:  data.time,
                    numberofattendees: data.numberofattendees,
                    comments:  data.comments,
                  })
        })
      
}

handleSetDateLocalState = (date) => {
    this.setState({
      date,
    });
  }
  handleSetTimeLocalState = (time) => {
    this.setState({
      time,
    });
  }
  handleSetNumberOfAttendeesLocalState = (numberofattendees) => {
    this.setState({
      numberofattendees,
    });
  }
  handleSetCommentsLocalState = (comments) => {
    this.setState({
      comments,
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
                    onChangeText={this.handleSetDateLocalState}
                    placeholder="Date"
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                    defaultValue={this.state.date}
                    
                />
        </View>

          <View>
            <Icon  name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetTimeLocalState} 
                placeholder="Time"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.time}
             
              />
          </View>

        <View>
            <Icon  name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetNumberOfAttendeesLocalState} 
                placeholder="number of attendees"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.numberofattendees}
               
              />
        </View>

          <View>
            <Icon  name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}
            style={styles.inputIcon}
            /> 
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                onChangeText={this.handleSetCommentsLocalState} 
                placeholder="Comments"
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                defaultValue={this.state.comments}
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
  
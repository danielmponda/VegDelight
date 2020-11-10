import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import bgImage from './images/background.jpg' 

const {width: WIDTH} = Dimensions.get('window');

import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import image4 from './images/image4.jpg'

import firebase from 'react-native-firebase';

export default class LoadingScreen extends Component  {

    constructor() {
            super()
        }

        componentDidMount() {
        var userr = firebase.auth().currentUser;
        var userrr = userr.emailVerified
           if (userrr){  
            var usrrr = userr.displayName
             if(usrrr=="User"){
               this.props.navigation.navigate('Cus');
             } else if(usrrr=="Emp") {
              this.props.navigation.navigate('Emp');
             } else if(usrrr=="Admin") {
             this.props.navigation.navigate('Admin');
             } else if(usrrr=="Chef") {
            this.props.navigation.navigate('Chef');
             }else {
             alert("The Email Used is not Verified Yet, Please Verify Your Email");
             }
            }
        }



  render(){
    return ( 
     
      <ImageBackground  style={styles.ImageBackgroundCon}>

      <StatusBar  backgroundColor='#b3a7a9'barStyle="light-content" />
      
      <ScrollView>
          <View style={styles.container}>

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
  btnLogin:{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(34,53,65,0.65)',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 130
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'pink'
  }, 
  container:{
    alignItems: "center",
  },
  coverPhoto:{
    width: WIDTH,
    height: WIDTH * (9/16),
    marginBottom: 10,
  },  
  sectionone:{
    marginBottom: 50,
    color: 'rgba(245, 245, 245, 0.993)',
    backgroundColor:  'rgba(0,0,0,0.45)',
    width: WIDTH - 40,
    height: WIDTH * (9/16),
    // elevation:1,
  },
  sectiontwo:{
    marginBottom: 10,
    // backgroundColor: "rgba(233, 233, 233, 0.5)",
    // width: WIDTH - 40,
    width: WIDTH,
    height: WIDTH * (9/19),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor:  'rgba(0,0,0,0.1)',
    // borderBottomColor: "rgba(1,1,1,00000000000000.1)",
    // borderBottomWidth: 7,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    padding: 10
  },
  sectiontwoa:{
    flex:1,
    padding: 0,
    margin: 2,
  },
  sectiontwob:{
    flex:1,
    // backgroundColor: "pink",
    padding: 0,
 margin: 2,
  },
  sectionthree:{
    marginBottom: 4,
    backgroundColor: "rgba(233, 233, 233, 0.5)",
    width: WIDTH - 40,
    height: WIDTH * (9/16)
  },
  sectiontext: {
    padding: 10,
    // color: 'rgba(245, 245, 245, 0.993)',
  }, 
  itemPhoto: {
    width: WIDTH - 200,
    height: WIDTH * (9/25),
    padding: 0,
    margin: 0,
    borderRadius: 100
  }, 
  orderText:{
    color: "rgba(255, 166, 0, 0.883)"
  }, 
  headText:{
    fontWeight: "bold"
  }
});

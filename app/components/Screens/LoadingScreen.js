import React, {Component} from 'react';
import { View } from 'react-native-animatable';
import firebase from 'react-native-firebase';


export default class LoadingScreen extends Component{
    constructor(props) {
      super(props)
      this.state = {
      }
    }
  
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
         if(user){
            var userr = firebase.auth().currentUser;
            var usrrr = userr.displayName
            if(usrrr=="User"){
              this.props.navigation.navigate('Cus');
            } else if(usrrr=="Emp") {
              this.props.navigation.navigate('Emp');
            } else if(usrrr=="Admin") {
            this.props.navigation.navigate('Admin');
            } else if(usrrr=="Chef") {
            this.props.navigation.navigate('Chef');
            }
         }
        })
      }
    
  
    render (){
      return(
        <View></View>
      )
    }
  }
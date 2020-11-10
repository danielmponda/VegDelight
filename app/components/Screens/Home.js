import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
import bgImageHome from './images/hero-bg2.jpg' 

export default class HomeScreen extends Component  {
  static navigationOptions = {
    header: null
  }

  render(){
    return ( 
      <ImageBackground source={bgImageHome} style={styles.ImageBackgroundCon}>
      <View>
      <View>
        <Text style={styles.btnText}> Welcome Home</Text>
        </View>
                <TouchableOpacity 
                style={styles.btnLogin}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.btnText}>SignIn</Text>
            </TouchableOpacity>

             

        </View>

        
   
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
  }
});

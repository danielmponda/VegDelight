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
  Button,
  ActivityIndicator,
  AppRegistry,
  Alert,
  TextInput
} from 'react-native';


import ImagePicker from 'react-native-image-crop-picker'
import bgImage from './images/background.jpg'
import Icon from 'react-native-vector-icons/Ionicons'

const {width: WIDTH} = Dimensions.get('window');

import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
import profilePic from './images/Perfection-2593.png'
import firebase from 'react-native-firebase';




export default class chefupdatefooditem extends Component  {

    constructor(props) {
      super()
        this.state = {
          currentUserid: firebase.auth().currentUser,
          currentUser: firebase.auth().currentUser.uid,
          itemId:"",
          itemName:"",
          Price:"",
          Category:"",
          Description: "",
          sentID: "",

          loading: false,
          dp: null
            }
        }


        handleUpdateUsers = () => {
           
            const db = firebase.firestore();
            const updateUser = db.collection("foodItem").doc(this.state.sentID)
            updateUser.update({
                itemName: this.state.itemName,
                Price: parseInt(this.state.Price) ,
                Category: this.state.Category,
                Description:  this.state.Description,
              
            });
    
            if(updateUser){
                 alert("Updated sucessfully"); 
                 this.props.navigation.goBack();
            }
    
           
    
          
    
        }
   


        componentDidMount() {

            const { itemId } = this.props.navigation.state.params;
            
        this.setState({
            sentID : itemId
        })

               
                 
          // let userId = this.state.currentUserid

          const db = firebase.firestore();

          db.settings({timestampsInSnapshots: true})

          let doc = db.collection("foodItem").doc(itemId)
          doc.onSnapshot(docSnapshot => {
                          this.setState({
                            itemId: doc.id,
                            itemName: docSnapshot.data().itemName,
                            Price:    docSnapshot.data().Price,                               
                            Category:  docSnapshot.data().Category,
                            Description:  docSnapshot.data().Description,
                            Url: docSnapshot.data().urll,
                                
                        })
                        });        
  }

            static navigationOptions = {
              title: "My Profile",
              headerRight: <View />
            }
        

          handleSetitemNameLocalState = (itemName) => {
            this.setState({
                itemName,
            });
          }
          handleSetPriceLocalState = (Price) => {
            this.setState({
              Price,
            });
          }
          handleSetCategoryLocalState = (Category) => {
            this.setState({
              Category,
            });
          }
          handleSetDescriptionLocalState = (Description) => {
            this.setState({
              Description,
            });
          }
 
        
     


              render(){

                return ( 
                  <ImageBackground  source={bgImage} style={styles.ImageBackgroundCon}>
                  <StatusBar backgroundColor='#b3a7a9' barStyle="light-content"/>
                    <ScrollView>
                      <View style={styles.container}>
            
                      <View style={styles.cover}>
                          <TouchableWithoutFeedback >
                            <Image  style={styles.coverPhoto}  source={{uri:this.state.Url}}  />
                          </TouchableWithoutFeedback>
                          <View style={styles.itempricestyle}>
                              <Icon style={styles.innerresar} name={'md-pricetags'} size={50} color={'rgba(0,0,0,0.45)'}/> 
                              <Text style={styles.itemprice}>  {this.state.Price} </Text>
                          </View>
                          <View style={styles.itemnamestyel}>
                          <Text style={styles.profileinfoName}>{this.state.itemName} </Text>
                          </View>
                      </View>
          
                      <View style={styles.sectionone}>

<View style={styles.holder}>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-restaurant'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetitemNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                 
                    defaultValue={this.state.itemName}
                   
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Address: {this.state.address} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-pricetags'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetPriceLocalState}
                    // placeholder={this.state.Price.toString()}
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'         
                    defaultValue={this.state.Price.toString()}
               />
</View>
</View>

{/* <Text style={styles.profileinfo}>Email: {this.state.email} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-list'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetCategoryLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetCategoryLocalState} 
                    defaultValue={this.state.Category}
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Phone: {this.state.phoneNumber} </Text> */}

<View style={[styles.innerres,styles.textArea]}>
<Icon style={styles.innerresa} name={'md-information-circle'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput    
                    style={[styles.input,styles.textArea]}
                    // defaultValue={this.state.value}
                    // onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    // onChangeText={this.handleSetAdressLocalState} 
                    // defaultValue={this.state.address}
                    numberOfLine={7}
                    multiline={true}
                    onChangeText={this.handleSetDescriptionLocalState}
                    placeholder="Comment..."
                    defaultValue={this.state.Description}
                    
                   
                />
</View>

</View>

</View> 
                      
                    
                     
        </View>

          <View style={styles.logoutsec}>
                    
                    <TouchableOpacity style={styles.btnLoginh}
                            onPress={this.handleUpdateUsers}
                          >
                          <Text style={styles.btnTexth}>Update</Text>
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
            container:{
              alignItems: "center",
      height: WIDTH * (9/5.2),
            },
            coverPhoto:{
              width: WIDTH,
              height: WIDTH * (9/13),
              marginBottom: 10,
             
                borderColor: 'rgba(0,0,0,0.1)',
              borderWidth: 2,
       
            },
            sectionone:{
              marginBottom: 10,
              backgroundColor:  'rgba(0,0,0,0.1)',
              borderBottomColor: "rgba(1,1,1,00000000000000.1)",
              borderBottomWidth: 30,
              width: WIDTH - 40,
              height: WIDTH * (9/13),
              borderRadius: 30,
            },
            sectiontwo:{
              marginBottom: 10,
              backgroundColor: "rgba(233, 233, 233, 0.5)",
              width: WIDTH - 40,
              height: WIDTH * (9/16)
            },
            sectionthree:{
              marginBottom: 10,
              backgroundColor: "rgba(233, 233, 233, 0.5)",
              width: WIDTH - 40,
              height: WIDTH * (9/16)
            },
            sectionfour:{
              marginBottom: 10,
              backgroundColor: "rgba(233, 233, 233, 0.5)",
              width: WIDTH - 40,
              height: WIDTH * (9/16)
            },
            sectiontext: {
              padding: 10,
            },
            logoutsec:{
              width: WIDTH,
              paddingBottom: 10,
              marginBottom: 10,
              marginLeft: -18,
         
            },
            profileinfo:{
              marginBottom: 7,
              paddingLeft: 10,
            },
            itemPhoto: {
              // width: WIDTH - 200,
              // height: WIDTH * (9/25),
              width: 140,
              height:140,
              margin: 10,
              padding: 10,
              marginBottom: -50,
              borderRadius: 100
            }, 
            sectiontwo: {
              margin: 5,
          
            }, 
            profileinfoName:{
              padding: 5,
              fontSize: 20,
              color: "white",
              // borderBottomColor: "rgba(1,1,1,00000000000000.1)",
              // borderBottomWidth: 3,
              marginBottom:3
            },innerres:{
              flexDirection: "row",
              width: 250,
              height:40,
              borderBottomColor: "rgba(1,1,1,00000000000000.1)",
              borderBottomWidth: 7,
              marginBottom:3
            },innerresa:{
              flex: 1,
              width: 30,
              marginBottom: -10
            },innerresb:{
              flex: 6,
              width: 100,
              marginTop:-2,
              height:40
            }, holder:{
              marginLeft: 20,
              marginTop: 6
            },resconba: {
              flex: 4,
              marginLeft: 100
            },resconbb: {
              flex: 8,
            },btncanclea :{
              width: 50,
              height: 50,
              borderRadius: 100,
              backgroundColor:  'rgba(0,0,0,0.3)',
              justifyContent: 'center'
            }, delete:{
              justifyContent: "center",
              color: 'rgba(0,0,0,0.5)',
              marginLeft: 16
            }, edit:{
              marginLeft: 16,
              color: 'rgba(1,9,4,0.5)',
            }, opholder :{
              flexDirection: "row",
              marginBottom: 10
            }, profilecontainer :{
              marginBottom: 30
            },
            btnLogin:{
              width: WIDTH - 130,
              height: 35,
              borderRadius: 12,
              backgroundColor:  'rgba(0,0,0,0.1)',
              marginHorizontal: 68,
              marginTop: -10,
              justifyContent: 'center',
            },
            btnText: {
              fontSize: 16,
              textAlign: 'center',
              color: 'rgba(0,0,0,0.5)'
            }, editpro : {
              width: WIDTH - 180,
              height: 32,
              borderRadius: 8,
              // borderColor: 'white',
              // borderWidth: 1,
              backgroundColor:  'rgba(0,0,0,0.1)',
              justifyContent: 'center',
              position:"absolute",
             top: 110,
             left:158,
            }, editproText:{
              textAlign: 'center',
              color: 'rgba(0,0,0,0.5)'
            },
            btnLoginh:{
              width: WIDTH - 80,
              height: 35,
              borderRadius: 12,
              backgroundColor:  'rgba(0,0,0,0.1)',
              marginHorizontal: 40,
              marginTop: 0,
              justifyContent: 'center',
   
            },
            btnTexth: {
              fontSize: 16,
              textAlign: 'center',
              color: 'rgba(0,0,0,0.5)'
            }, input :{
                height:40,
                marginTop: 0,
                color: 'rgba(0,0,0,0.5)'
            },  textArea:{
                fontSize: 14,
                  height:90,
                  borderBottomColor: "rgba(0,0,0,0.0)",
      borderBottomWidth: 7,

              }, itemnamestyel:{
                backgroundColor:'rgba(0,0,0,0.5)',
                height:65,
                position:"absolute",
                top: 170,
                left: -0,
                width: WIDTH
              }, itempricestyle :{
                // backgroundColor:'rgba(0,0,0,0.4)',
                color:"pink",
                height:130,
                width: 135,
                // borderWidth:1,
                // borderColor: "red",
                borderRadius:100,
                position:"absolute",
                top: 10,
                left: 150,
                flexDirection:"row"
              },innerresar:{
                flex:1,
                color:'white',
                marginTop:10,
                marginLeft:7
              },itemprice:{
                flex:1,
                color:"pink",
                fontSize:20,
                color:"white",
                marginRight:3,
                borderWidth:1,
                height:30,
                width:40,
                paddingTop:0,
                borderRadius:100,
                backgroundColor:'rgba(0,0,0,0.4)',
              }
          });

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




export default class adminEditProfile extends Component  {

    constructor(props) {
      super()
        this.state = {
          currentUserid: firebase.auth().currentUser,
          currentUser: firebase.auth().currentUser.uid,
          firstName:"",
          lastName:"",
          address: "",
          email: "",
          phoneNumber: "",
          dob: "",
          gender: "", 

          loading: false,
          dp: null
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
                 this.props.navigation.goBack();
            }
    
           
    
          
    
        }
   


        componentDidMount() {


                const starsRef = firebase.storage().ref('usersDp/'+this.state.currentUserid.uid+'.jpg');
                 starsRef.getDownloadURL().then(url => {
                    this.setState({ dp:url} )
                    console.log("done")
                 })          
                 
          // let userId = this.state.currentUserid

          const db = firebase.firestore();

          db.settings({timestampsInSnapshots: true})

          let doc = db.collection("users").doc(this.state.currentUserid.uid)
          doc.onSnapshot(docSnapshot => {
                          this.setState({
                                  firstName: docSnapshot.data().firstName,
                                  lastName:  docSnapshot.data().lastName,
                                  address: docSnapshot.data().address,
                                  email:  docSnapshot.data().email,
                                  phoneNumber:  docSnapshot.data().phoneNumber,
                                  dob: docSnapshot.data().dob,
                                  gender: docSnapshot.data().gender,
                        })
                        });        
  }

            static navigationOptions = {
              title: "My Profile",
              headerRight: <View />
            }


            openPicker(){
              this.setState({ loading: true })
              // const Blob = RNFetchBlob.polyfill.Blob
              // const fs = RNFetchBlob.fs
              // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
              // window.Blob = Blob
              // const uid  = this.state.currentUserid
               
              ImagePicker.openPicker({
                width: 300,
                height: 300, 
                cropping: true,
                mediaType: 'photo'
              }).then(image => {
                const storage = firebase.storage()
                const  mReh=storage.ref('usersDp').child(this.state.currentUserid.uid+'.jpg')
                mReh.putFile(image.path, {contentType: image.type})
                .then((snapshot) => {
                  mReh.getDownloadURL().then(url => {
                    this.setState({ loading: false, dp:url} )
                    console.log("done")
                  })
                }).catch(failureCb)
              })
            }
          
          //componentDidMount() {
              // const starsRef = firebase.storage().ref('usersDp/'+this.state.currentUserid+'.jpg');
              //    starsRef.getDownloadURL().then(url => {
              //       this.setState({ dp:url} )
              //       console.log("done")
              //    })          
                 
                
          // let db = firebase.firestore();
          // db.settings({timestampsInSnapshots: true})

          // let doc = db.collection("users").doc(this.state.currentUser)
          // let observer = doc.onSnapshot(docSnapshot => {
          //                 this.setState({
          //                         firstName: docSnapshot.data().firstName,
          //                         lastName:  docSnapshot.data().lastName,
          //                         address: docSnapshot.data().address,
          //                         email:  docSnapshot.data().email,
          //                         phoneNumber:  docSnapshot.data().phoneNumber,
          //                         dob: docSnapshot.data().dob,
          //                         gender: docSnapshot.data().gender,
          //               })
          //     });  
          // }

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

          const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
      style={styles.itemPhoto}
         source={{uri: this.state.dp}}
       />
       </TouchableOpacity>) : 
       (<Button onPress={ () => this.openPicker() } title={ "Change Picture" }/>) 

    const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : 
    (<View style={styles.profilecontainer}>
      <View style={{flexDirection: "row"}}>
        { dpr }
      </View>
    </View>)

                return ( 
                  <ImageBackground  source={bgImage} style={styles.ImageBackgroundCon}>
                  <StatusBar backgroundColor='#b3a7a9' barStyle="light-content"/>
                    <ScrollView>
                      <View style={styles.container}>
            
                      <View style={styles.cover}>
                          <TouchableWithoutFeedback >
                            <Image  style={styles.coverPhoto}  source={coverPhoto}  />
                          </TouchableWithoutFeedback>
              
                          <View style={styles.profilecontainer}>
                          { dps }
                          <Text style={styles.profileinfoName}> {this.state.firstName} {this.state.lastName} </Text>
                          <TouchableOpacity style={styles.editpro}
                          onPress={() => this.props.navigation.navigate('adminProfile')}
                          >
                          <Text style={styles.editproText}>Done Editing</Text>
                      </TouchableOpacity>
                        </View>

                  
                  
                          
                      </View>
                      <View style={styles.postionabs}>
                      <View style={styles.sectionone}>

<View style={styles.holder}>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetFirstNameLocalState}
                    defaultValue={this.state.firstName}
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Address: {this.state.address} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetLastNameLocalState} 
                    defaultValue={this.state.lastName}
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Email: {this.state.email} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetDOBLocalState} 
                    defaultValue={this.state.dob}
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Phone: {this.state.phoneNumber} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetAdressLocalState} 
                    defaultValue={this.state.address}
                   
                />
</View>
</View>

{/* <Text style={styles.profileinfo}>Date Of Birth: {this.state.dob} </Text> */}

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-phone-portrait'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    onChangeText={this.handleSetFirstNameLocalState}
                    placeholder="First name"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleSetphoneNumberLocalState} 
                    defaultValue={this.state.phoneNumber}
               />
</View>
</View>

{/* <Text style={styles.profileinfo}>Gender: {this.state.gender} </Text> */}



</View> 


                      
                      </View>
                     
                     {/* <View style={styles.opholder}>

                      <View style={styles.resconba}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={() => this.props.navigation.navigate('adminupdateUserInfo')}>
                             <Icon style={styles.delete} name={'md-create'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View>
            
                <View style={styles.resconbb}>
                    <TouchableOpacity style={styles.btncanclea}
                             onPress={() => this.props.navigation.navigate('adminupdateUserEmailorPass')} >
                                <Icon style={styles.edit} name={'md-brush'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View>

                </View> */}
                      
{/*      <View style={styles.sectionone}>
                      <View>
                      <Text> First Heading </Text>
                          <Text style={styles.sectiontext}> Veg Delight is an Indian restaurant found in both Lilongwe; near the old town mail and Blantyre near the Glyn Jones Road, which offers a diversity world class vegetarian food.  Veg Delight is the longest established Vegetarian Restaurant in Malawi. It is run by Gujarati family </Text>
                      </View>
          </View> */}
          

          <View style={styles.logoutsec}>
                    
                    <TouchableOpacity style={styles.btnLoginh}
                            onPress={this.handleUpdateUsers}
                          >
                          <Text style={styles.btnTexth}>Edit</Text>
                      </TouchableOpacity>
                                 </View>
          
                  
          
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
              width: WIDTH-20,
              height: WIDTH * (9/16),
              marginBottom: -70,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              marginTop: 10,
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
             position:"absolute",
             top: 75,
             left:160,
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
            }, postionabs:{
              position:"absolute",
              top:293,
              left:21
            }
          });

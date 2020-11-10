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
  Alert
} from 'react-native';


import ImagePicker from 'react-native-image-crop-picker'
import bgImage from './images/background.jpg'
import Icon from 'react-native-vector-icons/Ionicons'

const {width: WIDTH} = Dimensions.get('window');

import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
import profilePic from './images/Perfection-2593.png'
import firebase from 'react-native-firebase';




export default class waiterViewContact extends Component  {

    constructor(props) {
      super()
        this.state = {
          currentUserid: "",
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



        // handleLogoutUser = () => {
        //   Alert.alert(
        //     '',
        //     'Are you sure you want to SignOut ',
        //     [
        //       {text: 'yes',onPress: () => { firebase.auth().onAuthStateChanged(user => {
        //         if (user){
        //           firebase.auth().signOut().then( this.props.navigation.navigate('Auth'));
                 
        //         }
        //        }) },style: 'cancel',},
        //       {text: 'no', onPress: () => console.log('OK Pressed')},
        //     ],
        //     {cancelable: false},
        //   );
        // }


        componentDidMount() {

            const { userid } = this.props.navigation.state.params;

            this.setState({
               currentUserid:userid
            })

                const starsRef = firebase.storage().ref('usersDp/'+userid+'.jpg');
                 starsRef.getDownloadURL().then(url => {
                    this.setState({ dp:url} )
                    console.log("done")
                 })          
                 
          // let userId = this.state.currentUserid

          const db = firebase.firestore();

          db.settings({timestampsInSnapshots: true})

          let doc = db.collection("users").doc(userid)
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
              title: "",
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
                const  mReh=storage.ref('usersDp').child(this.state.currentUserid+'.jpg')
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

          sendMessage=(item)=>{
            // this.props.navigation.setParams({ name: item })
            this.props.navigation.navigate('waiterSendMessage', {userrid: item});
          }



              render(){

          const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
      style={styles.itemPhoto}
         source={{uri: this.state.dp}}
       />
       </TouchableOpacity>) : 
       (<Text></Text>) 
      //  (<Button onPress={ () => this.openPicker() } title={ "Change Picture" }/>) 

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
                        </View>
                      </View>
          
                    <View style={styles.sectionone}>

                      <View style={styles.holder}>
                    
                      <View style={styles.innerres}>
                   <Icon style={styles.innerresa} name={'md-pin'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                   <Text style={styles.innerresb} > {this.state.address}</Text>
                   </View>

                      {/* <Text style={styles.profileinfo}>Address: {this.state.address} </Text> */}

                      <View style={styles.innerres}>
                   <Icon style={styles.innerresa} name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                   <Text style={styles.innerresb} > {this.state.email} </Text>
                   </View>

                      {/* <Text style={styles.profileinfo}>Email: {this.state.email} </Text> */}

                      <View style={styles.innerres}>
                   <Icon style={styles.innerresa} name={'md-call'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                   <Text style={styles.innerresb} > {this.state.phoneNumber} </Text>
                   </View>

                      {/* <Text style={styles.profileinfo}>Phone: {this.state.phoneNumber} </Text> */}

                      <View style={styles.innerres}>
                   <Icon style={styles.innerresa} name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                   <Text style={styles.innerresb} > {this.state.dob} </Text>
                   </View>

                      {/* <Text style={styles.profileinfo}>Date Of Birth: {this.state.dob} </Text> */}

                      <View style={styles.innerres}>
                   <Icon style={styles.innerresa} name={'md-walk'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                   <Text style={styles.innerresb} >{this.state.gender}  </Text>
                   </View>

                      {/* <Text style={styles.profileinfo}>Gender: {this.state.gender} </Text> */}

                      

                      </View> 
                      
                      </View>
                      
                     <View style={styles.opholder}>

                      <View style={styles.resconba}>
                    <TouchableOpacity style={styles.btncanclea}
                               onPress={ this.sendMessage.bind(this, this.state.currentUserid) }
                            >
                                {/* <Icon style={styles.delete} name={'md-create'} size={28} color={'rgba(0,0,0,0.45)'}/>  */}
                                <Text style={styles.btnText}>Message</Text>
                                
                        </TouchableOpacity>    
                </View>
            
         

                </View>
                   {/*                    
                      <View style={styles.logoutsec}>
                        <TouchableOpacity 
                          onPress={this.handleLogoutUser}
                          //onPress={() => this.props.navigation.navigate('Profile')}
                          >
                              <Text style={styles.btnText}>LogOut</Text>
                          </TouchableOpacity>
                       </View> */}
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
              width: WIDTH,
              height: 10,
              backgroundColor: 'rgba(34,53,65,0.65)',
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'center',
            },
            btnText: {
              fontSize: 15,
              textAlign: 'center',
              color: 'white'
            }, 
            container:{
              alignItems: "center",
            },
            coverPhoto:{
              width: WIDTH,
              height: WIDTH * (9/16),
              marginBottom: -70,
            },
            sectionone:{
              marginTop: 37,
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
              height: 30,
              marginBottom: 10,
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
              marginBottom: -87,
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
            color: "white"
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
              marginBottom:-20
            },innerresb:{
              flex: 6,
              width: 100,
              marginTop:4,
            marginBottom:-20
            }, holder:{
              marginLeft: 20,
              marginTop: 6
            },resconba: {
              flex: 1,
            },resconbb: {
              flex: 8,
            },btncanclea :{
              
              height: 50,
              borderRadius: 100,
              backgroundColor:  'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              width: WIDTH - 40,
            
              borderRadius: 20,

            }, delete:{
              justifyContent: "center",
              color: 'rgba(0,0,0,0.5)',
              marginLeft: 16
            }, edit:{
              marginLeft: 16,
              color: 'rgba(1,9,4,0.5)',
            }, opholder :{
           
              marginBottom: 10
            }, profilecontainer :{
              marginBottom: 30
            }
          });
          AppRegistry.registerComponent('Profile', () => Profile);
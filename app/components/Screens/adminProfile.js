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
import moment from 'moment'

const {width: WIDTH} = Dimensions.get('window');

import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
import profilePic from './images/Perfection-2593.png'
import firebase from 'react-native-firebase';




export default class adminProfile extends Component  {

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
          numberofres:"",
          numberoford:"",
          numberofappres:"",
          unread:"",
          nextres:"",
          todaysres:"",
          numberofress:"",
          numberoford:"",
          prepared:"",

          loading: false,
          dp: null
            }
        }



        handleLogoutUser = () => {
          Alert.alert(
            '',
            'Are you sure you want to SignOut ',
            [
              {text: 'yes',onPress: () => {
                firebase.auth().signOut().then( this.props.navigation.navigate('Auth'));
              },style: 'cancel',},
              {text: 'no', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
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
                        
                        db.collection("reservation").where('currentUserId', '==',this.state.currentUser)
                        .onSnapshot(snapshot => {   
                          this.setState({
                            numberofres:snapshot.size
                          })       
                    });    

                    
     
                   var query = db.collection("reservation")
                   query = query.where('status', '==',"Approved")
                   query.onSnapshot(snapshot => {  
                    this.setState({
                      numberofress:snapshot.size
                    })       
                    });    
              
                    // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
                    //   (snapshot => {} .orderBy("date").orderByChild('timestamp')
                    let resoorder = db.collection("reservation").where('status', '==',"Approved")
                    resoorder.orderBy("date")
                    .onSnapshot(snapshot => {   
                      const todo = []; 
                      snapshot.forEach(doc => {
                        const currentTime = new Date();
                        const realdatee = doc.data().date.toDate()
                      
                         
     const bookeddaycomp = realdatee.getFullYear()+'-'+(realdatee.getMonth()+1)+'-'+realdatee.getDate()
     const currentTimecomp = currentTime.getFullYear()+'-'+(currentTime.getMonth()+1)+'-'+currentTime.getDate();

     if(bookeddaycomp==currentTimecomp){
                        todo.push({
                          resid: doc.id, 
                         
                        });
                       } } 
                    );
                  
                    this.setState({
                      todaysres:todo.length
                    })
                });
                 
                      
      
                 

                    var messagestatus = db.collection("messages").where('to', '==',this.state.currentUser)
                    messagestatus = messagestatus.where('status', '==',"false")
                    messagestatus.onSnapshot(snapshot => {   
                      this.setState({
                        unread:snapshot.size
                      })       
                      });
                      
                    db.collection("requestedItems")
                    .onSnapshot(snapshot => {   
                     
                    this.setState({
                      numberoford:snapshot.size
                    })
                    
                  })

                  db.collection("preparedItems")
                  .onSnapshot(snapshot => {   
                     
                    this.setState({
                      prepared:snapshot.size
                    })
                    
                  })

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
                          onPress={() => this.props.navigation.navigate('adminEditProfile')}
                          >
                          <Text style={styles.editproText}>Edit Profile</Text>
                      </TouchableOpacity>
                        </View>

                  
                  
                          
                      </View>
       <View style={styles.postionabs}>
       <View style={styles.sectionone}>

<View style={styles.holder}>

<View style={[styles.innerres,styles.nextres]}>
<Icon style={styles.innerresa} name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}/> 
{/* <Text style={styles.innerresb}>Upcoming Reservation: {this.state.nextres} </Text> */}
<Text style={styles.innerresb}> Number of today's Reservation:</Text>
<View style={[ (this.state.todaysres > 0) ? styles.innerrescmore : styles.innerresczero ]}><Text style={[ (this.state.todaysres > 0) ? styles.innerrestext : styles.innerrestextzero ]}> {this.state.todaysres}</Text></View>

</View>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<Text style={styles.innerresb} > Unread Messages:</Text>
<View style={[ (this.state.unread > 0) ? styles.innerrescmore : styles.innerresczero ]}><Text style={[ (this.state.unread > 0) ? styles.innerrestext : styles.innerrestextzero ]}> {this.state.unread}</Text></View>
</View>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-checkbox'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<Text style={styles.innerresb} > Number of total Reservation : </Text>
{/* <Text style={styles.innerresc} > {this.state.numberofappres}</Text> */}
<View style={[ (this.state.numberofress > 0) ? styles.innerrescmore : styles.innerresczero ]}><Text style={[ (this.state.numberofress > 0) ? styles.innerrestext : styles.innerrestextzero ]}> {this.state.numberofress}</Text></View>
</View>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-cart'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<Text style={styles.innerresb} > Number of Orders :  </Text>
{/* <Text style={styles.innerresc} > {this.state.numberoford}</Text> */}
<View style={[ (this.state.numberoford > 0) ? styles.innerrescmore : styles.innerresczero ]}><Text style={[ (this.state.numberoford > 0) ? styles.innerrestext : styles.innerrestextzero ]}> {this.state.numberoford}</Text></View>
</View>

<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'logo-buffer'} size={28} color={'rgba(0,0,0,0.45)'}/> 
<Text style={styles.innerresb} > Ready Prepared Items: </Text>
{/* <Text style={styles.innerresc} > {this.state.numberofres}</Text> */}
<View style={[ (this.state.prepared > 0) ? styles.innerrescmore : styles.innerresczero ]}><Text style={[ (this.state.prepared > 0) ? styles.innerrestext : styles.innerrestextzero ]}> {this.state.prepared}</Text></View>
</View>

  
  </View> 
</View>
                     
      
          <View style={styles.logoutsec}>
                    
                    <TouchableOpacity style={styles.btnLoginh}
                           onPress={() => this.props.navigation.navigate('adminChangePassword')}
                          >
                          <Text style={styles.btnTexth}>Change Password</Text>
                      </TouchableOpacity>
                                 </View>
          
                      <View style={styles.logoutsec}>
                    
          <TouchableOpacity style={styles.btnLogin}
                onPress={this.handleLogoutUser}>
                <Text style={styles.btnText}>SignOut</Text>
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
              height: WIDTH * (9/4.8),
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
              marginLeft: -14,
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
              width: 255,
              height:40,
              borderBottomColor: "rgba(1,1,1,00000000000000.1)",
              borderBottomWidth: 7,
              marginBottom:3
            },innerresa:{
              flex: 1,
              width: 40,
              marginBottom: -10
            },innerresb:{
              flex: 7,
              width: 100,
              marginTop:4
            },innerresc:{
              flex: 1,
              width: 30,
              height: 30,
              marginTop:4,
            }, innerrescc:{
              flex: 4,
             position:"relative",
             left:5,
             top:4,
              color: "white",
              fontWeight:"bold"
            }
            ,innerrescmore:{
              flex: 1,
              width: 3,
              height: 23,
              borderColor:"white",
              borderWidth:1,
              borderRadius: 100,
              marginTop:4,
              backgroundColor:"rgb(238, 74, 25)",
              marginRight: 5
            },innerresczero:{
              flex: 1,
              width: 30,
              height: 30,
              marginTop:4,
            },innerrestext:{
              paddingLeft:7,
              color:"white",
              // fontWeight:"bold"
            },innerrestextzero:{

            }
            , holder:{
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
            }, nextres: {
              height: 40
            }, postionabs:{
              position:"absolute",
              top:293,
              left:21
            }
          });
          AppRegistry.registerComponent('Profile', () => Profile);
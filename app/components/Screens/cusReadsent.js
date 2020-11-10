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
import { grey } from 'ansi-colors';




export default class cusReadsent extends Component  {

    constructor(props) {
      super()
        this.state = {
          currentUserid: firebase.auth().currentUser.uid,
          viewedUserid: "",
          firstName:"",
          lastName:"",
          address: "",
          email: "",
          phoneNumber: "",
          dob: "",
          gender: "", 
          message: "",
          senderfirstName:"",
          senderlastName:"",
          senderID:"",
          subject: "",
          IDsender:"",
          to:"",
   

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

            const { messageid } = this.props.navigation.state.params;

            this.setState({
               messageid:messageid
            })

    // let userId = this.state.currentUserid

          const db = firebase.firestore();

          db.settings({timestampsInSnapshots: true})
 
          let doc = db.collection("messages").doc(messageid);

    
          
          doc.onSnapshot(docSnapshot => {
                          this.setState({
                            senderfirstName: docSnapshot.data().senderfirstName,
                            senderlastName: docSnapshot.data().senderlastName,
                            to:  docSnapshot.data().to,
                            status:  docSnapshot.data().status,
                            message: docSnapshot.data().message,
                            subject: docSnapshot.data().subject,
                            senderID: docSnapshot.data().senderID,
                            IDsender: docSnapshot.data().IDsender,
                            receiverfirstName: docSnapshot.data().receiverfirstName,
                            receiverlastName: docSnapshot.data().receiverlastName,
                        })
                })                    
             
  }


  callphoto  = (valueID) => {
      alert(valueID)
    const starsRef = firebase.storage().ref('usersDp/'+valueID+'.jpg');
    starsRef.getDownloadURL().then(url => {
       this.setState({ dp:url} )
    })
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


          handleReplyMessage = (item) => {
            this.props.navigation.navigate('cusSendMessage', {userrid: item});
          }

        


          handleSetMessageLocalState = (message) => {
            this.setState({
              message,
            });
          }

          handleSetSubjectLocalState = (subject) => {
            this.setState({
              subject,
            });
          }



              render(){

          const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
      style={styles.itemPhoto}
         source={{uri: this.state.dp}}
       />
       </TouchableOpacity>) : 
       (<Text></Text>)
    //    (<Button onPress={ () => this.openPicker() } title={ "Change Picture" }/>) 

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
                                        <Icon style={styles.innerresa} name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                                        <Text style={styles.innerresb} >to: {this.state.receiverfirstName} {this.state.receiverlastName}</Text>
                                        </View>

                                        <TextInput 
                                            style={styles.textSubject}
                                            onChangeText={this.handleSetSubjectLocalState}
                                            placeholder="Subject"
                                            placeholderTextColor={'gray'}
                                            underlineColorAndroid='transparent'
                                            defaultValue={"Subject: "+this.state.subject}
                                            editable={false}
                                            />

                                          
                                        <View style={styles.textAreaContainer}>
                                            <TextInput 
                                            style={styles.textArea}
                                            onChangeText={this.handleSetMessageLocalState}
                                            placeholder="Write message..."
                                            placeholderTextColor={'gray'}
                                            defaultValue={this.state.message}
                                            underlineColorAndroid='transparent'
                                            numberOfLine={7}
                                            multiline={true}
                                            editable={false}
                                            />
                                        </View>
                                </View> 
                      
                      </View>
                     
                     <View style={styles.opholder}>

                      <View style={styles.resconba}>
                      <TouchableOpacity style={styles.btncanclea}
                              onPress={ this.handleReplyMessage.bind(this, this.state.to) }
                           >
                                {/* <Icon style={styles.delete} name={'md-create'} size={28} color={'rgba(0,0,0,0.45)'}/>  */}
                                <Text style={styles.btnText}>Send Message</Text>
                                
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
              marginBottom: 10,
              backgroundColor:  'rgba(0,0,0,0.1)',
              borderBottomColor: "rgba(1,1,1,00000000000000.1)",
            
              width: WIDTH ,
              height: WIDTH * (9/11.8),
   
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
            color: "white"
            },innerres:{
              flexDirection: "row",
              width: 315,
              height:33,
              borderBottomColor: "rgba(1,1,1,00000000000000.1)",
              borderBottomWidth: 3,
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
              width: WIDTH - 100,
              borderRadius: 20,
              marginTop:5
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
            },
            textAreaContainer: {
                marginTop: 2,
                borderColor:'white',
                borderWidth:1,
                padding:5,
                width:315,
                borderRadius: 10,
                backgroundColor:"white",
                marginBottom:30
            }, textArea:{
                color: 'gray',
                height:150,
                justifyContent:"flex-end",
                padding: 10,
                color: "black"
            }, textSubject:{
              borderColor:'white',
              borderWidth:1,
              paddingLeft:17,
              width:315,
              borderRadius: 10,
              backgroundColor:"white",
              marginBottom:7,
              height: 40,
              color: "black"
            }
          });
          AppRegistry.registerComponent('Profile', () => Profile);
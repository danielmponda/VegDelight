import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons'

const {width: WIDTH} = Dimensions.get('window');

import bgImage from './images/background.jpg'

export default class cusMessage extends Component  {

    constructor() {
            super()

            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              inbox: [],
              users: [],
              sent: [],
              value:""
                  }
            }

          


  inbox = () => { 

    this.setState({
      value:"inbox"
    })
    
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      const messages = db.collection("messages").where('to', '==',this.state.currentUserId)
     messages.orderBy("timesent", "desc")
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
          todo.push({
            itemId: doc.id,
            message: doc.data().message,
            senderfirstName: doc.data().senderfirstName,
            senderlastName: doc.data().senderlastName,
            senderID: doc.data().senderID,
            subject: doc.data().subject,
            status: doc.data().status
          });
      });
      this.setState({
        inbox:todo
      })
  }); 
}

contacts = () => { 
  this.setState({
    value:"contacts"
  })
  
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

  // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
  //   (snapshot => {}

  db.collection("users").where('position','==',"manager")
  .onSnapshot(snapshot => {   
    const toddo = []; 
    snapshot.forEach(doc => {
      toddo.push({
        itemId: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        email: doc.data().email,
        address: doc.data().address,
      });
  });
  this.setState({
    users:toddo
  })
}); 
}

sent = () => { 
  this.setState({
    value:"sent"
  })
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

 db.collection("messages").where('senderID', '==',this.state.currentUserId)
  .onSnapshot(snapshot => {   
    const todo = []; 
    snapshot.forEach(doc => {
      todo.push({
        itemId: doc.id,
        message: doc.data().message,
        receiverfirstName: doc.data().receiverfirstName,
        receiverlastName: doc.data().receiverlastName,
        subject: doc.data().subject,
      });
  });
  this.setState({
    sent:todo
  })
});  
}


  
  componentDidMount() {
      this.inbox()
  }

addReorder=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusaddReorder', {itemId: item});
}

sendMessage=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusSendMessage', {userrid: item});
}

viewContact=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusViewContact', {userid: item});
}


cusread=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusreply', {messageid: item});
}

cusReadsent=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusReadsent', {messageid: item});
}


  render(){
        
    var SampleInboxArray = this.state.inbox
    var SampleUsersArray = this.state.users
    var SampleSentArray = this.state.sent

    const dpr = (this.state.value=="inbox") ? 
      <View>
    { SampleInboxArray.map((item, key)=> (

      <View  key={key} style={[ (item.status=='false') ? styles.unreadmes : styles.readmes]}>

          
        <View  style={styles.rescona}>
<TouchableOpacity 
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.cusread.bind(this, item.itemId) }
                          >
        <View  style={styles.sectiontwob }>
                <Text numberOfLines={1} style={styles.headText}>{ item.senderfirstName } { item.senderlastName } </Text>
                <Text numberOfLines={1} style={styles.sectiontext}>{ item.subject } </Text>
                <Text numberOfLines={1} style={styles.sectionmessage}>{ item.message } </Text>
            </View>
  </TouchableOpacity>  
          </View>
        

       <View style={styles.resconb}>

                <View style={styles.resconbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.sendMessage.bind(this, item.senderID) }
                            >
                                <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View>
      </View> 

  </View> 
  )
)}
</View>
    
: (this.state.value=="contacts") ? 
      <View>
    { SampleUsersArray.map((item, key)=> (

      <View  key={key} style={styles.sectiontwo}>

        <View style={styles.rescona}>
        <TouchableOpacity onPress={ this.viewContact.bind(this, item.itemId) }>
        <View style={styles.sectiontwob}>
                <Text numberOfLines={1} style={styles.headText}>{ item.firstName } { item.lastName } { item.senderlastName } </Text>
                <Text numberOfLines={1} style={styles.sectiontext}>{ item.email } </Text>
                <Text numberOfLines={1} style={styles.sectionmessage}>{ item.address } </Text>
            </View>
  </TouchableOpacity> 
          </View>


       <View style={styles.resconb}>

                <View style={styles.resconbab}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.viewContact.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-open'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View>
            
                <View style={styles.resconbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.sendMessage.bind(this, item.itemId) }
                            >
                                <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View>
 </View> 
  </View> 
  )
)}
</View>

: 
      <View>
    { SampleSentArray.map((item, key)=> (

      <View  key={key} style={styles.sectiontwo}>

<View style={styles.rescona}>
<TouchableOpacity 
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.cusReadsent.bind(this, item.itemId) }
                          >
        <View style={[styles.sectiontwob,styles.changewe]}>
                <Text numberOfLines={1} style={styles.headText}>{ item.receiverfirstName } { item.receiverlastName } </Text>
                <Text numberOfLines={1} style={styles.sectiontext}>{ item.subject } </Text>
                <Text numberOfLines={1} style={styles.sectionmessage}>{ item.message } </Text>
            </View>
  </TouchableOpacity>  
          </View>


       <View style={styles.resconb}>

                <View style={styles.resconbabbbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.cusReadsent.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-open'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View>
{/*             
                <View style={styles.resconbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.sendMessage.bind(this, item.itemId) }
                            >
                                <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View> */}
 </View> 
  </View> 
  )
)}
</View>



    return ( 
      <ImageBackground source={bgImage} style={styles.ImageBackgroundCon}>
               <ScrollView>
      
      <StatusBar 
      backgroundColor='#b3a7a9'
      barStyle="light-content"
      />

      
<View style={styles.container}>
        

<View style={styles.swichtab}>

            <View style={styles.swichtabaa}>
                    <TouchableOpacity style={styles.btnLogin}
                    onPress={this.inbox.bind(this, "")}>
                        <Icon style={styles.inbox} name={'md-mail'} size={28} color={'rgba(0,0,0,0.45)'}/>
                      {/* <Text style={styles.btnText}> Inbox </Text> */}
                      <Text style={[styles.tabtext,styles.tabtextinbox]}>Inbox</Text>
                  </TouchableOpacity> 
              </View>

          <View style={styles.swichtaba}>
                <TouchableOpacity style={styles.btnLogin}
                onPress={ this.contacts.bind(this, "") }
                 >
                    <Icon style={styles.inbox} name={'md-contacts'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Conts</Text> */}
                  <Text style={styles.tabtext}>Contacts</Text>
              </TouchableOpacity> 
              </View>

              
          <View style={styles.swichtabb}>
                <TouchableOpacity style={styles.btnLogin}
                     onPress={ this.sent.bind(this, "") }
                  >
                     <Icon style={styles.inbox} name={'md-paper-plane'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Sent</Text> */}
                  <Text style={[styles.tabtext,styles.tabtextsent]}>Sent</Text>
             </TouchableOpacity> 
              </View>

{/*               
          <View style={styles.swichtabc}>
                <TouchableOpacity style={styles.btnLogin}
                     onPress={ this.menu.bind(this, "") }
                  >
                  <Text style={styles.btnText}> JRJR</Text>
              </TouchableOpacity> 
              </View> */}
      </View>

            
             {dpr}

           
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
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'pink'
  },btnLogin:{
    // marginHorizontal: 20,
    justifyContent: 'center',
    // marginBottom: 15
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  }, swichtab:{
    flexDirection: "row",
    marginTop: 10,
    height:53
  },  swichtabaa :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.3)",
    borderBottomWidth: 7,
    width: 140,
    height: 53,
  }, swichtaba :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.5)",
    borderBottomWidth: 7,
    width: 140,
    height: 53,
  }, swichtabb :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.3)",
    borderBottomWidth: 7,
    width: 140,
    height: 53,
  }, swichtabc :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.5)",
    borderBottomWidth: 7,
    width: 140,
    height: 53,
  }, rescona : {
    flex: 8,
  },
  resconb: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 10
  },resconba: {
    flex: 3,
  },resconbb: {
    flex: 2,
  },resconbab: {
    flex: 1,
    marginLeft: -35
  },resconbbb: {
    flex: 1,
    marginLeft: 20
  }, resconbabbbbb:{
    flex: 1,
    marginLeft: 2
  }
  ,btncanclea :{
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor:  'rgba(0,0,0,0.3)',
    justifyContent: 'center'
  }, delete:{
    justifyContent: "center",
    color: 'rgba(0,0,0,0.5)',
    marginLeft: 12
  }, edit:{
    marginLeft: 11,
    color: 'rgba(1,9,4,0.5)',
  },sectiontwo:{
    marginBottom: 1,
    // backgroundColor: "rgba(233, 233, 233, 0.5)",
    // width: WIDTH - 40,
    width: WIDTH,
    height: 80,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:  'rgba(0,0,0,0.1)',
    borderBottomColor: "rgba(1,1,1,00000000000000.1)",
     borderBottomWidth: 1,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    padding: 10
  },headText:{
    fontSize: 15,
    fontWeight: "bold"
  },inbox:{
    marginLeft: 40,
    fontSize: 32,
  }, sectiontext :{
    width: 180
  }, sectionmessage:{
    width: 270
  }, changewe:{
    width: 250
  },tabtext :{
    alignContent:"center",
    marginLeft:23,
    color: "rgba(0,0,0,0.7)",
    marginBottom:20,
    fontWeight:"bold"
  },tabtextinbox : {
    marginLeft:36,
    marginBottom:20
  },tabtextsent : {
    marginLeft:38,
    marginBottom:20
  },unreadmes:{
    marginBottom: 1,
    // backgroundColor: "rgba(233, 233, 233, 0.5)",
    // width: WIDTH - 40,
    width: WIDTH,
    height: 80,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:  'rgba(0,0,0,0.3)',
    borderBottomColor: "rgba(1,1,1,00000000000000.1)",
     borderBottomWidth: 1,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    padding: 10
  },readmes:{
    marginBottom: 1,
    // backgroundColor: "rgba(233, 233, 233, 0.5)",
    // width: WIDTH - 40,
    width: WIDTH,
    height: 80,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:  'rgba(0,0,0,0.1)',
    borderBottomColor: "rgba(1,1,1,00000000000000.1)",
     borderBottomWidth: 1,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    padding: 10
  }
});

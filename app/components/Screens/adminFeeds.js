import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  ScrollView,
  Button,
  Alert
} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
import bgImage from './images/background.jpg'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'


export default class adminFeed extends Component  {

    constructor(props) {
            super(props)
            
            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              reservation: [],
              Cancelledres: [],
              currentid:"",
              value:"",
           
            }
    }


    
approvedRes=(item)=>{
  const db = firebase.firestore();
  Alert.alert(
    '',
    'Are you sure you want to Approve',
    [
      {text: 'yes',onPress: () =>  db.collection('reservation').doc(item).update({status:'Approved'}) ,style: 'cancel',},
      {text: 'no', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

deniedRes=(item)=>{
  const db = firebase.firestore();
  Alert.alert(
    '',
    'Are you sure you want to Deny ',
    [
      {text: 'yes',onPress: () =>  db.collection('reservation').doc(item).update({status:'Denied'}) ,style: 'cancel',},
      {text: 'no', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

    
reservation = () => { 
        this.setState({
        value:"reservation"
      })
 
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
      //   (snapshot => {} .orderBy("date").orderByChild('timestamp')
      let resorder = db.collection("reservation")
      resorder.orderBy("date")
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
          const realdatee = doc.data().date.toDate()
          const realtimee = doc.data().time.toDate()
          todo.push({
            resid: doc.id, 
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            bookedby: doc.data().currentUserId,
            date: moment(realdatee).format("DD-MM-YYYY"),
            time: moment(realtimee).format("LT"),
            numberofattendees: doc.data().numberofattendees,
            comments: doc.data().comments,
            status: doc.data().status,
            reorderedItems: doc.data().reorderedItems
          });
      });
      this.setState({
        reservation:todo
      })
  }); 
    
}
    
Cancelledres = () => { 
  this.setState({
    value:"Cancelledres"
  })

  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

  db.collection("Cancelledres").where('status', '==',"Approved")
  .onSnapshot(snapshot => {   
    const todo = []; 
    snapshot.forEach(doc => {
      todo.push({
        cancelid: doc.id,
        date: doc.data().date,
        time: doc.data().time,
        numberofattendees: doc.data().numberofattendees,
        comments: doc.data().comments,
        status: doc.data().status,
        reorderedItems: doc.data().reorderedItems,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
      });
  });
  this.setState({
    Cancelledres:todo
  })
}); 


}

    
    

    componentDidMount() {
      this.reservation()

}

takefunction(message){
    alert(message)
}


updateRes=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('adminupdateResInfo', {resid: item});
}
           
cancleRes=(resid,datee,time,numberofattendees,comments,status,reorderedItems,user)=>{
  const db = firebase.firestore();
  Alert.alert(
    '',
    'Are you sure you want to cancle',
    [
      {text: 'yes',onPress: () =>  {

        db.collection('Cancelledres').doc().set({
          orderID: resid,
          date: datee,
          time: time,
          numberofattendees: numberofattendees,
          status: status,
          comments: comments,
          reorderedItems: reorderedItems,
          userCancelled: user,
        });

        if(reorderedItems){
          const db = firebase.firestore();

          db.settings({timestampsInSnapshots: true})
          
          let doc = db.collection("reOrder").doc(reorderedItems)
          let getDoc = doc.get()
          .then(doc => {
            let docsed = db.collection('CancelledreOrder').doc().set({
              orderID: doc.id,
              orders: doc.data().orders,
              total: doc.data().total,
              userCancelled: doc.data().orderby,
            })
            if(docsed){
              db.collection('reOrder').doc(reorderedItems).delete() }
          })   
        }
      db.collection('reservation').doc(resid).delete() 
      }
      ,style: 'cancel',},
      {text: 'no', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );


  // 
  // 
  // Alert.alert("Reservation Sucessfuly Cancalled")
}


  render(){
    var SamplereservationArray = this.state.reservation
    var SampleCancelledresArray = this.state.Cancelledres

    const dpr = (this.state.value=="reservation") ? 
    <View>
    { SamplereservationArray.map((item, key)=> (

      <View key={key} style={styles.rescon}>
 
         <View style={styles.rescona}>
         <View style={styles.holder}>

         <View style={styles.innerres}>
           <Icon style={styles.innerresa} name={'md-information-circle'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb} >{ item.resid } </Text>
           </View>

           <View style={styles.innerres}>
           <Icon style={styles.innerresa} name={'md-list-box'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb}>{ item.firstName} { item.lastName} </Text>
           </View>

      
           

           <View style={styles.innerres}>
           <Icon style={styles.innerresa} name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb} >{ item.date } </Text>
           </View>

                 
           <View style={styles.innerres}>
           <Icon style={styles.innerresa} name={'md-time'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb} >{ item.time } </Text>
           </View>

           <View style={styles.innerres}>
           <Icon style={styles.innerresa} name={'md-people'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb} >{ item.numberofattendees } </Text>
           </View>

           <View style={styles.innerres}>
           <Icon style={styles.innerresa} name={'md-list-box'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb}>{ item.reorderedItems} </Text>
           </View>

          
          
           <View style={styles.innerres}>
           <Icon style={[ (item.status=='Approved') ? styles.resconapproved : (item.status=='Denied') ? styles.rescondenied : styles.innerresa ]} name={'md-checkbox-outline'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb} >    {item.status} </Text>
           </View>
           </View>  
            </View>  

                 <View style={styles.resconb}>

        <View style={styles.resconba}>
            <TouchableOpacity style={styles.btncanclea}
                   onPress={ this.approvedRes.bind(this,item.resid) }
>
                     <Icon style={styles.delete} name={'md-thumbs-up'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                   
                </TouchableOpacity>    
        </View>
    
        <View style={styles.resconbb}>
            <TouchableOpacity style={styles.btncanclea}
                     onPress={ this.deniedRes.bind(this, item.resid) }>
                        <Icon style={styles.edit} name={'md-thumbs-down'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                </TouchableOpacity>    
        </View>

     </View> 
      </View> 
      )
 )}
 

</View>

: 
    <View>
  { SampleCancelledresArray.map((item, key)=> (

<View key={key} style={styles.rescon}>

   <View style={styles.rescona}>
   <View style={styles.holder}>

   <View style={styles.innerres}>
     <Icon style={styles.innerresa} name={'md-information-circle'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb} >{ item.cancelid } </Text>
     </View>

     
     <View style={styles.innerres}>
     <Icon style={styles.innerresa} name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb} >{ item.firstName } { item.lastName }</Text>
     </View>

     <View style={styles.innerres}>
     <Icon style={styles.innerresa} name={'md-calendar'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb} >{ item.date } </Text>
     </View>

           
     <View style={styles.innerres}>
     <Icon style={styles.innerresa} name={'md-time'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb} >{ item.time } </Text>
     </View>

     <View style={styles.innerres}>
     <Icon style={styles.innerresa} name={'md-people'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb} >{ item.numberofattendees } </Text>
     </View>

     <View style={styles.innerres}>
     <Icon style={styles.innerresa} name={'md-list-box'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb}>{ item.reorderedItems} </Text>
     </View>
    
     <View style={styles.innerres}>
     <Icon style={[ (item.status=='Approved') ? styles.resconapproved : (item.status=='Denied') ? styles.rescondenied : styles.innerresa ]} name={'md-checkbox-outline'} size={28} color={'rgba(0,0,0,0.45)'}/> 
     <Text style={styles.innerresb} > { item.status } </Text>
     </View>
     </View>  
      </View>  

           {/* <View style={styles.resconb}>

  <View style={styles.resconba}>
      <TouchableOpacity style={styles.btncanclea}
             onPress={ this.cancleRes.bind(this, item.resid,item.date,item.time,item.numberofattendees,item.comments,item.status,item.reorderedItems,this.state.currentUserId) }
>
               <Icon style={styles.delete} name={'md-trash'} size={23} color={'rgba(0,0,0,0.45)'}/> 
             
          </TouchableOpacity>    
  </View>

  <View style={styles.resconbb}>
      <TouchableOpacity style={styles.btncanclea}
               onPress={ this.updateRes.bind(this, item.resid) }>
                  <Icon style={styles.edit} name={'md-create'} size={23} color={'rgba(0,0,0,0.45)'}/> 
          </TouchableOpacity>    
  </View>

</View>  */}
</View> 
)
)}
</View>

  

     
   
    return ( 
      <ImageBackground source={bgImage} style={styles.ImageBackgroundCon}>
        
 {/* <View>
                <TouchableOpacity style={styles.btnLoginn}
                  onPress={() => this.props.navigation.navigate('adminDetail')}
                  >
                  <Text style={styles.btnText}>Add Reservation</Text>
              </TouchableOpacity> 
              </View>  */}





        <ScrollView>

        <View style={styles.container}>
            <StatusBar backgroundColor='#b3a7a9' barStyle="light-content"/>
              {dpr}
            </View>
            </ScrollView>
            
        <View style={styles.swichtab}>

<View style={styles.swichtabaa}>
        <TouchableOpacity style={styles.btnLogin}
        onPress={this.reservation.bind(this, "")}
        >
            {/* <Icon style={styles.inbox} name={'logo-buffer'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
          {/* <Text style={styles.btnText}> Inbox </Text> */}
          <Text style={[styles.tabtext,styles.tabtextinbox]}>Booked Reservation</Text>
      </TouchableOpacity> 
  </View>


  
<View style={styles.swichtaba}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.Cancelledres.bind(this, "") }
      >
         {/* <Icon style={styles.inbox} name={'md-backspace'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
      {/* <Text style={styles.btnText}> Sent</Text> */}
      <Text style={[styles.tabtext,styles.tabtextcancelled]}>Cancelled</Text>
  </TouchableOpacity> 
  </View>


</View>

      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  ImageBackgroundCon: {
    flex: 4,
    justifyContent: 'center',
    width: null,
    height: null,
  }, container:{
    alignItems: "center",
  },
  btnLogin:{
  // backgroundColor: '#561a1a',
  // marginHorizontal: 20,
  justifyContent: 'center',
  // marginBottom: 15
},
btnText: {
  fontSize: 18,
  textAlign: 'center',
  color: 'white'
}, 
 rescon:{
  marginTop: 3,

    // backgroundColor: "rgba(233, 233, 233, 0.5)",
    // width: WIDTH - 40,
    width: WIDTH,
    height: WIDTH * (9/14),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:  'rgba(0,0,0,0.1)',
    borderBottomColor: "rgba(1,1,1,00000000000000.1)",
    borderBottomWidth: 1,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    padding: 1
}, 
resconapproved:{
 color:"green"
}, 
rescondenied:{
  color:"red"
}, 
rescona:{
  flex: 4,
  paddingLeft:10,
  width:200
}, resconb: {
  flex: 1,
  flexDirection: 'column',
  height: 110,
  marginLeft: -80,
  marginTop:45
}, btncanclea :{
  width: 40,
  height: 40,
  borderRadius: 100,
  backgroundColor:  'rgba(0,0,0,0.3)',
  justifyContent: 'center'
}, btncancleb :{
  width: 40,
  height: 40,
  borderRadius: 100,
  backgroundColor: 'rgba(13, 124, 3, 0.911)',
  justifyContent: 'center'
},
btncanText: {
  fontSize:15,
  color: 'white',
  textAlign: 'center',
}, 
resconba: {
  flex: 1,
  marginTop: 13
},resconbb: {
  flex: 1,
  marginBottom: 10
},innerres:{
  flexDirection: "row",
  width: 240,
  height:30,
  borderBottomColor: "rgba(1,1,1,00000000000000.1)",
  borderBottomWidth: 1,
  
},innerresa:{
  flex: 1,
  width: 30,
  marginBottom: -10,
  color: "#1a1a1a"
},innerresb:{
  flex: 6,
  width: 100,
  marginTop:4
}, delete:{
  justifyContent: "center",
  color: 'rgba(0,0,0,0.5)',
  marginLeft: 12
}, edit:{
  marginLeft: 12,
  color: 'rgba(1,9,4,0.5)',
}, holder:{
  marginLeft: 15,
  marginTop: 6,
  width:200
}, swichtab:{
  flexDirection: "row",
  marginTop: 0,
  height:40,
  backgroundColor:'rgba(0,0,0,0)'
},  swichtabaa :{
  flex: 1,
  width: 140,
  height: 59,
  backgroundColor: "rgba(1,1,1,00000000000000.3)",
  borderRadius: 30,
  marginTop: 6,
}, swichtaba :{
  flex: 1,
  width: 140,
  height: 59,
  backgroundColor: "rgba(1,1,1,00000000000000.5)",
  borderRadius: 30,
  marginTop: 6
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
},inbox:{
  marginLeft: 70,
  fontSize: 32,
},tabtext :{
  alignContent:"center",
  marginLeft:23,
  color: "rgba(0,0,0,0.7)",
  fontWeight:"bold",
  marginTop:11
}, tabtextcancelled :{
  marginLeft:53,
}, btnLoginn:{
  backgroundColor: '#561a1a',
  justifyContent: 'center',
  width: WIDTH,
  height: WIDTH * (9/65),
}
});

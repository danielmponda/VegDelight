// Importing Libraries 
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
  Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const {width: WIDTH} = Dimensions.get('window');

// Importing Images 
import bgImage from './images/background.jpg'

// Initializing a class
export default class cusCart extends Component  {

      // Initializing Constructor
    constructor() {
            super()

            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              tempcart: [],
              reOrder: [],
              CancelledreOrder: [],


              value:"",
              total:"",
              FOODID:[]
                  }
            }

          


  tempcart = () => { 

    this.setState({
      value:"tempcart"
    })
   
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

     db.collection("tempcart").where('senderID', '==',this.state.currentUserId)
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
          todo.push({
            itemId: doc.id,
            fooditemId: doc.data().itemId,
            itemName: doc.data().itemName,
            itemDescription: doc.data().itemDescription,
            itemPrice: doc.data().itemPrice        
          });
      });
      this.setState({
        tempcart:todo
      })
    
      if(this.state.tempcart==""){
        this.setState({
          total:"Empty Cart"
        })
    }else {
      this.setState({
        total:this.state.tempcart.map(item=>item.itemPrice).reduce((prev,next) => prev+next)
      })
      this.setState({
        FOODID:this.state.tempcart.map(item=>item.itemName).reduce((prev,next) => prev+" " + "," +next)
      })
    }
      
  }); 


}

reOrder = () => { 
 
  this.setState({
    value:"reOrder"
  })

 
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true})

   db.collection("reOrder").where('orderby', '==',this.state.currentUserId)
    .onSnapshot(snapshot => {   
      const todo = []; 
      snapshot.forEach(doc => {
        const realdatee = doc.data().date.toDate()
        const realtimee = doc.data().time.toDate()
        todo.push({
          itemId: doc.id,
          orders: doc.data().orders,
          total: doc.data().total,      
          date: moment(realdatee).format("DD-MM-YYYY"),
          time: moment(realtimee).format("LT"), 
        });
    });
    this.setState({
      reOrder:todo
    })
    
  })

}

CancelledreOrder = () => { 
  this.setState({
    value:"CancelledreOrder"
  })
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

  // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
  //   (snapshot => {}

  db.collection("CancelledreOrder").where('userCancelled', '==',this.state.currentUserId)
  .onSnapshot(snapshot => {   
    const todo = []; 
    snapshot.forEach(doc => {
      todo.push({
        itemId: doc.id,
        orders: doc.data().orders,
        total: doc.data().total, 
        orderID: doc.data().orderID,     
      });
  });
  this.setState({
    CancelledreOrder:todo
  })
  
})
}


  
  componentDidMount() {
      this.tempcart()
  }

addReorder=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusaddReorder', {itemId: item});
}

sendRes=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusDetail', {itemId: item});
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



removeItem=(item)=>{
  const db = firebase.firestore();
  Alert.alert(
    '',
    'Remove Item',
    [
      {text: 'yes',onPress: () => db.collection('tempcart').doc(item).delete() ,style: 'cancel',},
      {text: 'no', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

orderCancle=(itemid,orders,total,user)=>{
  const db = firebase.firestore();
  Alert.alert(
    '',
    'Cancle Item',
    [
      {text: 'yes',onPress: () => {
      
      db.collection('CancelledreOrder').doc().set({
        orderID: itemid,
        orders: orders,
        total: total,
        userCancelled: user,
      });

      db.collection('reOrder').doc(itemid).delete() },style: 'cancel',},
      {text: 'no', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}





reorder=(orders,total,uid)=>{
    this.props.navigation.navigate('cusDetail', {itemId: uid,orders: orders,total: total,});
  
}


  render(){
        
    var SampletempcartArray = this.state.tempcart
    var SamplereOrderArray = this.state.reOrder
    var SampleCancelledreOrderArray = this.state.CancelledreOrder

    const dpr = (this.state.value=="tempcart") ? 
      <View>

    { 
      SampletempcartArray.map((item, key)=> (

      <View  key={key} style={styles.sectiontwo}>

          
        <View style={styles.rescona}>

          
          <View style={styles.sectiontwob}>
                  <Text numberOfLines={1} style={styles.headText}>{ item.itemName } { item.senderlastName } </Text>
                  <Text numberOfLines={1} style={styles.sectiontext}> {item.itemDescription}</Text>
                  <Text numberOfLines={1} style={styles.sectionmessage}>{ item.itemPrice } </Text>
              </View>
        
          </View>
        

       <View style={styles.resconb}>

                <View style={styles.resconbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.removeItem.bind(this, item.itemId) }
                            >
                                <Icon style={styles.edit} name={'md-close'} size={23} color={'red'}/> 
                        </TouchableOpacity>    
                </View>
      </View> 
  </View> 
  )


)}  
<View style={styles.sectiontwoo}>

    <Text style={styles.sectionttwototal}> total: k {this.state.total} </Text>
  </View>
  <View>
                <TouchableOpacity style={styles.btnLogingg}
                   onPress={ this.reorder.bind(this,this.state.FOODID,this.state.total,this.state.currentUserId) }
                  >
                  <Text style={styles.btnText}>REORDER</Text>
              </TouchableOpacity> 
              </View>
</View>
    
: (this.state.value=="reOrder") ? 
      <View>
    { SamplereOrderArray.map((item, key)=> (

      <View  key={key} style={styles.oderhistory}>

        <View style={[styles.rescona,styles.resconawid]}>

            <View style={styles.sectiontwob}>
            <Text style={styles.sectiontextid}>orderID: { item.itemId } </Text>

            <Text style={styles.sectionorders}>Date: { item.date } </Text>
            <Text style={styles.sectionorders}>Time: { item.time } </Text> 
            <Text style={styles.sectiontexttotal}>..............................................................</Text>
            <Text style={styles.sectionorders}>{ item.orders } </Text>
            <Text style={styles.sectiontexttotal}>..............................................................</Text>
            <Text style={styles.sectiontexttotal}>Cost: { item.total } </Text>
            <Text style={styles.sectiontexttotal}>..............................................................</Text>
           
            </View>

          </View>

{/* 
       <View style={styles.resconb}>

                <View style={styles.resconbab}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.sendRes.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-calendar'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View>
            
                <View style={styles.resconbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.orderCancle.bind(this, item.itemId,item.orders,item.total,this.state.currentUserId) }
                            >
                                <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View>
 </View>  */}
  </View> 
  )
)}
</View>

: 
      <View>
    { SampleCancelledreOrderArray.map((item, key)=> (

      <View  key={key} style={styles.sectiontwocan}>

                <View style={[styles.rescona,styles.resconawidd]}>

                <View style={styles.sectiontwob}>
               
                <Text style={styles.sectiontextid}>orderID: { item.orderID } </Text>
                <Text style={styles.sectionorders}>{ item.orders } </Text>
                <Text style={styles.sectionordersf}> </Text>
                    <Text style={styles.sectiontexttotal}>Total:{ item.total } </Text>
                </View>

                </View>


       {/* <View style={styles.resconb}>

                <View style={styles.resconbab}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.addReorder.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-open'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View>
            
                <View style={styles.resconbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            // onPress={ this.updateRes.bind(this, item.itemId) }
                            >
                                <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View>
 </View>  */}
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
                    onPress={this.tempcart.bind(this, "")}>
                        <Icon style={styles.inbox} name={'md-cart'} size={28} color={'rgba(0,0,0,0.45)'}/>
                      {/* <Text style={styles.btnText}> Inbox </Text> */}
                      <Text style={[styles.tabtext,styles.tabtextinbox]}>myCart</Text>
                  </TouchableOpacity> 
              </View>

          <View style={styles.swichtaba}>
                <TouchableOpacity style={styles.btnLogin}
                onPress={ this.reOrder.bind(this, "") }
                 >
                    <Icon style={styles.inbox} name={'md-filing'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Conts</Text> */}
                  <Text style={[styles.tabtext,styles.tabtextsent]}>Orders</Text>
              </TouchableOpacity> 
              </View>

              
          <View style={styles.swichtabb}>
                <TouchableOpacity style={styles.btnLogin}
                     onPress={ this.CancelledreOrder.bind(this, "") }
                  >
                     <Icon style={styles.inbox} name={'md-backspace'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Sent</Text> */}
                  <Text style={styles.tabtext}>Cancelled</Text>
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
  },btncanclea :{
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
    marginLeft: 14,
    color: 'darkred',
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
  },
  btnLogingg:{
  width: WIDTH-70,
  height: 45,
  backgroundColor: '#561a1a',
  // marginHorizontal: 20,
  justifyContent: 'center',
  marginLeft: 33,
  borderRadius: 20,
  marginTop: 10
}, sectionorders:{
  width: 250
}, sectiontextid : {
  fontWeight: "bold",
  marginBottom: 2
},oderhistory:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
  height: 220,
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
}, sectiontexttotal :{
  color:"white",
  fontWeight: "bold",
},resconbab: {
  flex: 1,
  marginLeft: -1
},resconbbb: {
  flex: 1,
  marginLeft: 20
}, rescona:{
  width: 250
},tabtext :{
  alignContent:"center",
  marginLeft:23,
  color: "rgba(0,0,0,0.7)",
  marginBottom:20,
  fontWeight:"bold"
},tabtextinbox : {
  marginLeft:32,
  marginBottom:20
},tabtextsent : {
  marginLeft:32,
  marginBottom:20
},sectiontwocan:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
  height: 130,
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
}, sectionordersf:{
  height:3
},sectiontwoo:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
  height: 50,
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'space-between',
  backgroundColor:  'rgba(0,0,0,0.1)',
  borderBottomColor: "rgba(1,1,1,00000000000000.1)",
  borderTopColor: "rgba(1,1,1,00000000000000.1)",
   borderBottomWidth: 1,
  //  borderTopWidth: 7,
  // borderBottomLeftRadius: 15,
  // borderBottomRightRadius: 15,
  // borderTopLeftRadius: 15,
  // borderTopRightRadius: 15,
  padding: 10
},sectionttwototal:{
  color:'rgba(0,0,0,0.6)',
  fontSize:16,
}
});

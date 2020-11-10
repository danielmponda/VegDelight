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

// Importing Images 
import bgImage from './images/background.jpg'


const {width: WIDTH} = Dimensions.get('window');

// Initializing a class
export default class chefCart extends Component  {

      // Initializing Constructor
    constructor() {
            super()

            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              preparedItems: [],
              requestedItems: [],
              reservation: [],
              CancelledreOrder: [],

              value:"",
              total:"",
              FOODID:[],
              orders:"",
                  }
            }



            preparedItems = () => { 

              this.setState({
                value:"preparedItems"
              })
             
                const db = firebase.firestore();
                db.settings({timestampsInSnapshots: true})
                
               db.collection("preparedItems").orderBy("Preparedtime", "desc")
                .onSnapshot(snapshot => {   
                  const todo = []; 
                  snapshot.forEach(doc => {
                    const realtimee = doc.data().Preparedtime.toDate()
                    todo.push({
                      itemId: doc.data().resId,
                      time:moment(realtimee).format("LT"),
                      tablenumber: doc.data().tableNumber,
                      status: doc.data().status,
                      orders: doc.data().orders,
                      total: doc.data().total        
                    });
                });
                this.setState({
                  preparedItems:todo
                })
                
            }); 
          
          
          }
          
          


          requestedItems = () => { 

    this.setState({
      value:"requestedItems"
    })
   
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

     db.collection("requestedItems").orderBy("timeorded")
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
          const realtimee = doc.data().timeorded.toDate()
          todo.push({
            itemId: doc.id,
            time:moment(realtimee).format("LT"),
            timestamps:doc.data().timeorded,
            tablenumber: doc.data().tableNumber,
            status: doc.data().status,
            orders: doc.data().orders,
            total: doc.data().total        
          });
      });
      this.setState({
        requestedItems:todo
      })
    
      if(this.state.requestedItems==""){
        this.setState({
          total:"Empty Cart"
        })
    }else {
      this.setState({
        total:this.state.requestedItems.map(item=>item.itemPrice).reduce((prev,next) => prev+next)
      })
      this.setState({
        FOODID:this.state.requestedItems.map(item=>item.itemName).reduce((prev,next) => prev+" " + "," +next)
      })
    }
      
  }); 


}

reservation = () => { 
 
  this.setState({
    value:"reservation"
  })
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true})

    let resorder = db.collection("reservation").where('status', '==',"Approved")
    resorder.orderBy("date")
    resorder.onSnapshot(snapshot => {  
      const todo = [];  
           // function 
      snapshot.forEach(doc => {
        const realdatee = doc.data().date.toDate()
        const realtimee = doc.data().time.toDate()
        if(doc.data().reorderedItems){          
          todo.push({
            resId: doc.id,
            date: moment(realdatee).format("DD-MM-YYYY"),
            time:moment(realtimee).format("LT"),
   
            reorderedItems: doc.data().reorderedItems,
            orders:doc.data().orders,
           
          });   
        
      }
    });
    this.setState({
      reservation:todo
    })
}); 
}

CancelledreOrder = () => { 
  this.setState({
    value:"CancelledreOrder"
  })
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

  // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
  //   (snapshot => {}

  db.collection("CancelledreOrder")
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
      this.requestedItems()
  }



doneItem=(itemId,time,tablenumber,status,orders,total,timestamps)=>{
 
  Alert.alert(
    '',
    'Item Prepared',
    [
      {text: 'yes', onPress: () =>  {
        
        const db = firebase.firestore();
        const preparedItems = db.collection("preparedItems").doc()
        const Preparedtime = new Date()
        preparedItems.set({
            resId: itemId,
            timeordered: timestamps,
            tableNumber: tablenumber,
            status:  status,
            orders: orders,
            total: total,
            Preparedtime: Preparedtime
            
        });

        if (preparedItems) {
          db.collection('requestedItems').doc(itemId).delete()
        }  
    }
      
    , style: 'cancel',},
      {text: 'no', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}



  render(){
        
    var SamplerequestedItemsArray = this.state.requestedItems
    var SamplereservationArray = this.state.reservation
    var SampleCancelledreOrderArray = this.state.CancelledreOrder
    var SamplepreparedItemsArray = this.state.preparedItems

    const dpr = (this.state.value=="requestedItems") ? 
      <View>

    { 
      SamplerequestedItemsArray.map((item, key)=> (


      <View  key={key} style={styles.oderhistoryres}>

        <View style={[styles.rescona,styles.resconawid]}>
            <View style={styles.sectiontwob}>
            <Text style={styles.sectiontextid}>resID: { item.itemId } </Text>
            <Text style={styles.sectionorders}>Time: { item.time } </Text>
            <Text style={styles.sectionorders}>tableNumber: { item.tablenumber } </Text> 
            <Text style={styles.sectionorders}>Status: { item.status } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>{ item.orders } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>{ item.total } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            </View>
          </View>
                

       <View style={styles.resconb}>

                <View style={styles.resconbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.doneItem.bind(this, item.itemId, item.time,item.tablenumber,item.status, item.orders,item.total,item.timestamps) }
                            >
                                <Icon style={styles.editchef} name={'md-checkmark'} size={30} color={'green'}/> 
                        </TouchableOpacity>    
                </View>
      </View> 
  </View> 
  )


)}  

</View>
: (this.state.value=="preparedItems") ?
<View>
{ 
      SamplepreparedItemsArray.map((item, key)=> (


      <View  key={key} style={styles.oderhistoryres}>

        <View style={[styles.rescona,styles.resconawid]}>
            <View style={styles.sectiontwob}>
            <Text style={styles.sectiontextid}>resID: { item.itemId } </Text>
            <Text style={styles.sectionorders}>Time: { item.time } </Text>
            <Text style={styles.sectionorders}>tableNumber: { item.tablenumber } </Text> 
            <Text style={styles.sectionorders}>Status: { item.status } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>{ item.orders } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>{ item.total } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            </View>
          </View>
                

       <View style={styles.resconb}>

                <View style={styles.resconbb}>
                    <TouchableOpacity style={styles.btncanclea}
                           
                            >
                                <Icon style={styles.editchef} name={'md-done-all'} size={30} color={'green'}/> 
                        </TouchableOpacity>    
                </View>
      </View> 
  </View> 
  )


)}  

</View>
: (this.state.value=="reservation") ? 
      <View>
    { SamplereservationArray.map((item, key)=> (

      <View  key={key} style={styles.oderhistory}>

        <View style={[styles.rescona,styles.resconawid]}>
            <View style={styles.sectiontwob}>
            <Text style={styles.sectiontextid}>resID: { item.resId } </Text>
            <Text style={styles.sectionorders}>Date: { item.date } </Text>
            <Text style={styles.sectionorders}>Time: { item.time } </Text> 
            <Text style={styles.sectionorders}>orderID: { item.reorderedItems } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>{ item.orders } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            </View>
          </View>


       <View style={styles.resconb}>

                {/* <View style={styles.resconbab}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.sendRes.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-calendar'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View> */}
            
                {/* <View style={styles.resconbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            onPress={ this.orderCancle.bind(this, item.itemId,item.orders,item.total,this.state.currentUserId) }
                            >
                                <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                        </TouchableOpacity>    
                </View> */}
 </View> 
  </View> 
  )
)}
</View>

: 
      <View>
    { SampleCancelledreOrderArray.map((item, key)=> (

      <View  key={key} style={styles.sectiontwo}>

                <View style={[styles.rescona,styles.resconawidd]}>

                <View style={styles.sectiontwob}>
               
                <Text style={styles.sectiontextid}>orderID: { item.orderID } </Text>
                <Text style={styles.sectionorders}>{ item.orders } </Text>
                    <Text style={styles.sectiontexttotal}>Total:{ item.total } </Text>
                </View>

                </View>


       <View style={styles.resconb}>

                {/* <View style={styles.resconbab}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.addReorder.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-open'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View> */}
            
                {/* <View style={styles.resconbbb}>
                    <TouchableOpacity style={styles.btncanclea}
                            // onPress={ this.updateRes.bind(this, item.itemId) }
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

  
<View style={styles.swichtaba}>
                <TouchableOpacity style={styles.btnLogin}
                onPress={ this.preparedItems.bind(this, "") }
                 >
                    <Icon style={styles.inbox} name={'md-checkbox-outline'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Conts</Text> */}
                  <Text style={[styles.tabtext,styles.tabtextsent]}>Done</Text>
              </TouchableOpacity> 
              </View>

            <View style={styles.swichtabaa}>
                    <TouchableOpacity style={styles.btnLogin}
                    onPress={this.requestedItems.bind(this, "")}>
                        <Icon style={styles.inbox} name={'md-stopwatch'} size={28} color={'rgba(0,0,0,0.45)'}/>
                      {/* <Text style={styles.btnText}> Inbox </Text> */}
                      <Text style={[styles.tabtext,styles.tabtextinbox]}>Requested</Text>
                  </TouchableOpacity> 
              </View>

          <View style={styles.swichtaba}>
                <TouchableOpacity style={styles.btnLogin}
                onPress={ this.reservation.bind(this, "") }
                 >
                    <Icon style={styles.inbox} name={'md-filing'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Conts</Text> */}
                  <Text style={[styles.tabtext,styles.tabtextsent]}>Preorder</Text>
              </TouchableOpacity> 
              </View>

          <View style={styles.swichtabb}>
                <TouchableOpacity style={styles.btnLogin}
                     onPress={ this.CancelledreOrder.bind(this, "") }
                  >
                     <Icon style={styles.inbox} name={'md-backspace'} size={28} color={'rgba(0,0,0,0.45)'}/>
                  {/* <Text style={styles.btnText}> Sent</Text> */}
                  <Text style={styles.tabtext}>Cancel</Text>
              </TouchableOpacity> 
              </View>

             
      
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
  width: 270
},tabtext :{
  alignContent:"center",
  marginLeft:23,
  color: "rgba(0,0,0,0.7)",
  marginBottom:20,
  fontWeight:"bold"
},tabtextinbox : {
  marginLeft:8,
  marginBottom:20
},tabtextsent : {
  marginLeft:32,
  marginBottom:20
},sectiontexttotalg:{
  color:"white",
  fontWeight: "bold",
  marginTop:-10,
  marginBottom:5
},oderhistoryres:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
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
}, editchef:{
  marginLeft: 10,
  color: 'green',
}
});

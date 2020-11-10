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
  Alert, 
  TextInput
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const {width: WIDTH} = Dimensions.get('window');

// Importing Images 
import bgImage from './images/background.jpg'

// Initializing a class
export default class waiterCart extends Component  {

      // Initializing Constructor
    constructor() {
            super()

            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              tempcart: [],
              requestedItems: [],
              CancelledreOrder: [],
              search: [],
              preparedItems: [], 

              value:"",
              total:"",
              FOODID:[],
              searchrequest: "",
              reorderId: "",
              retime: "",
              reorders: "",
              retableNumber:"",
              retotal: "", 
              restatus: "",
            
              reorderedItems:""
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
          orderId: doc.id,
          orders: doc.data().orders,
          status: doc.data().status,      
          tableNumber: doc.data().tableNumber,   
          time: moment(realtimee).format("LT"),   
          total: doc.data().total, 
          reorderedItems:  doc.data().reorderID,
        });
    });
    this.setState({
      requestedItems:todo
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

handlecallsearchLocalState = () => {
  this.setState({
    value:"search"
  })
  const search = this.state.searchrequest
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

  // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
  //   (snapshot => {}
if(search){
  db.collection("reservation").orderBy('resId').startAt(search).endAt(search+'\uf8ff')
  .onSnapshot(snapshot => {                                                           
    const todo = []; 
    snapshot.forEach(doc => {
 
      const realtimee = doc.data().time.toDate()
      const realdatee = doc.data().date.toDate()

      this.setState({
        reorderId: doc.id,
        retime: doc.data().time.toDate(),
        reorders: doc.data().orders,
        retotal: doc.data().total,
        restatus: doc.data().status,
        reorderedItems: doc.data().reorderedItems
      })

   
      todo.push({
        orderId: doc.id,
        firstName:  doc.data().firstName,
        lastName: doc.data().lastName, 
        time: moment(realtimee).format("LT"),
        date: moment(realdatee).format("DD-MM-YYYY"),
        orders: doc.data().orders,
        reorderedItems: doc.data().reorderedItems,
        NumberOfAttendees:doc.data().numberofattendees,
        total: doc.data().total,
        status: doc.data().status,
      });
  });
  this.setState({
    search:todo
  })
}); 
}else{
  this.inbox();
}
}

handleSetsearchLocalState = (searchrequest) => {
  this.setState({
    searchrequest,
  });
}

  
  componentDidMount() {
      this.tempcart()
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


handleSetretableNumberState = (retableNumber) => {
  this.setState({
    retableNumber,
  });
}

handleSettableNumberState = (tableNumber) => {
  this.setState({
    tableNumber,
  });
}

order=(reorderId,retime,reorders,retotal,restatus,reorderedItems)=>{
  const db = firebase.firestore();
  if(restatus=="Approved"){
  const addtocart = db.collection('requestedItems').doc()
  addtocart.set({
      reorderId:reorderId,
      orders: reorders,
      total: retotal,
      position: "waiter",
      status: "reOrdered",
      reorderID: reorderedItems,
      tableNumber: this.state.retableNumber,
      timeorded: retime
    });

  if(addtocart){
    alert("Done")
    db.collection('reOrder').doc(reorderedItems).delete()
    this.requestedItems()
  }}else {
    alert("Note this order was not Approved")
  }
}


reorder=(orders,total,uid)=>{
  if(this.state.tableNumber){
  const db = firebase.firestore();
  const currenttime = new Date()
  const addtocart = db.collection('requestedItems').doc()
  addtocart.set({
      orderby: uid,
      orders: orders,
      total: total,
      position: "waiter",
      status: "onWaiting",
      tableNumber: this.state.tableNumber,
      timeorded: currenttime
    });

  if(addtocart){
    alert("Reorde Done")
    this.contacts()
  }
}else{
  alert("Assigned Order to a table")
}
}


  render(){
        
    var SampletempcartArray = this.state.tempcart
    var SamplerequestedItemsArray = this.state.requestedItems
    var SampleCancelledreOrderArray = this.state.CancelledreOrder
    var SampleSearchArray = this.state.search
    var SamplepreparedItemsArray = this.state.preparedItems

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

    <Text style={styles.sectionttwototal} >k {this.state.total.toLocaleString('en-US',{style:'currency',currency:'USD'})} </Text>
   
  </View>
  <View>

    
<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-restaurant'} size={40} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                    style={styles.input}
                    // defaultValue={this.state.value}
                    // onChangeText={this.handleSetFirstNameLocalState}
                    keyboardType={'numeric'}
                    placeholderTextColor={'rgba(0,0,0,0.4)'}
                    underlineColorAndroid='transparent'
                    // onChangeText={this.handleSetDOBLocalState} 
                    // defaultValue={this.state.dob}
                      // defaultValue={this.state.value}
                onChangeText={this.handleSettableNumberState} 
                placeholder="        < tableNumber"
               
                underlineColorAndroid='transparent'
                />
</View>
</View>
                <TouchableOpacity style={styles.btnLogingg}
                   onPress={ this.reorder.bind(this,this.state.FOODID,this.state.total,this.state.currentUserId) }
                  >
                  <Text style={styles.btnText}>ORDER</Text>
              </TouchableOpacity> 
              </View>
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
                        // onPress={ this.doneItem.bind(this, item.itemId, item.time,item.tablenumber,item.status, item.orders,item.total,item.timestamps) }
                        >
                            <Icon style={styles.editchef} name={'md-done-all'} size={30} color={'green'}/> 
                    </TouchableOpacity>    
            </View>
  </View> 
</View> 
)

)}  

</View>
: (this.state.value=="search") ? 
<View>
{ 
  SampleSearchArray.map((item, key)=> (

    <View  key={key} style={styles.oderhistorysearch}>

    <View style={[styles.rescona,styles.resconawid]}>
         <View style={styles.sectiontwob}>
         <Text style={styles.sectiontextid}>resID: { item.orderId } </Text>
         <Text style={styles.sectionorders}>Cus Name: { item.firstName } { item.lastName } </Text>
         <Text style={styles.sectionorders}>Time: { item.time } </Text> 
         <Text style={styles.sectionorders}>Date: { item.date } </Text> 
         <Text style={styles.sectionorders}>Status: { item.status } </Text> 
         <Text style={styles.sectionorders}>NumberOfAttendees: { item.NumberOfAttendees } </Text>     
         <Text style={styles.sectionorders}>orderID: { item.reorderedItems } </Text>
         <Text style={styles.sectiontexttotalg}>............................................................ </Text>
         <Text style={styles.sectionorders}>{ item.orders } </Text>
         <Text style={styles.sectiontexttotalg}>............................................................ </Text>
         <Text style={styles.sectionorders}>total: { item.total } </Text>
         <Text style={styles.sectiontexttotalg}>............................................................ </Text>
         </View>
       </View>
       
</View> 
)



)}  
<View>
<View style={styles.innerres}>
<Icon style={styles.innerresa} name={'md-restaurant'} size={40} color={'rgba(0,0,0,0.45)'}/> 
<View style={styles.innerresb}>
<TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                // onChangeText={this.handleSetFirstNameLocalState}
                keyboardType={'numeric'}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                underlineColorAndroid='transparent'
                // onChangeText={this.handleSetDOBLocalState} 
                // defaultValue={this.state.dob}
                  // defaultValue={this.state.value}
            onChangeText={this.handleSetretableNumberState} 
            placeholder="Table Number"
           
            underlineColorAndroid='transparent'
            />
</View>
</View>

            <TouchableOpacity style={styles.btnLogingg}
               onPress={ this.order.bind(this,this.state.reorderId,this.state.retime,this.state.reorders,this.state.retotal,this.state.restatus,this.state.reorderedItems) }
              >
              <Text style={styles.btnText}>ORDER</Text>
          </TouchableOpacity> 
    </View>

</View>

: (this.state.value=="requestedItems") ? 
      <View>
    { SamplerequestedItemsArray.map((item, key)=> (

      <View  key={key} style={styles.oderhistory}>
       <View style={[styles.rescona,styles.resconawid]}>
            <View style={styles.sectiontwob}>
            <Text style={styles.sectiontextid}>resID: { item.orderId } </Text>
            <Text style={styles.sectionorders}>tableNumber: { item.tableNumber } </Text>
            <Text style={styles.sectionorders}>Time: { item.time } </Text> 
            <Text style={styles.sectionorders}>status: { item.status } : { item.reorderedItems } </Text> 
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>{ item.orders } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            <Text style={styles.sectionorders}>total: { item.total } </Text>
            <Text style={styles.sectiontexttotalg}>............................................................ </Text>
            </View>
          </View>


       <View style={styles.resconb}>

                <View style={styles.resconbab}>
                    <TouchableOpacity style={styles.btncanclea}
                          // onPress={ this.cancleRes.bind(this, item.itemId) }
                          onPress={ this.sendRes.bind(this, item.itemId) }
                          >
                            <Icon style={styles.delete} name={'md-calendar'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                          
                        </TouchableOpacity>    
                </View>
            
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
<View style={styles.search}>
             <View style={styles.searcha}>
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                //  onFocus={this.handlecallsearchLocalState} 
                // onBlur={this.handlecallsearchLocalState}
                placeholder="Search..."
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                // onChangeText={(email) => this.setState({email: email})}
                onChangeText={this.handleSetsearchLocalState} 
            
              />
            </View>
            <View style={styles.searchb}>
                    <TouchableOpacity 
                onPress={this.handlecallsearchLocalState}>
                    <Icon  name={'md-search'} size={28} color={'white'}
                  style={styles.inputIcon}
                  /> 
                  </TouchableOpacity> 
              </View>
         </View>
        
<View style={styles.swichtab}>
            <View style={styles.swichtabaa}>
                    <TouchableOpacity style={styles.btnLogin}
                    onPress={this.tempcart.bind(this, "")}
                    >
                        {/* <Icon style={styles.inbox} name={'md-cart'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
                      {/* <Text style={styles.btnText}> Inbox </Text> */}
                      <Text style={[styles.tabtext,styles.tabtextinbox]}> Items</Text>
                  </TouchableOpacity> 
              </View>

          <View style={styles.swichtaba}>
                <TouchableOpacity style={styles.btnLogin}
                onPress={ this.requestedItems.bind(this, "") }
                 >
                    {/* <Icon style={styles.inbox} name={'md-filing'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
                  {/* <Text style={styles.btnText}> Conts</Text> */}
                  <Text style={[styles.tabtext,styles.tabtextsent]}>Ordered</Text>
              </TouchableOpacity> 
              </View>

              <View style={styles.swichtabaa}>
                    <TouchableOpacity style={styles.btnLogin}
                    onPress={this.preparedItems.bind(this, "")}
                    >
                        {/* <Icon style={styles.inbox} name={'md-cart'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
                      {/* <Text style={styles.btnText}> Inbox </Text> */}
                      <Text style={[styles.tabtext,styles.tabtextinbox]}> Prepared</Text>
                  </TouchableOpacity> 
              </View>

              
         

{/*               
          <View style={styles.swichtabb}>
                <TouchableOpacity style={styles.btnLogin}
                     onPress={ this.CancelledreOrder.bind(this, "") }
                  >
                  
                  <Text style={styles.tabtext}>Cancelled</Text>
              </TouchableOpacity> 
              </View> */}
              
              
          {/* <View style={styles.swichtabc}>
                <TouchableOpacity style={styles.btnLogin}
                     onPress={ this.CancelledreOrder.bind(this, "") }
                  >
                  <Text style={styles.btnText}> JRJR</Text>
              </TouchableOpacity> 
              </View>  */}
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
    height:48,
    // borderTopColor: "rgba(1,1,1,00000000000000.3)",
    // borderTopWidth: 1,
    backgroundColor: "rgba(0,0,0,0.0)",
  },  swichtabaa :{
    flex: 1,
    borderBottomColor: "rgba(0,0,0,0.0)",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderTopWidth: 7,
    borderTopColor:"rgba(0,0,0,0.0)",
    borderBottomWidth: 7,
    width: 140,
    height: 47,
  }, swichtaba :{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderTopWidth: 7,
    borderTopColor:"rgba(0,0,0,0.0)",
    borderBottomColor: "rgba(0,0,0,0.0)",
    borderBottomWidth: 7,
    width: 140,
    height: 47,
  }, swichtabb :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.3)",
    borderBottomWidth: 7,
    width: 140,
    height: 27,
  }, swichtabc :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.5)",
    borderBottomWidth: 7,
    width: 140,
    height: 27,
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
  width: WIDTH-130,
  height: 40,
  // backgroundColor:  'rgba(0,0,0,0.2)',
  backgroundColor: '#561a1a',
  // marginHorizontal: 20,
  justifyContent: 'center',
  marginLeft: 55,
  borderRadius: 15,
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
  marginBottom:25,
  marginTop: 10
  // fontWeight:"bold"
},tabtextinbox : {
  marginLeft:32,
  marginBottom:20
},tabtextsent : {
  marginLeft:32,
  marginBottom:20
},innerres:{
  flexDirection: "row",
  width: WIDTH,
  height:50,
  borderBottomColor: "rgba(1,1,1,00000000000000.1)",
  borderBottomWidth: 1,
  backgroundColor:"rgba(0,0,0,0.1)",
  marginBottom:3
},innerresa:{
  flex: 1,
  width: 30,
  marginBottom: -10,
  marginLeft: 10
},
innerresb:{
  flex: 6,
  width: 100,
  marginTop:-2,
  height:40
}, input :{
  height:45,
  marginTop: 0,
  color: 'rgba(0,0,0,0.5)',
  fontSize: 20,
},sectiontexttotalg:{
  color:"white",
  fontWeight: "bold",
  marginTop:-10,
  marginBottom:5
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
}, sectionttwototal:{
  color:'rgba(0,0,0,0.6)',
  fontSize:16,
}, oderhistory:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
  height: 230,
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
}, rescona:{
  width: 270,
  flex:8
},sectiontexttotalg:{
  color:"white",
  fontWeight: "bold",
  marginTop:-10,
  marginBottom:5
}, search:{
  flexDirection: "row", 
  backgroundColor:  'rgba(0,0,0,0.30)',
  marginHorizontal: 40,
  height: 40,
  paddingLeft: 20,
  borderRadius: 20,
  marginTop: 10,
  width: WIDTH - 70,
}, searcha :{
  flex:4,  
  marginTop:-3
},searchb:{
  flex:1,
}, header:{
  backgroundColor:  'rgba(0,0,0,0.2)'
}, oderhistorysearch:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
  height: 270,
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
}, inputIcon:{
  marginBottom:8,
  marginTop: 5
},oderhistoryres:{
  marginBottom: 1,
  // backgroundColor: "rgba(233, 233, 233, 0.5)",
  // width: WIDTH - 40,
  width: WIDTH,
  height: 230,
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
}, rescona:{
  width: 270,
  flex: 8
}
});

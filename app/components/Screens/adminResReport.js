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
import moment from 'moment'

const {width: WIDTH} = Dimensions.get('window');

import bgImage from './images/background.jpg'


export default class adminResReport extends Component  {

    constructor() {
            super()
            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              todos: [],
              todolength:"",
              calcu:""
                  }
            }

  menu = (category) =>{

    var today = new Date();
    var yesterday = new Date(today.getTime()-(1000*60*60*24));
    var week = new Date(today.getTime()-(1000*60*60*(24*7))) ;
    var month = new Date(today.getTime()-(1000*60*60*(24*30))) ;
    var currenttime = new Date(today.getTime())

    if(category == "day"){
      this.setState({calcu:"Total Reservation in the past 24hours",})
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})
      let resorder = db.collection("reservation").where('status', '==',"Approved")
      resorder.orderBy("date")
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
         const realdatee = doc.data().date.toDate()
         const realdateee = new Date(realdatee.getTime())
         const realtimee = doc.data().time.toDate()
          if((realdateee > yesterday) && (realdateee < currenttime)) {
          todo.push({
            firstName: doc.data().firstName,
            lastName: doc.data().firstName,
            resid: doc.id, 
            date: moment(realdatee).format("dddd,MMMM Do YYYY"),
            time: moment(realtimee).format("LT"),
            numberofattendees: doc.data().numberofattendees,
            comments: doc.data().comments,
            status: doc.data().status,
            reorderedItems: doc.data().reorderedItems
          });
        }
      });
      this.setState({
        todos:todo,
        todolength:todo.length
      })
  }); 

    }else if(category == "week") {
      this.setState({calcu:"Total Reservation in the past 7days",})
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
      //   (snapshot => {}

      let resorder = db.collection("reservation").where('status', '==',"Approved")
      resorder.orderBy("date")
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
            const realdatee = doc.data().date.toDate()
            const realdateee = new Date(realdatee.getTime())
            const realtimee = doc.data().time.toDate()
             if((realdateee > week) && (realdateee < currenttime)) {
          todo.push({
            firstName: doc.data().firstName,
            lastName: doc.data().firstName,
            resid: doc.id, 
            date: moment(realdatee).format("dddd,MMMM Do YYYY"),
            time: moment(realtimee).format("LT"),
            numberofattendees: doc.data().numberofattendees,
            comments: doc.data().comments,
            status: doc.data().status,
            reorderedItems: doc.data().reorderedItems
          });
        }
      });  
      this.setState({
        todos:todo,
        todolength:todo.length
      })
  }); 

    }else if (category == "month"){
      this.setState({calcu:"Total  Reservation in the past 30days",})
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})
      let resorder = db.collection("reservation").where('status', '==',"Approved")
      resorder.orderBy("date")
      .onSnapshot(snapshot => {   
        const todo = []; 
        
        snapshot.forEach(doc => {  
            const realdatee = doc.data().date.toDate()
            const realdateee = new Date(realdatee.getTime())
            const realtimee = doc.data().time.toDate()
             if((realdateee > month) && (realdateee < currenttime)) {
         todo.push({
            resid: doc.id, 
            firstName: doc.data().firstName,
            lastName: doc.data().firstName,
            date: moment(realdatee).format("dddd,MMMM Do YYYY"),
            time: moment(realtimee).format("LT"),
            numberofattendees: doc.data().numberofattendees,
            comments: doc.data().comments,
            status: doc.data().status,
            reorderedItems: doc.data().reorderedItems
          });
        }
      });
      this.setState({
        todos:todo,
        todolength:todo.length
      })
  }); 
    }else {
      this.setState({calcu:"Total Reservation",})
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})
      let resorder = db.collection("reservation").where('status', '==',"Approved")
      resorder.orderBy("date")
      .onSnapshot(snapshot => {   
        const todo = []; 
        
        snapshot.forEach(doc => {
          const realdatee = doc.data().date.toDate()
          const realtimee = doc.data().time.toDate()
          todo.push({
            resid: doc.id, 
            firstName: doc.data().firstName,
            lastName: doc.data().firstName,
            date: moment(realdatee).format("dddd,MMMM Do YYYY"),
            time: moment(realtimee).format("LT"),
            numberofattendees: doc.data().numberofattendees,
            comments: doc.data().comments,
            status: doc.data().status,
            reorderedItems: doc.data().reorderedItems
          });
      });
      this.setState({
        todos:todo,
        todolength:todo.length
      })
  }); 
  }
}


  componentDidMount() {
    this.menu("")
  }

addReorder=(item)=> {
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('cusaddReorder', {itemId: item});
}

viewContact=(item)=> {
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('adminViewContact', {userid: item});
}


addtocart=(itemId,itemName,itemPrice,itemDescription)=>{
  const db = firebase.firestore();
  const addtocart = db.collection("tempcart").doc()
  addtocart.set({
      senderID: this.state.currentUserId,
      itemId: itemId,
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription
  });
  if(addtocart){
    alert("Item added")
  }
}

  render(){
    var SampleNameArray = this.state.todos
    return ( 
      <ImageBackground source={bgImage} style={styles.ImageBackgroundCon}>
        
<View style={styles.swichtab}>
<View style={styles.swichtabaa}>
        <TouchableOpacity style={styles.btnLogin}
        onPress={this.menu.bind(this, "")}>
            <Icon style={styles.inbox} name={'md-cellular'} size={28} color={'rgba(0,0,0,0.45)'}/>
          {/* <Text style={styles.btnText}> ALL</Text> */}
      </TouchableOpacity> 
  </View>

<View style={styles.swichtaba}>
    <TouchableOpacity style={styles.btnLogin}
    onPress={ this.menu.bind(this, "day") }
     >
         {/* <Icon style={styles.inbox} name={'md-basket'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
    
      <Text style={styles.tabtext}>Day</Text>
  </TouchableOpacity> 
  </View>

  
<View style={styles.swichtabb}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.menu.bind(this, "week") }
      >
          {/* <Icon style={styles.inbox} name={'md-pizza'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
          <Text  style={styles.tabtext}>Week</Text>
      {/* <Text style={styles.btnText}> JRJR</Text> */}
  </TouchableOpacity> 
  </View>

  
<View style={styles.swichtabc}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.menu.bind(this, "month") }
      >
          {/* <Icon style={styles.inbox} name={'md-wine'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
          <Text  style={styles.tabtext}>Month</Text>
      {/* <Text style={styles.btnText}> JRJR</Text> */}
  </TouchableOpacity> 
  </View>
</View>
               <ScrollView>
      
      <StatusBar 
      backgroundColor='#b3a7a9'
      barStyle="light-content"
      />
<View style={styles.container}>

              { SampleNameArray.map((item, key)=> (

                  <View  key={key} style={styles.sectiontwo}>

<View style={styles.rescona}>
        
        <View style={styles.sectiontwob}>
   
                <Text numberOfLines={1} style={styles.headText}>{ item.firstName } { item.lastName } { item.senderlastName } </Text>
                <Text numberOfLines={1} style={styles.sectiontext}>{ item.date } </Text>
                <Text numberOfLines={1} style={styles.sectionmessage}>Time: { item.time } </Text>
                <Text numberOfLines={1} style={styles.sectionmessage}>numberofattendees: { item.numberofattendees } </Text>
                <Text numberOfLines={1} style={styles.sectionmessage}>{ item.resid } </Text>
                
            </View>
 
          </View>

{/* 
                   <View style={styles.resconb}>

                            
                        
                            <View style={styles.resconbb}>
                                <TouchableOpacity style={styles.btncanclea}
                                        onPress={ this.addtocart.bind(this, item.itemId,item.itemName,item.price,item.descrip) }
                                        >
                                            <Icon style={styles.edit} name={'md-add-circle-outline'} size={23} color={'rgba(0,0,0,0.45)'}/> 
                                    </TouchableOpacity>    
                            </View>
             </View>  */}
              </View> 
              )
         )}

           
            </View>

              </ScrollView>
              <View style={styles.sec}>
                <Text>  {this.state.calcu} : {this.state.todolength} </Text>
              </View>

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
    flex: 9,
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

    marginLeft: 12
  }, edit:{
    marginLeft: 11,
    color: 'white',
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
     borderBottomWidth: 2,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    padding: 10
  }, inbox :{
    marginLeft:25
  }, headText:{
    width: 200,
    fontWeight: "bold",
    // fontSize: 16
    marginBottom: 5
  }, sectiontext : {
    width: 270
  }, orderText:{
    // fontWeight: "bold",
    color: "white"
  }, tabtext :{
    alignContent:"center",
    marginLeft:20,
    color: "rgba(0,0,0,0.7)",
    marginBottom:0,
    marginTop:8,
   
  }
});

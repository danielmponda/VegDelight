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

const {width: WIDTH} = Dimensions.get('window');

import bgImage from './images/background.jpg'

export default class adminSettings extends Component  {

    constructor() {
            super()
            this.currentUserId = firebase.auth().currentUser.uid,
            this.state = {
              currentUser: firebase.auth().currentUser,
              currentUserId: firebase.auth().currentUser.uid,
              todos: [],
                  }
            }

          
            deleteItem=(item)=>{
              const db = firebase.firestore();
              Alert.alert(
                '',
                'Remove Item',
                [
                  {text: 'yes',onPress: () => db.collection('foodItem').doc(item).delete() ,style: 'cancel',},
                  {text: 'no', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            }

  menu = (category) =>{
    if(category){

      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
      //   (snapshot => {}

      db.collection("foodItem").where('Category', '==',category)
      .onSnapshot(snapshot => {   
        const todo = []; 
        snapshot.forEach(doc => {
          todo.push({
            itemId: doc.id,
            descrip: doc.data().Description,
            price: doc.data().Price,
            itemName: doc.data().itemName,
            url: doc.data().urll
          });
      });
      this.setState({
        todos:todo
      })
  }); 

    }else {
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
      //   (snapshot => {}

      db.collection("foodItem").onSnapshot(snapshot => {   
        const todo = [];
        snapshot.forEach(doc => {
            todo.push({
              itemId: doc.id,
              descrip: doc.data().Description,
              price: doc.data().Price,
              itemName: doc.data().itemName,
              url: doc.data().urll
            });
      })    
      this.setState({
        todos:todo
      })
  }); 

    }
  }


  
  componentDidMount() {
      this.menu()
     

      firebase.auth().onAuthStateChanged( user =>  {
        if (user) {
          this.setState({
            currentUserId: user.uid,
                 })
            
         }
      });
     
  }



addReorder=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('adminaddReorder', {itemId: item});
}



adminupdatefooditem=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('adminupdatefooditem', {itemId: item});
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
    onPress={ this.menu.bind(this, "Apperizer&Dessert") }
     >
         <Icon style={styles.inbox} name={'md-basket'} size={28} color={'rgba(0,0,0,0.45)'}/>
      {/* <Text style={styles.btnText}> JRJR</Text> */}
      <Text style={styles.tabtext}>Appetizer</Text>
  </TouchableOpacity> 
  </View>

  
<View style={styles.swichtabb}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.menu.bind(this, "Meal/Dinner") }
      >
          <Icon style={styles.inbox} name={'md-pizza'} size={28} color={'rgba(0,0,0,0.45)'}/>
          <Text  style={styles.tabtext}>Main Meal</Text>
      {/* <Text style={styles.btnText}> JRJR</Text> */}
  </TouchableOpacity> 
  </View>

  
<View style={styles.swichtabc}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.menu.bind(this, "Drinks") }
      >
          <Icon style={styles.inbox} name={'md-wine'} size={28} color={'rgba(0,0,0,0.45)'}/>
          <Text  style={styles.tabtext}>Beverages</Text>
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

                    <TouchableOpacity style={styles.orderTextBody}
                             
                              >
                        <View style={styles.sectiontwob}>
                            <Text numberOfLines={1} style={styles.headText}> { item.itemName } </Text>
                            <Text numberOfLines={1} style={styles.sectiontext}> { item.descrip } </Text>
                              <Text style={styles.orderText}> K { item.price }</Text>
                         
                        </View>
 </TouchableOpacity>
                      </View>


                   <View style={styles.resconb}>

                            
                        
                            <View style={styles.resconbb}>
                                <TouchableOpacity style={styles.btncanclea}  
                                     onPress={ this.adminupdatefooditem.bind(this, item.itemId) }
                                    //onPress={() => this.props.navigation.navigate('adminupdatefooditem')}
                                        // onPress={ this.addtocart.bind(this, item.itemId,item.itemName,item.price,item.descrip) }
                                        >
                                            <Icon style={styles.delete} name={'md-create'} size={23} color={'white'}/> 
                                    </TouchableOpacity>    
                            </View>
                            <View style={styles.resconba}>
                                <TouchableOpacity style={styles.btncanclea}
                                     onPress={ this.deleteItem.bind(this, item.itemId) }
                                        // onPress={ this.addtocart.bind(this, item.itemId,item.itemName,item.price,item.descrip) }
                                        >
                                            <Icon style={styles.edit} name={'md-trash'} size={23} color={'red'}/> 
                                    </TouchableOpacity>    
                            </View>
             </View> 
              </View> 
              )
         )}

           
            </View>

              </ScrollView>
              <TouchableOpacity style={styles.btnfoot}
                 onPress={() => this.props.navigation.navigate('adminaddfoodItem')}>
                <Icon  name={'md-add-circle-outline'} size={28} color={'white'}
                  style={styles.additems}
                  /> 
               
            </TouchableOpacity>
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
    marginRight: 48
  },resconba: {
    flex: 1,
    
  },resconbb: {
    marginRight: 43,
    flex: 9,
  },btncanclea :{
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor:  'rgba(0,0,0,0.3)',
    justifyContent: 'center'
  }, delete:{
    justifyContent: "center",
    color: 'rgba(0,0,0,0.3)',
    marginLeft: 12
  }, edit:{
    marginLeft: 13,
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
    width: 245
  }, orderText:{
    // fontWeight: "bold",
    color: "white"
  }, tabtext :{
    alignContent:"center",
    marginLeft:10,
    color: "rgba(0,0,0,0.7)",
    marginBottom:5,
  }, btnfoot:{
    backgroundColor:  'rgba(0,0,0,0.1)',
    height:35,
    borderTopColor: "rgba(1,1,1,00000000000000.1)",
    borderTopWidth: 1,
  }, additems:{
    color:  'rgba(0,0,0,0.7)',
    marginHorizontal:158,
    marginTop:2
  }
});

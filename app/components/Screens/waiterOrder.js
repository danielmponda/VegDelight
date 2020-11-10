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
  TextInput,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons'

const {width: WIDTH} = Dimensions.get('window');

import bgImage from './images/background.jpg'

export default class waiterOrder extends Component  {

    constructor() {
            super()

            this.state = {
              currentUserId: firebase.auth().currentUser.uid,
              todos: [],
              search: ""
                  }
            }


            handleSetsearchLocalState = (search) => {
              this.setState({
                search,
              });
            }

            handlecallOFFsearchLocalState = () => {
              this.menu()

            }

handlecallsearchLocalState = () => {
  const search = this.state.search
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots: true})

  // db.collection("reservation").where('currentUserId', '==',this.state.currentUserId).get().then(
  //   (snapshot => {}
if(search){
  db.collection("foodItem").orderBy('itemName').startAt(search).endAt(search+'\uf8ff')
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
}else{
  this.menu();
}




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
  }



addReorder=(item)=>{
  // this.props.navigation.setParams({ name: item })
  this.props.navigation.navigate('waiteraddReorder', {itemId: item});
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
       <View style={styles.header}>
           <View style={styles.search}>
             <View style={styles.searcha}>
              <TextInput
                style={styles.input}
                // defaultValue={this.state.value}
                //  onFowaiter={this.handlecallsearchLocalState} 
                // onBlur={this.handlecallsearchLocalState}
                placeholder="Search..."
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                // onChangeText={(email) => this.setState({email: email})}
                onChangeText={this.handleSetsearchLocalState} 
                keyboardType="email-address"
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
        onPress={this.menu.bind(this, "")}>
            {/* <Icon style={styles.inbox} name={'md-cellular'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
          {/* <Text style={styles.btnText}> ALL</Text> */}
          <Text style={[styles.tabtext,styles.taball]}>All</Text>
      </TouchableOpacity> 
  </View>

<View style={styles.swichtaba}>
    <TouchableOpacity style={styles.btnLogin}
    onPress={ this.menu.bind(this, "Apperizer&Dessert") }
     >
         {/* <Icon style={styles.inbox} name={'md-basket'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
      {/* <Text style={styles.btnText}> JRJR</Text> */}
      <Text style={styles.tabtext}>Appetizer</Text>
  </TouchableOpacity> 
  </View>

  
<View style={styles.swichtabb}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.menu.bind(this, "Meal/Dinner") }
      >
          {/* <Icon style={styles.inbox} name={'md-pizza'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
          <Text  style={styles.tabtext}>Main Meal</Text>
      {/* <Text style={styles.btnText}> JRJR</Text> */}
  </TouchableOpacity> 
  </View>

  
<View style={styles.swichtabc}>
    <TouchableOpacity style={styles.btnLogin}
         onPress={ this.menu.bind(this, "Drinks") }
      >
          {/* <Icon style={styles.inbox} name={'md-wine'} size={28} color={'rgba(0,0,0,0.45)'}/> */}
          <Text  style={styles.tabtext}>Beverages</Text>
      {/* <Text style={styles.btnText}> JRJR</Text> */}
  </TouchableOpacity> 
  </View>
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

<TouchableOpacity 
                          onPress={ this.addReorder.bind(this, item.itemId) }>
                    <View style={styles.sectiontwob}>
                        <Text  numberOfLines={1}style={styles.headText}>{ item.itemName } </Text>
                        <Text  numberOfLines={4} style={styles.sectiontextt}>{ item.descrip } </Text>
                       
                          <Text style={styles.orderText}>K { item.price }</Text>
                     
                    </View>
 </TouchableOpacity>
                    <View style={styles.sectiontwoa}>
                      <TouchableWithoutFeedback>
                        <Image  style={styles.itemPhoto} source={{uri: item.url}} />
                      </TouchableWithoutFeedback>
                    </View>


                  
              </View> 
              )
         )}

           
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
    height:43,
    borderTopColor: "rgba(1,1,1,00000000000000.1)",
    borderTopWidth: 2,
    paddingTop:7
  },  swichtabaa :{
    flex: 1,
    width: 140,
    height: 34,
  }, swichtaba :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.5)",
    borderBottomWidth: 7,
    width: 140,
    height: 34,
  }, swichtabb :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.3)",
    borderBottomWidth: 7,
    width: 140,
    height: 34,
  }, swichtabc :{
    flex: 1,
    borderBottomColor: "rgba(1,1,1,00000000000000.5)",
    borderBottomWidth: 7,
    width: 140,
    height: 34,
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
    height: WIDTH * (9/21),
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
  }, inbox :{
    marginLeft:25
  }, headText:{
     fontWeight: "bold",
    width:200
  }, sectiontext : {
    width: 270
  }, orderText:{
    fontWeight: "bold",
    color: "white"
  }, tabtext :{
    alignContent:"center",
    marginLeft:10,
    color: "rgba(0,0,0,0.7)",
    marginBottom:5,
  }, input:{
    width: WIDTH - 150,
    height: 45,
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop:-4,
    marginBottom:-10
  }, inputIcon:{
   marginTop: 6,
   marginLeft:10,
   
  },sectiontwob:{
    flex:9,
    // backgroundColor: "pink",
    padding: 0,
 margin: 2,
  },sectiontwoa:{
    flex:5,
    padding: 0,
    marginLeft:-5
  },
  itemPhoto: {
    width: 129,
    height: 129,
    padding: 0,
    margin: 0,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },sectiontextt: {
    padding: 10,
    // color: 'rgba(245, 245, 245, 0.993)',
    width: 200
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
  }, taball:{
    marginLeft:30, 
    fontWeight: "bold"

  }
});

import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
    Alert
  } from 'react-native';

  import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
  import firebase from 'react-native-firebase';

  const {width: WIDTH} = Dimensions.get('window');
  import bgImage from './images/background.jpg' 
  import logoImage from './images/logo.png'
  import Icon from 'react-native-vector-icons/Ionicons'
  


export default class cusaddReorder extends Component  {
    constructor(props) {
        super(props)
        this.state = {
          currentUser: firebase.auth().currentUser,
          currentUserId: firebase.auth().currentUser.uid,
          itemId:"",
          itemName:"",
          Price:"",
          Category:"",
          Description: "",
          firstName: "",
          lastName: "",
          comment: "",
          todos:[],
        }
    }


    addreview = () => {
      alert("review added")
      const db = firebase.firestore();
      const addtocart = db.collection("reviews").doc()
      const time = new Date();
      addtocart.set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        itemId: this.state.itemId,
        time: time,
        comment: this.state.comment,
        status: "Pending"
      })
    }

    
        handleSetCommentState = (comment) => {
          this.setState({
            comment,
          });
        }



    handleUpdateUsers = () => {
      const db = firebase.firestore();
      Alert.alert(
        '',
        'Add to Cart ? ',
        [
          {text: 'yes',onPress: () =>  {
            const { itemId } = this.props.navigation.state.params;
    
            const db = firebase.firestore();
            const addtocart = db.collection("tempcart").doc()
            addtocart.set({
                senderID: this.state.currentUserId,
                itemId: this.state.itemId,
                itemName: this.state.itemName,
                itemPrice: this.state.Price,
                itemDescription: this.state.Description
            })

            
        if(addtocart){
          this.props.navigation.goBack();
            alert("Sucessfully Added"); 
       }
          } ,style: 'cancel',},
          {text: 'no', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }


    componentDidMount() {
        
      const { itemId } = this.props.navigation.state.params;
        
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      const myProfile = db.collection("foodItem").doc(itemId)
      
      myProfile.get()
        .then(doc => {
            const data = doc.data()
            this.setState({
                    itemId: doc.id,
                    itemName: data.itemName,
                    Price:  data.Price,
                    Category: data.Category,
                    Description:  data.Description,
                    Url:  data.urll,
                  })
        })  
        let doc = db.collection("users").doc(this.state.currentUser.uid)
        doc.onSnapshot(docSnapshot => {
                        this.setState({
                                firstName: docSnapshot.data().firstName,
                                lastName:  docSnapshot.data().lastName,            
                    })
                });  
                
        let review =  db.collection("reviews").where('itemId', '==',itemId)
        review = review.orderBy("time", "desc")
        review.onSnapshot(snapshot => {   
                const todo = [];
                snapshot.forEach(doc => {
                todo.push({
                itemId: doc.data().itemId,
                            firstName: doc.data().firstName,
                              lastName: doc.data().lastName,
                              itemId: doc.data().itemId,
                              time: doc.data().time,
                              comment:  doc.data().comment
                            });
                          })    
                      this.setState({
                        todos:todo
                      })
                  }); 
                }

  render(){
    var SampleNameArray = this.state.todos
    return ( 
      <ImageBackground   source={bgImage} style={styles.ImageBackgroundCon}>
                <ScrollView>
       <View style={styles.container}> 
      
      <StatusBar backgroundColor='black' barStyle="light-content"/>

        <View style={styles.cover}>
            <TouchableWithoutFeedback>
              <Image  style={styles.coverPhoto} source={{uri:this.state.Url}} />
            </TouchableWithoutFeedback>
            <View style={styles.itempricestyle}>
                              <Icon style={styles.innerresar} name={'md-pricetags'} size={50} color={'rgba(0,0,0,0.45)'}/> 
                              <Text style={styles.itemprice}>  {this.state.Price} </Text>
                          </View>
                          <View style={styles.itemnamestyel}>
                          <Text style={styles.profileinfoName}>{this.state.itemName} </Text>
                          </View>
        </View>


        <View style={styles.fieldContainer}>
        <View style={styles.sectionone}>
        <View style={styles.holder}>

        <View style={[styles.innerres,styles.innerrat]}>
            <Icon style={styles.innerresa} name={'md-restaurant'} size={28} color={'rgba(0,0,0,0.45)'}/> 
            <Text style={styles.innerresb} > {this.state.itemName}</Text>
        </View>

          <View style={styles.innerres}>
            <Icon style={styles.innerresa} name={'md-pricetags'} size={28} color={'rgba(0,0,0,0.45)'}/> 
            <Text style={styles.innerresb} > k {this.state.Price} </Text>
          </View>

        <View style={styles.innerres}>
            <Icon style={styles.innerresa} name={'md-list'} size={28} color={'rgba(0,0,0,0.45)'}/> 
            <Text style={styles.innerresb} > {this.state.Category} </Text>
        </View>


        <View style={[styles.innerres,styles.innerrend]}>
          <Icon style={styles.innerresa} name={'md-information-circle-outline'} size={28} color={'rgba(0,0,0,0.45)'}/> 
          <Text numberOfLines={5}style={styles.innerresb} > {this.state.Description} </Text>
        </View>

</View> 
                      
    </View>

            <TouchableOpacity style={styles.btnLogin}
                onPress={this.handleUpdateUsers}>
                <Text style={styles.btnText}>ADD</Text>
            </TouchableOpacity>

  <View style={[styles.innerress]}>
    <View style={styles.spacing}>
      <View style={styles.innerresbb}>
         <TextInput    
                    style={[styles.input]}
                    placeholder="Add a review"
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    underlineColorAndroid='transparent'
                    numberOfLine={7}
                    multiline={true}
                    onChangeText={this.handleSetCommentState}
          />
      </View>

             <TouchableOpacity  style={styles.addreview}
                onPress={this.addreview}>
                <Icon style={styles.innerresae} name={'md-add-circle'} size={28} color={'rgba(0,0,0,0.45)'}/> 
             </TouchableOpacity>

 </View>
  
</View>


            </View>

            { SampleNameArray.map((item, key)=> (

<View  key={key} style={styles.sectiontwo}>

  <View style={styles.rescona}>

  <View style={styles.innerresq}>
           <Icon style={styles.innerresa} name={'md-person'} size={28} color={'rgba(0,0,0,0.45)'}/> 
           <Text style={styles.innerresb} >{ item.firstName } { item.lastName }</Text>
           </View>
           <View style={styles.innerresr}>
           <Text style={styles.innerresb} >{ item.comment }</Text>
           </View>

    </View>
    </View>
       )
      )
    }
    </View>
    </ScrollView>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
    ImageBackgroundCon: {

      justifyContent: 'center',
     
    },
    container: {
      flex:1
    },
    coverPhoto:{
    width: WIDTH,
    height: WIDTH * (9/12),
    marginBottom: 10,
      },  
    fieldContainer: {
      marginTop: 0,
     marginBottom: 20,
      justifyContent: 'center',
    },
    inputIcon:{
      position: 'absolute',
      top: 4,
      left:34,
    },
    btnEye:{
      position: 'absolute',
      top: 4,
      right:34,
    },
    btnLogin:{
        width: WIDTH - 80,
      height: 35,
      borderRadius: 12,
      backgroundColor:  'rgba(0,0,0,0.2)',
      marginHorizontal: 40,
      marginTop: 0,
      justifyContent: 'center',
      // marginBottom: 15
    },
    btnText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white'
    }, 
    btnSignUpText:{
      fontSize: 14,
      color: 'white',
      textAlign: 'center'
    },sectionone:{
      marginBottom: 10,
      marginLeft: 14,
      backgroundColor:  'rgba(0,0,0,0.1)',
      borderBottomColor: "rgba(1,1,1,00000000000000.1)",
      borderBottomWidth: 30,
      width: WIDTH - 25,
      height: WIDTH * (9/12),
      borderRadius: 30,
      }, holder:{
        marginLeft: 20,
        marginTop: 6
      }, innerres:{
        flexDirection: "row",
        width: 260,
        height:40,
        borderBottomColor: "rgba(1,1,1,00000000000000.1)",
        borderBottomWidth: 7,
        marginBottom:9
      },innerresa:{
        flex: 1,
        width: 30,
        marginBottom: -10
      },innerresb:{
        flex: 6,
        width: 100,
        marginTop:4
      }, innerrend:{
        height:100,
        borderBottomWidth: 0,
        textAlign:"justify"
      }, innerrat:{
        height: 50,
      }, itemnamestyel:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:65,
        position:"absolute",
        top: 170,
        left: -0,
        width: WIDTH
      }, itempricestyle :{
        // backgroundColor:'rgba(0,0,0,0.4)',
        color:"pink",
        height:130,
        width: 135,
        // borderWidth:1,
        // borderColor: "red",
        borderRadius:100,
        position:"absolute",
        top: 10,
        left: 150,
        flexDirection:"row"
      },innerresar:{
        flex:1,
        color:'white',
        marginTop:10,
        marginLeft:7
      },itemprice:{
        flex:1,
        color:"pink",
        fontSize:20,
        color:"white",
        marginRight:3,
        borderWidth:1,
        height:30,
        width:40,
        paddingTop:0,
        borderRadius:100,
        backgroundColor:'rgba(0,0,0,0.4)',
      }, 
      profileinfoName:{
        padding: 5,
        fontSize: 20,
        color: "white",
        // borderBottomColor: "rgba(1,1,1,00000000000000.1)",
        // borderBottomWidth: 3,
        marginBottom:3
      }, innerress:{
        borderTopColor: "rgba(1,1,1,00000000000000.1)",
        borderTopWidth: 7,
        marginTop: 30,
        width: 335,
        height:60,
        marginBottom: 0,
     
        fontSize: 12,
        height:70,
        paddingBottom: 10
      }, innerresbb:{
        flex:8,
        borderRadius:20
      }, addreview:{
        flex:1,
       marginLeft: 109,
        marginTop: 15,
        height: 30
      },
      input:{
        width: WIDTH-45,
        height: 75,
        fontSize: 16,
        color: 'rgba(245, 245, 245, 0.993)',
        backgroundColor:  'rgba(0,0,0,0.45)',
        height: 60,
        paddingLeft: 45,
        borderRadius:30,
        marginHorizontal: 9
      },addreviewbutton:{
        height: 30
      }, sectiontwo: {
        marginBottom:10,
        borderTopColor: "rgba(0,0,0,0.1)",
        borderTopWidth: 0,
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 3,
      }, spacing:{
        marginTop:10, 
        flexDirection:"row",
      }, innerresr:{
        flexDirection: "row",
        width: 260,
        height:40,
        marginHorizontal: 40,
       
      }, innerresq:{
        flexDirection: "row",
        width: 260,
        height:30,
        borderBottomColor: "rgba(1,1,1,00000000000000.1)",
        borderBottomWidth: 1,
        marginHorizontal: 40,
      }
  });
  
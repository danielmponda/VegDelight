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
    Image,
    TouchableWithoutFeedback,
    ScrollView,
  } from 'react-native';
  import firebase from 'react-native-firebase';
  import Icon from 'react-native-vector-icons/Ionicons'
  
// Importing Images 
  import bgImage from './images/background.jpg' 

  const {width: WIDTH} = Dimensions.get('window');

// Initializing a class
export default class adminaddReorder extends Component  {

    // Initializing Constructor
    constructor(props) {
        super(props)

        // Initializing properties 
        this.state = {
          currentUserId: firebase.auth().currentUser.uid,
          itemId:"",
          itemName:"",
          Price:"",
          Category:"",
          Description: "",
        
       
        }
    }

    // Method of update food item
    adminupdatefooditem=(item)=>{
      // this.props.navigation.setParams({ name: item })
      this.props.navigation.navigate('adminupdatefooditem', {itemId: item});
    }


  // Self call Method 
    componentDidMount() {
      
      // Capturing itemId from menu / display items 
      const { itemId } = this.props.navigation.state.params;
        
      // connecting to database 
      const db = firebase.firestore();
      db.settings({timestampsInSnapshots: true})

      // captuing from the collection of foodItem
      const foodItem = db.collection("foodItem").doc(itemId)
      foodItem.get()
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
}

  render(){
    return ( 
      // Interface 
      <ImageBackground   source={bgImage} style={styles.ImageBackgroundCon}>
                <ScrollView>

         {/* Body Container */}
       <View style={styles.container}> 
       <StatusBar backgroundColor='black'barStyle="light-content"/>

        {/* Cover Image */}
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


        {/* Item Detials */}
        <View style={styles.fieldContainer}>
        <View style={styles.sectionone}>
        <View style={styles.holder}>

               {/* Item Name */}
              <View style={[styles.innerres,styles.innerrat]}>
              <Icon style={styles.innerresa} name={'md-restaurant'} size={28} color={'rgba(0,0,0,0.45)'}/> 
              <Text style={styles.innerresb} > {this.state.itemName}</Text>
              </View>

               {/* Item Price */}
              <View style={styles.innerres}>
              <Icon style={styles.innerresa} name={'md-pricetags'} size={28} color={'rgba(0,0,0,0.45)'}/> 
              <Text style={styles.innerresb} > k {this.state.Price} </Text>
              </View>

               {/* Item Category */}
              <View style={styles.innerres}>
              <Icon style={styles.innerresa} name={'md-list'} size={28} color={'rgba(0,0,0,0.45)'}/> 
              <Text style={styles.innerresb} > {this.state.Category} </Text>
              </View>

              {/* Item Description */}
              <View style={[styles.innerres,styles.innerrend]}>
              <Icon style={styles.innerresa} name={'md-information-circle-outline'} size={28} color={'rgba(0,0,0,0.45)'}/> 
              <Text numberOfLines={5}style={styles.innerresb} > {this.state.Description} </Text>
              </View>

              </View>                   
                  </View>

                           {/* Update Button */}
                          <TouchableOpacity style={styles.btnLogin}
                              onPress={ this.adminupdatefooditem.bind(this, this.state.itemId) }
                              >
                              <Text style={styles.btnText}>Update</Text>
                          </TouchableOpacity>


                          </View>
            
    </View>
    </ScrollView>
      </ImageBackground>
    );
  }
}

// StyleSheet
const styles = StyleSheet.create({
    ImageBackgroundCon: {
      flex: 1,
      justifyContent: 'center',
      width: null,
      height: null,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding:0,
    },
    coverPhoto:{
        width: WIDTH,
        height: WIDTH * (9/13),
        marginBottom: 2,
        padding: 0,
      },  
    fieldContainer: {
      flex:6,
      marginTop: 10,
      elevation:1,
      justifyContent: 'center',
    },
    input:{
      width: WIDTH - 36,
      height: 45,
      fontSize: 16,
      color: 'rgba(245, 245, 245, 0.993)',
      backgroundColor:  'rgba(0,0,0,0.45)',
      marginHorizontal: 20,
      height: 40,
      paddingLeft: 45,
      borderRadius: 25,
      marginBottom: 10
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
      }
  });
  
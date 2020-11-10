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
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
  } from 'react-native';

  import coverPhoto from './images/astronomy-rdolomites-evening-1624496.jpg'
  import firebase from 'react-native-firebase';
  import ImagePicker from 'react-native-image-crop-picker'
  import bgImage from './images/background.jpg' 
  import Icon from 'react-native-vector-icons/Ionicons'

  const {width: WIDTH} = Dimensions.get('window');

// Initializing a class 
export default class adminaddfoodItem extends Component  {

  // Initializing Constructor

    constructor(props) {
        super(props)

        // Properties  
        this.state = {
          currentUserId: firebase.auth().currentUser.uid,
          itemId: "",
          descrip: "",
          price: "",
          itemName: "",
          loading: false
        }
    }

    // Method of adding items 
    handleaddItem = () => {

      // connecting to the database 
        const db = firebase.firestore();
        const addItem = db.collection("foodItem").doc()
        
        // inserting data 
        addItem.set({
            itemName: this.state.itemName,
            Price: this.state.Price,
            Category:  this.state.Category,
            Description: this.state.Description,
        }). then( () => {
       
        // capturing addItem docID 
          addItem.onSnapshot(docSnapshot => {
            this.setState({docID: docSnapshot.id,})
          }); 

          // function of opening image gallery 
          this.setState({ loading: true })  
          ImagePicker.openPicker({
            width: 300,
            height: 300, 
            cropping: true,
            mediaType: 'photo'
          }).then(image => {
            const storage = firebase.storage()
            const  mReh=storage.ref('meals').child(this.state.docID+'.jpg')
            mReh.putFile(image.path, {contentType: image.type})
            .then((snapshot) => {
              mReh.getDownloadURL().then(url => {
                addItem.set({
                  urll: url,
                  itemName: this.state.itemName,
                  Price: this.state.Price,
                  Category:  this.state.Category,
                  Description: this.state.Description,
              })
              this.setState({ loading: false })
              if(mReh){
                this.props.navigation.goBack();
                  alert("item sucessfully added"); 
             }
              })
            }).catch(failureCb)
          })
        }
      )
    }

  // Methods of assigning a value from an input field to a property 

  handleSetitemNameLocalState = (itemName) => {
    this.setState({
        itemName,
    });
  }

  handleSetPriceLocalState = (Price) => {
    this.setState({
      Price,
    });
  }

  handleSetCategorysLocalState = (Category) => {
    this.setState({
      Category,
    });
  }

  handleSetDescriptionLocalState = (Description) => {
    this.setState({
      Description,
    });
  }

  render(){

    return ( 

      // Interface 
      <ImageBackground   source={bgImage} style={styles.ImageBackgroundCon}>
        <ScrollView>

     {/* Body Container */}
          <View style={styles.container}> 
            <StatusBar backgroundColor='black' barStyle="light-content"/>

            {/* Cover Image */}
              <View style={styles.cover}>
                  <TouchableWithoutFeedback>
                    <Image  style={styles.coverPhoto} source={coverPhoto} />
                  </TouchableWithoutFeedback>
              </View>

              {/* Input Fields */}
              <View style={styles.postionabs}>
              <View style={styles.sectionone}>
              <View style={styles.holder}>

                    {/* Item Name  Input Fields */}
                    <View style={styles.innerres}>
                    <Icon style={styles.innerresa} name={'md-home'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                    <View style={styles.innerresb}>
                    <TextInput
                                        style={styles.input}
                                        // defaultValue={this.state.value}
                                        onChangeText={this.handleSetitemNameLocalState} 
                                        placeholder="Item Name"
                                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                                        underlineColorAndroid='transparent'                
                                        defaultValue={this.state.itemName}
                                      
                                    />
                    </View>
                    </View>

                     {/* Price  Input Fields */}
                    <View style={styles.innerres}>
                    <Icon style={styles.innerresa} name={'md-pricetags'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                    <View style={styles.innerresb}>
                    <TextInput
                                        style={styles.input}
                                        // defaultValue={this.state.value}
                                        // placeholder={this.state.Price.toString()}
                                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                                        underlineColorAndroid='transparent'         
                                        onChangeText={this.handleSetPriceLocalState}  
                                        placeholder="Price"
                                  />
                    </View>
                    </View>

                     {/* Category  Input Fields */}
                    <View style={styles.innerres}>
                    <Icon style={styles.innerresa} name={'md-list'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                    <View style={styles.innerresb}>
                    <TextInput
                                        style={styles.input}
                                        // defaultValue={this.state.value}
                                        onChangeText={this.handleSetCategoryLocalState}
                                        placeholder="Category"
                                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                                        underlineColorAndroid='transparent'
                                        onChangeText={this.handleSetCategoryLocalState} 
                                        defaultValue={this.state.Category}
                                        onChangeText={this.handleSetCategorysLocalState} 
                                    />
                    </View>
                    </View>

                     {/* Description  Input Fields */}
                    <View style={[styles.innerres,styles.textArea]}>
                    <Icon style={styles.innerresa} name={'md-information-circle'} size={28} color={'rgba(0,0,0,0.45)'}/> 
                    <View style={styles.innerresb}>
                    <TextInput    
                                        style={[styles.input,styles.textArea]}
                                        // defaultValue={this.state.value}
                                        // onChangeText={this.handleSetFirstNameLocalState}
                                      
                                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                                        underlineColorAndroid='transparent'
                                        // onChangeText={this.handleSetAdressLocalState} 
                                        // defaultValue={this.state.address}
                                        numberOfLine={7}
                                        multiline={true}
                                  
                                        placeholder="Description..."
                                        defaultValue={this.state.Description}
                                        onChangeText={this.handleSetDescriptionLocalState}
                                        
                                      
                                    />
                    </View>

                    </View>

</View> 
</View>

           {/* Add Button */}
          <View style={styles.logoutsec}>
                    <TouchableOpacity style={styles.btnLoginh}
                              onPress={this.handleaddItem}
                            >
                          <Text style={styles.btnTexth}>Add </Text>
                      </TouchableOpacity>
                </View>
          
                  
           


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
      alignItems: "center",
      height: WIDTH * (9/5.2),
    },
      coverPhoto:{
        width: WIDTH,
        height: WIDTH * (9/16),
        marginBottom: -70,
     
      
          borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2,
      },  
    fieldContainer: {
      flex:6,
      marginTop: 10,
      elevation:1,
      justifyContent: 'center',
    },
    // input:{
    //   width: WIDTH - 36,
    //   height: 45,
    //   fontSize: 16,
    //   color: 'rgba(245, 245, 245, 0.993)',
    //   backgroundColor:  'rgba(0,0,0,0.45)',
    //   marginHorizontal: 20,
    //   height: 50,
    //   paddingLeft: 45,
    //   borderRadius: 15,
    //   marginBottom: 10
    // },
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
        width: WIDTH - 38,
      height: 45,
      borderRadius: 15,
      backgroundColor: '#561a1a',
      marginHorizontal: 22,
      marginTop: 0,
      justifyContent: 'center',
      marginBottom: 15
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
    }, 
    button:{
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
    inputdes:{
      width: WIDTH - 36,
      height: 95,
      fontSize: 16,
      color: 'rgba(245, 245, 245, 0.993)',
      backgroundColor:  'rgba(0,0,0,0.45)',
      marginHorizontal: 20,
      paddingLeft: 45,
      borderRadius: 25,
      marginBottom: 10
    },
    sectionone:{
      marginBottom: 10,
      backgroundColor:  'rgba(0,0,0,0.1)',
      borderBottomColor: "rgba(1,1,1,00000000000000.1)",
      borderBottomWidth: 30,
      width: WIDTH - 40,
      height: WIDTH * (9/13),
      borderRadius: 30,
    }, holder:{
      marginLeft: 20,
      marginTop: 6
    },innerres:{
      flexDirection: "row",
      width: 250,
      height:40,
      borderBottomColor: "rgba(1,1,1,00000000000000.1)",
      borderBottomWidth: 7,
      marginBottom:3
    },innerresa:{
      flex: 1,
      width: 30,
      marginBottom: -10
    },innerresb:{
      flex: 6,
      width: 100,
      marginTop:-2,
      height:40
    }, input :{
      height:40,
      marginTop: 0,
      color: 'rgba(0,0,0,0.5)'
  } ,  textArea:{
    fontSize: 14,
      height:90,
      borderBottomColor: "rgba(0,0,0,0.0)",
      borderBottomWidth: 7,
  },
  logoutsec:{
    width: WIDTH,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: -18,
    marginTop: 20,
  },
  btnLoginh:{
    width: WIDTH - 80,
    height: 35,
    borderRadius: 12,
    backgroundColor:  'rgba(0,0,0,0.1)',
    marginHorizontal: 40,
    marginTop: 0,
    justifyContent: 'center',
  }, postionabs:{
    position:"absolute",
    top:210,
    left:21
  },
  btnTexth: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)'
  }
  });
  

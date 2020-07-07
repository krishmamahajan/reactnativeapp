import React, { useState, useEffect} from 'react';
import { View, Text, Picker, StyleSheet , Image, AsyncStorage} from 'react-native'
import axios from "axios";
import {Body, Header, Icon, Left, Right} from 'native-base';
import { Actions } from "react-native-router-flux";

export default function Studentprofile() {
 

  let [student, setStudent] = useState([]);
  const [name, setName] = useState();
  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
 
})

  useEffect(() => {


   
    getUser(name);
  }, []);

  const logout = () =>{
 
    AsyncStorage.removeItem("user")
          .then(() => alert('success'));
    Actions.login()
  }
  
    const getdata = () =>{
      console.log("Hi");
   axios
        .post(
          "http://krishma.webcodice.com/react-native/axios.php",
          {
            request: 18,
            
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
  }
  
  
    const getUser = (name) => {

      
    if(name == ''){
      alert("No Name")
    }else{
      alert("Name is"+name)
    }
        // alert(name);
      axios
        .post(
          "http://krishma.webcodice.com/react-native/axios.php",
          {
            request: 12,
            username:name,
          }
        )
        .then((response) => {
          setStudent(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
   
      return (
        
         <View style={styles.main}>
              <Header>
                    <Left>

                    <Icon ios='ios-menu' android="md-menu" 
                    style={{fontSize: 30, color:'#fff'}}
                    onPress={() => Actions.drawer()}/>
                    </Left>
                    <Body>
                        <Text style={{ color: '#fff'}}>Student Screen</Text>
                        
                    </Body>
                    <Right>
                    <Text style={{textAlign:'right', color: '#fff'}} onPress={logout}>LOG OUT</Text>


                    </Right>
                    
                </Header>
            <Text style = {styles.text}>Student profile</Text>
            {student.map((x) => (
              <View style={{alignItems:"center"}} key={x.id}  >
              <Image
              style={{width:60,height:60,borderRadius:30}}
              source={x.image?{uri: x.image}:{uri: 'https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png'}}
              
              />
    
            <Text>Student Name: {x.name}</Text>
            <Text> Father Name: {x.father_name}</Text>
            </View>
        ))}
                    <Text>Student Name:  {name== ''?'noname':name}</Text>
<Text onPress={getdata}>View Scan data</Text>
         </View>
      )
   }



const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   main:{
     flex:1,
     textAlign:'center',
    alignContent:'center'
   },
  
})
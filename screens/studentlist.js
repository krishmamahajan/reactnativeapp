import React, { useState, useEffect} from "react";
import { View, Picker, StyleSheet, Text, AsyncStorage, Image} from "react-native";
import { Button, Title, Card } from "react-native-paper";
import QRCode from 'react-qr-code';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";
import {Body, Header, Icon, Left, Right
} from 'native-base';
import axios from "axios";

export default function studentlist() {


    let [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 10,
        }
      )
      .then((response) => {
        setStudents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [name, setName] = useState('');
  
  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
})



const logout = () =>{
  AsyncStorage.setItem("user", '' );
  Actions.login()
}

  return (
    <View style={styles.container}>


<Header>
      <Left>



<Icon ios='ios-menu' android="md-menu" style={{fontSize: 30, color:'#fff'}}/>

</Left>
<Body>
    <Text style={{textAlign:'center', color:'#fff'}}>Teacher Screen</Text>
    
</Body>
<Right>
<Text style={{textAlign:'right', color:'#fff'}} onPress={logout}>LOG OUT</Text>

</Right>

      </Header>
  

  <Text style={styles.welcome}>
      <Text >Welcome</Text>
      <Text> {name} </Text>
      </Text>


<View style={styles.content}>

<Title style={styles.welcome}>List of Students</Title>
{students.map((x) => (
    <Card style={styles.mycard}
    key={x.id}     >
    <View style={styles.cardView}>
        
         <Image
        style={{width:60,height:60,borderRadius:30}}
        source={x.image?{uri: x.image}:{uri: 'https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png'}}
        
        />
        <View style={{marginLeft:10}}> 
            <Text style={styles.text}>{x.username}</Text>   
             <Text style={styles.textstyle}>{x.email}</Text>  
             <Text style={styles.textstyle}>{x.phone_no}</Text>     
        </View>
   
    </View>
    
   </Card>
        ))}
  </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 40,
    
  },
  button: {
    width: '60%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#006aff',
    marginBottom: 20,
  },
  mycard:{
    margin:5,
   
},
cardView:{
     flexDirection:"row",
     padding:6
},
text:{
    fontSize:18,
},
textstyle:{
    fontSize:14,
},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight:'bold'
  }
});
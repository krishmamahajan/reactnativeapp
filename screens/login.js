import React, { Component, useState } from 'react';
import { Button , TextInput} from 'react-native-paper';

import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { Actions } from 'react-native-router-flux';
import * as axios from 'axios';

class login extends React.Component {
constructor(props) {
        super(props);

        this.state ={
            username: '', password: ''
             
        }
        
    }
  
onPress = () => {
  if(this.state.username == '' )
  {
    alert("Please Enter Name.")
  }else if(this.state.password == '' )
  {
    alert("Please Enter Password.")
  } 
 else if(this.state.username == '' || this.state.password == '' )
  {
    alert("All fields are required to fill.")
  } 
  else if(this.state.username != '' || this.state.password != '' ){

    axios.post('http://krishma.webcodice.com/react-native/axios.php', {
      request: 6,
      username:this.state.username,
      password:this.state.password
    })
    .then(function (response) {
     
      if(response.data == 'User not valid'){
        Actions.login();
      }else{
        if(response.data['0'].role == 'teacher')
        {
          AsyncStorage.setItem("user", response.data['0'].username );

          Actions.teacher();

        }else if(response.data['0'].role == 'student') {
          AsyncStorage.setItem("user", response.data['0'].username );
          Actions.student();
        }else if(response.data['0'].role == 'admin'){
          AsyncStorage.setItem("user", response.data['0'].username );
          Actions.admin();
        }
        // alert(response.data['0'].role);
        // console.log(response.data);
        // Actions.qrscanner();
      }
      

    })
    .catch(function (error) {
      console.log(error);
    });
 

   
// alert("Hi " +this.state.username)
// Actions.qrscanner();
  }
          
     }
  render() {
    return (
     
        <View style={styles.container}>
        <Text style={styles.welcome}>Login </Text>
        <TextInput
        style={styles.inputstyle}
        label="Username"
        mode="outlined"
        secureTextEntry={false}
        theme={mytheme}
 onChangeText={(text) => this.setState({username: text})}      />
    
        <TextInput
        style={styles.inputstyle}
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        theme={mytheme}
         onChangeText={(text) => this.setState({password: text})}
      />
    
        <Button mode="contained"
           style={styles.inputstyle}
           theme={mytheme}
           onPress={this.onPress} 
         >
Log In
  </Button>
        {/* <Text
          style={styles.mytext}
         onPress={()=>{
          // Add your logic for the transition
          this.props.navigation.navigate('register') // what to push here?
      }}>Register</Text> */}
      {/* <Text 
      style={styles.mytext}
      onPress={()=>{
          // Add your logic for the transition
          this.props.navigation.navigate('select') // what to push here?
      }}>Generate QR Code</Text> */}
      </View>
 
    );
  }
  }


const mytheme = {
  colors: {
    primary: '#05c5f5',
  },
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
  justifyContent:'center',
  backgroundColor:'#f0f8ff'
 
  },
  mytext:{
    fontSize: 18,
textAlign: 'center',
margin: 5,
  },
  inputstyle: {
    margin: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
export default login;
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Picker
} from "react-native";
import {Body, Header, Icon, Left, Right
} from 'native-base';
import { TextInput, Title, Button 
} from 'react-native-paper';
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default function Addclass() {
  const [class_name, setClass_name] = useState("");
  const [section, setSection] = useState("");
  const [batch, setBatch] = useState("");
  const [subject_code, setSubject_code] = useState("");
  const logout = () =>{
 
    AsyncStorage.removeItem("user")
          .then(() => alert('success'));
    Actions.login()
  }

  const handleSubmit = () => {
      
      if(class_name == '' || section == '' || batch == '' || subject_code == '' ){
      alert("Please Fill all class Fields")
      }else{

          axios
            .post(
              "http://krishma.webcodice.com/react-native/axios.php",
              {
                request: 9,
                class_name: class_name,
                section: section,
                batch: batch,
                subject_code: subject_code,
              
              }
            )
            .then((response) => {
              alert(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        };

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
     <SafeAreaView style={styles.content} >
      
      <ScrollView style={styles.scroll}>
        <Title style={styles.welcome}>Add Class👨‍🎓</Title>
        
        <TextInput
          style={styles.inputstyle}
          label="Class Name"
          value={class_name}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setClass_name(e)}
        />
        {/* <TextInput
          style={styles.inputstyle}
          label="Section"
          value={section}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setSection(e)}
        /> */}
         <Text style={styles.labelstyle}>Select Section: </Text>
        <Picker  style={styles.pickerstyle} 
          theme={mytheme}
          selectedValue = {section} 
          onValueChange = {(itemValue)=>setSection(itemValue)}>
          <Picker.Item label = 'Select Section' value = 'Section'  />
          <Picker.Item label = 'A' value = 'A'  />
          <Picker.Item label = 'B' value = 'B'  />
          <Picker.Item label = 'C' value = 'C'  />
          <Picker.Item label = 'D' value = 'D'  />
          <Picker.Item label = 'E' value = 'E'  />

          </Picker>
       
        <TextInput
          style={styles.inputstyle}
          label="Batch"
          value={batch}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setBatch(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Subject Code"
          value={subject_code}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setSubject_code(e)}
        />
        
        <Button mode="contained" 
        style={styles.inputstyle}
        theme={mytheme}
        onPress={handleSubmit}>
        Add Class
      </Button>
      
      </ScrollView>
    </SafeAreaView>
    </View>
  );
}

const mytheme = {
    colors: {
      primary: '#05c5f5',
    },
  };

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent:'center',
    marginHorizontal: 20,
  },
   labelstyle:{
    margin:10, 
    fontSize: 22
  },
   pickerstyle:{
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'black',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  welcome: {
  fontWeight:'bold',
    textAlign: 'center',
    margin: 20,
    padding: 10,
    fontSize:28
  },
  inputstyle: {
    margin: 5,
  },
  
});
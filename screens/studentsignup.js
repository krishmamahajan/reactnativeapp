import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
  AsyncStorage,
  Picker
} from "react-native";
import {Body, Header, Icon, Left, Right,DatePicker
} from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInput, Title, Button, RadioButton } from 'react-native-paper';
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [roll_no, setRoll_no] = useState("");
  const [batch, setBatch] = useState("");
  const [class_name, setClassname] = useState('Class');
  const [section, setSection] = useState("");
  const [registration, setRegistration] = useState("");
  const [father_name, setFather_name] = useState("");
  const [modal, setModal] = useState(false);
  let [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses();

  }, []);

  const getClasses = () => {
    axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 11,
        }
      )
      .then((response) => {
        setClasses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 

    if(name == '' || dob == '' || section == '' || class_name == 'Class' || class_name =='' || batch == '' || roll_no == '' || gender == '' || registration == '' || username == '' || phone_no == '' || picture == '' || email == '' || password == '' || father_name == '' ){
    alert("All Field are required to field");

    }else if(reg.test(email) === false) 
    { 
        alert("Invalid email")
        return false; 
    }else{
    axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 4,
          name: name,
          email: email,
          phone_no: phone_no,
          password: password,
          image: picture,
          username: username,
          gender: gender,
          dob: dob,
          roll_no: roll_no,
          batch: batch,
          class_name: class_name,
          section: section,
          registration: registration,
          father_name: father_name,
        }
      )
      .then((response) => {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };


  const gallerypic = async ()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
         let data =  await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
          if(!data.cancelled){
            let newfile = { uri:data.uri,
             type:`test/${data.uri.split(".")[1]}`,
             name:`test.${data.uri.split(".")[1]}`
           }
             uploadimage(newfile)
           }
  } else {
    Alert.alert('No work');
  }
}
const camerapic = async ()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
    if(granted){
         let data =  await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
    if(!data.cancelled){
     let newfile = { uri:data.uri,
      type:`test/${data.uri.split(".")[1]}`,
      name:`test.${data.uri.split(".")[1]}`
    }
      uploadimage(newfile)
    }
  } else {
    Alert.alert('No work');
  }
}

const uploadimage = (image) =>{
     const data = new FormData()
     data.append('file', image)
     data.append('upload_preset', 'attendanceApp')
     data.append('cloud_name', 'dbvq0lefw')
     fetch("https://api.cloudinary.com/v1_1/dbvq0lefw/image/upload", {
       method:"post",
       body:data
     }).then(res=>res.json()).
     then(data=>{
       console.log(data)
      setPicture(data.url)
      setModal(false)
     })

}


const logout = () =>{
 
  AsyncStorage.removeItem("user")
        .then(() => alert('success'));
  Actions.login()
}

  return (
    <View style={styles.container}>
    <Header>
      <Left>



<Icon ios='ios-menu' android="md-menu" style={{fontSize: 30, color:'#fff'}}/>

</Left>
<Body>
    <Text style={{textAlign:'center', color:'#fff'}}>Admin Screen</Text>
    
</Body>
<Right>
<Text style={{textAlign:'right', color:'#fff'}} onPress={logout}>LOG OUT</Text>

</Right>

      </Header>
    <SafeAreaView style={styles.content}>
      <ScrollView style={styles.scroll}>
        <Title style={styles.welcome}>Add Student👨‍🎓</Title>
        <TextInput
        style={styles.inputstyle}
        label="Name"
        value={name}
        mode="outlined"
        theme={mytheme}
        onChangeText={(text) => setName(text)}

      />
      <TextInput
         style={styles.inputstyle}
         label="Father Name"
         value={father_name}
         mode="outlined"
         theme={mytheme}
          onChangeText={(e) => setFather_name(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Email"
          value={email}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Phone Number"
          value={phone_no}
          mode="outlined"
          theme={mytheme}
          placeholder="Phone Number"
          onChangeText={(e) => setPhone_no(e)}
        />
       
        <TextInput
          style={styles.inputstyle}
          label="Username"
          value={username}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setUsername(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Password"
          value={password}
          mode="outlined"
          theme={mytheme}
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
        
        
         <View style={{flexDirection:"row"}}>
           <Text style={{fontSize:22}}>Gender :</Text>
             <RadioButton
                style={styles.inputstyle}
                label="Gender"
                value={gender}
                mode="outlined"
                value="male"
                theme={mytheme}
                status={gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('male')}

                /><Text style={{fontSize:20, padding:6}}>Male</Text>
                <RadioButton
                style={styles.inputstyle}
                theme={mytheme}
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() =>  setGender('female' ) }
                />
                <Text style={{fontSize:20, padding:6}}>Female</Text>
        </View>
        <DatePicker
        theme={mytheme}
        defaultDate={new Date()}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Date of Birth"
          textStyle={styles.textstyle}
          placeHolderTextStyle={styles.datestyle}
          onDateChange={(dob) =>setDob(dob)}
          disabled={false}
          />
        <TextInput
           style={styles.inputstyle}
           label="Roll no"
           value={roll_no}
           mode="outlined"
           theme={mytheme}
           onChangeText={(e) => setRoll_no(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Batch"
          value={batch}
          mode="outlined"
          theme={mytheme}
          onChangeText={(e) => setBatch(e)}
        />
        <Picker  style={styles.pickerstyle} 
          theme={mytheme}
          selectedValue = {class_name} 
          onValueChange = {(itemValue)=>setClassname(itemValue)}>
          <Picker.Item label = 'Select Class' value = 'Class'  />

        {classes.map((x) => (
        
          <Picker.Item key={x.class_id} label = {x.class_name} value = {x.class_name}  />
            
                ))}
          </Picker>
       
           <Picker  style={styles.pickerstyle} 
          theme={mytheme}
          selectedValue = {section} 
          onValueChange = {(itemValue)=>setSection(itemValue)}>
          <Picker.Item label = 'Select Subject' value = 'Subject'  />
          <Picker.Item label = 'A' value = 'A'  />
          <Picker.Item label = 'B' value = 'B'  />
          <Picker.Item label = 'C' value = 'C'  />
          <Picker.Item label = 'D' value = 'D'  />
          <Picker.Item label = 'E' value = 'E'  />

          </Picker>
        <TextInput
           style={styles.inputstyle}
           label="Registration Number"
           value={registration}
           mode="outlined"
           theme={mytheme}
          onChangeText={(e) => setRegistration(e)}
        />
          <Button
       style={styles.inputstyle}
        icon={picture == ""?"upload":"check"}
        theme={mytheme}
        mode="contained"
        onPress={() => setModal(true)}>
        {picture == ""?"upload Image":"Image Uploaded"}
      </Button>
        
        <Button mode="contained" 
       style={styles.inputstyle}
      theme={mytheme}
      onPress={handleSubmit}>
        Register
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalstyle}>
            <Button
             style={styles.inputstyle}
              icon="content-save"
              mode="contained"
              theme={mytheme}
              onPress={() => gallerypic()}>
              Gallery
            </Button>
            <Button
             style={styles.inputstyle}
              icon="camera"
              theme={mytheme}
              mode="contained"
              onPress={() => camerapic()}>
              Camera
            </Button>
          </View>

          <Button
            mode="contained"
            theme={mytheme}
            onPress={() => setModal(false)}>
            Cancel
          </Button>
        </View>
      </Modal>
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
  textBox: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginTop: 10,
    padding: 10,
  },
  scroll: {
    width: "100%",
  },
  btn: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent:'center',
    marginHorizontal: 20,
  },
  welcome: {
    fontWeight:'bold',
    textAlign: 'center',
    margin: 20,
    padding: 20,
    fontSize:28
  },
  inputstyle: {
    margin: 5,
  },
  modalstyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  textstyle:{
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'grey',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  datestyle: {
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'grey',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  pickerstyle:{
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'grey',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  modalView: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 5,
  },
});
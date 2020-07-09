import React, { useState, useEffect} from "react";
import { View, Picker, StyleSheet, Text, AsyncStorage, Image, TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
  } from "react-native";
import { Button, Title, Card,IconButton,Colors,Modal,TextInput, Portal, Provider, Dialog ,RadioButton} from "react-native-paper";
import QRCode from 'react-qr-code';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";
import {Body, Header, Icon, Left, Right,DatePicker} from 'native-base';
import axios from "axios";

export default function studentlist() {

    let [students, setStudents] = useState([]);
  useEffect(() => {
    getStudents();
     getClasses();
  }, []);
  const [id,setid]=useState('');
  const [name, setstudentname] = useState("");
  const [email, setemail] = useState("");
  const [phone_no, setphone] = useState("");
  const [password, setpass] = useState("");
  const [username, setusername] = useState("");
  const [gender, setgender] = useState('male');
  const [dob, setdob] = useState('');
  const [roll_no, setrollno] = useState("");
  const [batch, setbatch] = useState("");
  const [class_name, setclassname] = useState('Class');
  const [section, setsection] = useState("");
  const [registration, setregistration] = useState("");
  const [father_name, setfather_name] = useState("");
  let [classes, setClasses] = useState([]);
   
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
    const updatedata=()=>{
    alert(`${name}:-user updated `);
axios.post('http://krishma.webcodice.com/react-native/axios.php',{
         request:19,
          id: id,
          name: name,
          email: email,
          phone_no: phone_no,
          password: password,
          username: username,
          gender: gender,
          dob: dob,
          roll_no: roll_no,
          batch: batch,
          class_name: class_name,
          section: section,
          registration: registration,
          father_name: father_name
      })
      .then(response=>{
      getdata();
      hideModal();
      })
      .catch(error=>{
        console.log(error);
      })
  }
const [visible, setVisible] = useState(false);

  const showModal = (id,name,email,phone_no,password,username,gender,dob,roll_no,batch,class_name,section,registration,father_name) => {
    // console.log(pass);
  setid(id)
  setstudentname(name)
  setemail(email)
  setphone(phone_no)
  setpass(password)
  setusername(username)
  setgender(gender)
  setdob(dob)
  setrollno(roll_no)
  setbatch(batch)
  setclassname(class_name)
  setsection(section)
  setregistration(registration)
  setfather_name(father_name)
      setVisible(true);
  }
  const hideModal = () => setVisible(false);
  useEffect(()=>{
    getStudents();
  },[]);
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

  // const [name, setName] = useState('');
  
  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setstudentname(data);
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
    <Text style={{textAlign:'center', color:'#fff'}}>Student List</Text>   
</Body>
<Right>
<Text style={{textAlign:'right', color:'#fff'}} onPress={logout}>LOG OUT</Text>
</Right>
      </Header>
       <SafeAreaView style={styles.content}>
          <ScrollView style={styles.scroll}>
  <Text style={styles.welcome}>
      <Text >Welcome</Text>
      <Text> {name} </Text>
      </Text>
<View style={styles.content}>
<Title style={styles.welcome}>List of Students</Title>
{students.map((x) =>{ 
let {id,name,email,phone_no,password,image,username,gender,dob,roll_no,batch,class_name,section,registration,father_name} = x
  return(

    <Card style={styles.mycard}
    key={id} >
    <View style={styles.cardView}>
        
        </TouchableOpacity> 
        <View style={{marginLeft:10}}> 
           <Text style={styles.text}>{username}</Text>   
             <Text style={styles.textstyle}>{email}</Text>  
             <Text style={styles.textstyle}>{phone_no}</Text>   
         <TouchableOpacity onPress={()=>showModal(id,name,email,phone_no,password,username,gender,dob,roll_no,batch,class_name,section,registration,father_name)}>
       <Image style={{width:60,height:60,borderRadius:30}}
        source={image?{uri: image}:{uri: 'https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png'}}
        />
        </View>
    </View> 
   </Card>
        )
})}
 </ScrollView>
    </SafeAreaView>
  </View>
<Modal className="mod" animationType="slide"
        transparent={false} visible={visible} onDismiss={hideModal}>
     <View style={{ marginTop: 120 }}>
     <SafeAreaView style={styles.content}>
      <ScrollView style={styles.scroll}>
        <Title style={styles.welcome}>Update Student👨‍🎓</Title>
        <TextInput
        style={styles.inputstyle}
        label="Name"
        value={name}
        mode="outlined"
        theme={mytheme}
        onChangeText={e=>setstudentname(e)}
      />
      <TextInput
         style={styles.inputstyle}
         label="Father Name"
         value={father_name}
         mode="outlined"
         theme={mytheme}
          onChangeText={e=>setfather_name(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Email"
          value={email}
          mode="outlined"
          theme={mytheme}
           onChangeText={e=>setemail(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Phone Number"
          value={phone_no}
          mode="outlined"
          theme={mytheme}
          placeholder="Phone Number"
          onChangeText={e=>setphone(e)}
        />
         <TextInput
          style={styles.inputstyle}
          label="Username"
          value={username}
          mode="outlined"
          theme={mytheme}
          onChangeText={e=>setusername(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Password"
          value={password}
          mode="outlined"
          theme={mytheme}
          secureTextEntry={true}
           onChangeText={e=>setpass(e)}
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
                onPress={() => setgender('male')}

                /><Text style={{fontSize:20, padding:6}}>Male</Text>
                <RadioButton
                style={styles.inputstyle}
                theme={mytheme}
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() =>  setgender('female' ) }
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
          onDateChange={(dob) =>setdob(dob)}
          disabled={false}
          />
        <TextInput
           style={styles.inputstyle}
           label="Roll no"
           value={roll_no}
           mode="outlined"
           theme={mytheme}
           onChangeText={e=>setrollno(e)}
        />
        <TextInput
          style={styles.inputstyle}
          label="Batch"
          value={batch}
          mode="outlined"
          theme={mytheme}
          onChangeText={e=>setbatch(e)}
        />
        <Picker  style={styles.pickerstyle} 
          theme={mytheme}
          selectedValue = {class_name} 
          onValueChange = {(itemValue)=>setclassname(itemValue)}>
          <Picker.Item label = 'Select Class' value = 'Class'  />
        {classes.map((x) => (
          <Picker.Item key={x.class_id} label = {x.class_name} value = {x.class_name}  />   
                ))}
          </Picker>
           <Picker  style={styles.pickerstyle} 
          theme={mytheme}
          selectedValue = {section} 
          onValueChange = {(itemValue)=>setsection(itemValue)}>
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
           onChangeText={e=>setregistration(e)}
        />       
        <Button mode="contained" 
       style={styles.inputstyle}
      theme={mytheme}
      onPress={()=>updatedata()} title='update'>
        Update
      </Button>
      <Button mode="contained" 
       style={styles.inputstyle}
      theme={mytheme}
     onPress={hideModal}  title='cancel'>
        Cancel
      </Button>
      </ScrollView>
    </SafeAreaView>
       </View>
        </Modal>
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
  },
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
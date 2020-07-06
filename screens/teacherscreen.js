import React, {  useState } from 'react';
import {View, Text, StyleSheet,AsyncStorage, TouchableOpacity} from 'react-native';
import {Body, Header, Icon, Left, Right, Button, Card} from 'native-base';
//import { Card } from 'react-native-paper';

 import { Actions } from 'react-native-router-flux';
 
 
const Teacherscreen = (props)=> {

  const [name, setName] = useState('');
  
  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
})


const logout = () =>{
 
  AsyncStorage.removeItem("user")
        .then(() => alert('success'));
  Actions.login()
}

  return (
    
    <View style={styles.container}>
       
       
    <Header>
                    <Left>


                    <Button transparent onPress={() => alert("Drawer Menu")}>
<Icon name='menu' />
</Button>
                        {/* <Icon name="menu"  ios='ios-menu' android="md-menu" style={{fontSize: 30, color:'#fff'}} onPress={() => alert("Hii")}/> */}
                    </Left>
                    <Body>
                        <Text style={{textAlign:'right', color:'#fff'}}>Teacher Screen</Text>
                        
                    </Body>
                    <Right>
                    <Icon name="log-out" 
                     ios='ios-log-out' android="md-log-out"
                    onPress={logout} 
                    style={{fontSize: 30, color:'#fff'}}/>

                    </Right>
                    
                </Header>
<View style={styles.content}>
      <Text style={styles.welcome}>Teacher screen!</Text>
      <Text style={styles.welcome}>
      <Text >Welcome</Text>
      <Text> {name} </Text>
      </Text>
      
      <Text>Teacher Screen</Text>
      <View style={{flexDirection:"row", margin:10}}>
      <Text style={styles.textstyle} onPress={()=> Actions.select()}>
      <Icon name="qr-scanner"  ios='ios-qr-scanner' android="md-qr-scanner" 
      style={{fontSize: 30,}} />
        &nbsp;&nbsp;
        Generate QR</Text>

     

      <Text style={styles.textstyle} onPress={()=> Actions.studentlist()}>
      <Icon
      name="paper"  ios='ios-paper' android="md-paper" style={{fontSize: 30}} />
       &nbsp;&nbsp;
      View Students</Text>


      </View>


   </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },

content: {
  flex: 1,
 
  backgroundColor: '#F5FCFF',
},
cardView:{
   flexDirection:"row",
   padding:5
  },
  textstyle: {
 fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderRadius:5,
    borderColor:"#333",
    borderWidth:1,
    padding:"2%"
    
  }
});
export default Teacherscreen;


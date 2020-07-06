

import React, {  useState } from 'react';
import {View, Text, StyleSheet,AsyncStorage} from 'react-native';
import {Body, Header, Icon, Left, Right, Button} from 'native-base';

 import { Actions } from 'react-native-router-flux';
 
 
const Qrscanner = (props)=> {

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


                    <Button transparent onPress={() => Actions.drawer()}>
<Icon name='menu' />
</Button>
                        {/* <Icon name="menu"  ios='ios-menu' android="md-menu" style={{fontSize: 30, color:'#fff'}} onPress={() => alert("Hii")}/> */}
                    </Left>
                    <Body>
                        <Text>HomeScreen</Text>
                        
                    </Body>
                    <Right>
                    <Icon
                    onPress={() => Actions.qrscan()}
                    name="qr-scanner"  ios='ios-qr-scanner' android="md-qr-scanner" style={{fontSize: 30, color:'#fff'}} />



                    </Right>
                    
                </Header>

      <Text style={styles.welcome}>Student Qrscanner screen!</Text>
      <Text style={styles.welcome}>
      <Text >Welcome</Text>
      <Text> {name} </Text>
      </Text>
      <Text style={{textAlign:'right'}} onPress={logout}>LOG OUT</Text>
      <Text>Student Screen</Text>
      
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
  }
});
export default Qrscanner;


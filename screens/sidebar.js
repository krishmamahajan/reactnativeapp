

import React, {  useState } from 'react';
import {View, StyleSheet,AsyncStorage} from 'react-native';
import {Body, Header, Icon, Left, Right, Text} from 'native-base';
import {  Button } from 'react-native-paper';
 import { Actions } from 'react-native-router-flux';
 
 
const Head = (props)=> {

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

                    <Icon ios='ios-menu' android="md-menu" 
                    style={{fontSize: 30, color:'#fff'}}
                    onPress={() => Actions.drawer()}/>


                        {/* <Icon name="menu"  ios='ios-menu' android="md-menu" style={{fontSize: 30, color:'#fff'}} onPress={() => alert("Hii")}/> */}
                    </Left>
                    <Body>
                        <Text style={{ color: '#fff'}}>Student Screen</Text>
                        
                    </Body>
                    <Right>
                    <Text style={{textAlign:'right', color: '#fff'}} onPress={logout}>LOG OUT</Text>


                    </Right>
                    
                </Header>
                
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
  
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
  marginHorizontal:20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  }
});
export default Head;


import React, { Component } from 'react';

import { Title } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { Platform, StyleSheet, Text, View, Linking } from 'react-native';

class Home extends React.Component {
  componentDidMount(){
      // Start counting when the page is loaded
      this.timeoutHandle = setTimeout(()=>{
          // Add your logic for the transition
          this.props.navigation.navigate('login') // what to push here?
      }, 3000);
  }

  componentWillUnmount(){
      clearTimeout(this.timeoutHandle); 
  }
render() {
  return (
    <View style={styles.container}>
    <View style={{flex:2, justifyContent: 'center', alignItems:'center'}}>
      <Title>WELCOME TO OUR</Title>
      <Text style={styles.paragraph}>
      <Text style={{color:"#333"}}>
       ATTENDANCE APP</Text>
      </Text>
      
      </View>
     <View>
     <Text style={{textAlign:"center"}}>Design & Develop by <Text style={{color:"#025098"}} onPress={ ()=> Linking.openURL('https://google.com') }>Webcodice</Text>
     
     </Text>
     
     </View>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default Home;
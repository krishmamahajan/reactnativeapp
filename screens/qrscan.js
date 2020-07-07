import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import { Actions } from 'react-native-router-flux';

export default function qrscan()  {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [name, setName] = useState('');
 AsyncStorage.getItem('user').then((data) => {
    // let user = data;
    setName(data);
  });


  useEffect(() => {
  

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);




  const hidescanner = () =>{
    setScanned(false);
    Actions.student();
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    axios.post('http://krishma.webcodice.com/react-native/axios.php', {
          request: 17,
          data: data,
         name: name,
        })
        .then(function (response) {
      
          alert(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    // alert(`Bar code with type ${type} of user : ${name} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
 flex: 1}}>
     
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}
       
        
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} >
        <Text onPress={hidescanner} style={styles.textstyle}>Cancel</Text>
        </View>
        </BarCodeScanner>

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
  textstyle:{
     color:"#fff",
     textAlign:"center",
    fontSize:24,
   marginTop:"50%"
  }
});


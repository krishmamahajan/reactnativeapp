import React, { useState, useEffect } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Button, Title } from 'react-native-paper';
import QRCode from 'react-qr-code';
import { Actions } from 'react-native-router-flux';
import { Body, Header, Icon, Left, Right, DatePicker } from 'native-base';
import Loader from './loader';
import axios from 'axios';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function qrgenerater() {
  const [showDate, setDate] = useState(false);

  // const value = '';
  const mode = 'datetime';
  const displayFormat = 'DD/MM/YYYY hh:mm:ss';

  let [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [value, setDatetime] = useState('');
  const [class_name, setClassname] = useState('Class');
  const [subject, setSubject] = useState('Subject');
  const [section, setSection] = useState('Section');
  // const [showdate, showDate] = useState(false);
  AsyncStorage.getItem('user').then((data) => {
    // let user = data;
    setName(data);
  });

  let [classes, setClasses] = useState([]);
  let [subjects, setSubjects] = useState([]);
  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  const getClasses = () => {
    axios
      .post('http://krishma.webcodice.com/react-native/axios.php', {
        request: 11,
      })
      .then((response) => {
        setClasses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubjects = () => {
    axios
      .post('http://krishma.webcodice.com/react-native/axios.php', {
        request: 14,
      })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showDateTimePicker = () => {
    //alert('showDateTimePicker');
    setDate(true);

    // Keyboard.dismiss();
  };

  const hideDateTimePicker = () => {
    setDate(false);
  };

  const handleDatePicked = (value) => {
    setDatetime(value);
    hideDateTimePicker();
  };

  if ({ name } == '') {
    Actions.login();
  }

  const logout = () => {
    AsyncStorage.setItem('user', '');
    Actions.login();
  };

  const submit = () => {
    setLoading(true);
    if (class_name == '' || class_name == 'Class') {
      Alert.alert('PLease Select Class');
      setLoading(false);
    } else if (subject == '' || subject == 'Subject') {
      Alert.alert('PLease Select Subject');
      setLoading(false);
    } else if (section == '' || section == 'Section') {
      Alert.alert('PLease Select Setion');
      setLoading(false);
    } else if (value == '') {
      Alert.alert('PLease Select Date');
      setLoading(false);
    } else {
      axios
        .post('http://krishma.webcodice.com/react-native/axios.php', {
          request: 15,
          teacher: name,
          class_name: class_name,
          section: section,
          subject: subject,
          date_time: value,
        })
        .then(function (response) {
          setLoading(false);
          alert(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // Alert.alert(`Class : ${class_name} Subject : ${subject} Date: ${value}` );
    }
  };

  return (
    <View style={styles.container}>
      <Header>
        <Left>
          <Icon
            ios="ios-menu"
            android="md-menu"
            style={{ fontSize: 30, color: '#fff' }}
          />
        </Left>
        <Body>
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            Teacher Screen
          </Text>
        </Body>
        <Right>
          <Text style={{ textAlign: 'right', color: '#fff' }} onPress={logout}>
            LOG OUT
          </Text>
        </Right>
      </Header>
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.welcome}>
            <Text>Welcome</Text>
            <Text> {name} </Text>
          </Text>
          <Loader loading={loading} />

          <View style={styles.content}>
            <Title style={{ alignItems: 'center', margin: 10, fontSize: 24 }}>
              Generate QR Code
            </Title>
            <View style={{ alignItems: 'center' }}>
              <QRCode value={name + class_name + section + subject + value} />
            </View>

            <Text style={styles.labelstyle}>Select Class: </Text>
            <Picker
              style={styles.pickerstyle}
              theme={mytheme}
              selectedValue={class_name}
              onValueChange={(itemValue) => setClassname(itemValue)}>
              <Picker.Item label="Select Class" value="Class" />

              {classes.map((x) => (
                <Picker.Item
                  key={x.class_id}
                  label={x.class_name}
                  value={x.class_name}
                />
              ))}
            </Picker>
            <Text style={styles.labelstyle}>Select Section: </Text>
            <Picker
              style={styles.pickerstyle}
              theme={mytheme}
              selectedValue={section}
              onValueChange={(itemValue) => setSection(itemValue)}>
              <Picker.Item label="Select Section" value="Section" />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="E" value="E" />
            </Picker>
            <Text style={styles.labelstyle}>Select Subject: </Text>
            <Picker
              style={styles.pickerstyle}
              theme={mytheme}
              selectedValue={subject}
              onValueChange={(itemValue) => setSubject(itemValue)}>
              <Picker.Item label="Select Subject" value="Subject" />

              {subjects.map((x) => (
                <Picker.Item
                  key={x.subject_id}
                  label={x.subject_name}
                  value={x.subject_name}
                />
              ))}
            </Picker>
            <Text style={styles.labelstyle} theme={mytheme}>
              Select Date:{' '}
            </Text>
            <Text
              style={styles.textstyle}
              onPress={() => showDateTimePicker()}
              theme={mytheme}>
              {value ? moment(value).format(displayFormat) : 'Select Date'}
            </Text>
            <DateTimePicker
              date={value ? new Date(value) : new Date()}
              theme={mytheme}
              isVisible={showDate}
              mode={mode}
              onConfirm={handleDatePicked}
              onCancel={() => hideDateTimePicker()}
            />
            <View style={{ alignItems: 'center' }}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => submit()}>
                Generate QR
              </Button>
            </View>
          </View>
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
  pickerstyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    color: 'grey',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
  },
  scroll: {
    width: '100%',
  },
  labelstyle: {
    margin: 10,
    fontSize: 22,
  },
  button: {
    width: '60%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#006aff',
    marginBottom: 20,
    alignItems: 'center',
  },
  textstyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    color: 'grey',
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});

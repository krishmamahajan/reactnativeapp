import React from 'react'
import {  StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import Home from './screens/home.js'
import Login from './screens/login.js'
import Register from './screens/register.js'
import Qrscanner from './screens/Qrscanner.js'
import Qrgenerator from './screens/select.js'
import Drawermenu from './screens/sidebar.js'
import Studentsignup from './screens/studentsignup.js'
import Addclass from './screens/addclass'
import Qrscan from './screens/qrscan.js'
import Studentscreen from './screens/studentscreen.js'
import Teacherscreen from './screens/teacherscreen.js'
import Adminscreen from './screens/adminscreen.js'
import Studentlist from './screens/studentlist.js'
import Teacherlist from './screens/teacherlist.js'
import Studentprofile from './screens/studentprofile.js'
import Date from './screens/datepicker.js'
import Addsubject from './screens/addsubject.js'
import Adminqrgenerate from './screens/adminqrgenerate.js'
const Routes = () => (
   <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
      <Scene key = "root" hideNavBar >
       
        <Scene key = "home"
          component = {Home} 
          title = "Attendance App" 
          titleStyle={styles.titlestyle}
          initial = {true} />
         <Scene key = "login" component = {Login} title = "Login"   titleStyle={styles.titlestyle}/>
         <Scene key = "register" component = {Register} title = "Teacher Register" titleStyle={styles.titlestyle}/>
         <Scene key = "qrscanner" hideNavBar component = {Qrscanner} title = "Student" />
         <Scene key = "select" component = {Qrgenerator} title = "QR Generate" />
         <Scene key = "qrscan" component = {Qrscan} title = "QR Scan" />
         <Scene key = "drawer" component = {Drawermenu}  />
         <Scene key = "studentsignup" component = {Studentsignup} title = "Student Register" titleStyle={styles.titlestyle}  />
         <Scene key = "addclass" component = {Addclass} title = "Add Class" titleStyle={styles.titlestyle}  />
         <Scene key = "student" component = {Studentscreen} title = "STudent Screen" titleStyle={styles.titlestyle}  />
         <Scene key = "teacher" component = {Teacherscreen} title = "Teacher Screen" titleStyle={styles.titlestyle}  />
         <Scene key = "admin" component = {Adminscreen} title = "Admin Screeen" titleStyle={styles.titlestyle}  />
         <Scene key = "studentprofile" component = {Studentprofile} title = "Student Profile Screen" titleStyle={styles.titlestyle}  />
         <Scene key = "date" component = {Date} title = "Date Picker" titleStyle={styles.titlestyle}  />
         <Scene key = "studentlist" component = {Studentlist} title = "Student list Screen" titleStyle={styles.titlestyle}  />
         <Scene key = "addsubject" component = {Addsubject} title = "Add Subject" titleStyle={styles.titlestyle}  />
         <Scene key = "adminqrgenerate" component = {Adminqrgenerate} title = "Generate QR" titleStyle={styles.titlestyle}  />
         <Scene key = "teacherlist" component = {Teacherlist} title = "Teacher list Screen" titleStyle={styles.titlestyle}  />

      </Scene>
   </Router>
)
const styles = StyleSheet.create({
    navBar: {
        backgroundColor:'#42d1f5',
    },
    navBarTitle:{
        color:'#FFFFFF',
        textAlign:'center'
    },
    barButtonTextStyle:{
        color:'#FFFFFF',
        textAlign:'center'
    },
    barButtonIconStyle:{
        tintColor:'rgb(255,255,255)'
    },
    titlestyle:{
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '700',
        
        marginLeft: 120
    }
    
  });
export default Routes;
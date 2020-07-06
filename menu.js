import React from "react";
import { Text, View, ScrollView } from "react-native";
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { Drawer } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import Register from './screens/register.js'
import Qrscanner from './screens/Qrscanner.js'
const Menu = createDrawerNavigator(
    {
      First: { screen: Register },
      Second: { screen: Qrscanner }
    },
    {
      contentComponent: props => (
        <ScrollView>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <Drawer.Item
              label="First Page"
              active="true"
              onPress={() => props.navigation.navigate("First")}
            />
            <Drawer.Item
              label="Second Page"
              active="true"
              onPress={() => props.navigation.navigate("Second")}
            />
          </SafeAreaView>
        </ScrollView>
      )
    }
  );
  
  const AppNav = createAppContainer(Menu);

  export default class Appmenu extends React.Component {
    render() {
      return <AppNav />;
    }
  }
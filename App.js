import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationActions } from "react-navigation";
import createBottomTabNavigator from "./src/navigator";

const AppNavigator = createBottomTabNavigator;

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

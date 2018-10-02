import React from 'react';
import { StyleSheet, YellowBox, SafeAreaView, StatusBar } from 'react-native';
import createStackNavigator from './src/services/navigator';

YellowBox.ignoreWarnings(['Remote debugger']);
const AppNavigator = createStackNavigator;

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#172E4C',
  },
});

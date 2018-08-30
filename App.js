import React from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import createBottomTabNavigator from './src/services/navigator';

YellowBox.ignoreWarnings(['Remote debugger']);
const AppNavigator = createBottomTabNavigator;

export default class App extends React.Component {
  render() {
    return <AppNavigator style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

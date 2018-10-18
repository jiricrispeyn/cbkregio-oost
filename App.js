import React from 'react';
import { StyleSheet, YellowBox, SafeAreaView, StatusBar } from 'react-native';
import createStackNavigator from './src/services/navigator';
import { LinearGradient } from 'expo';

YellowBox.ignoreWarnings(['Remote debugger']);
const AppNavigator = createStackNavigator;

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#172E4C', '#0A1525']}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.gradient}
        >
          <AppNavigator />
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#172E4C',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

import React from 'react';
import { StyleSheet, YellowBox, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import createStackNavigator from './src/services/navigator';
import { LinearGradient } from 'expo';
import configureStore from './src/store';

YellowBox.ignoreWarnings(['Remote debugger']);
const store = configureStore();
const AppNavigator = createStackNavigator;

export default class App extends React.Component {
  render() {
    console.log(store);

    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <LinearGradient
            colors={['#172E4C', '#0A1525']}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.gradient}
          />
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

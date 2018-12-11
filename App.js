import React from 'react';
import {
  StyleSheet,
  YellowBox,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStackNavigator from './src/services/navigator';
import configureStore from './src/store';
import colors from './src/utils/colors';

YellowBox.ignoreWarnings(['Remote debugger']);
const { store, persistor } = configureStore();
const AppNavigator = createStackNavigator;

export default class App extends React.Component {
  renderBootstrapped() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </SafeAreaView>
    );
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {bootstrapped =>
            bootstrapped ? this.renderBootstrapped() : <AppLoading />
          }
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.firefly,
  },
});

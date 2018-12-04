import React from 'react';
import { StyleSheet, YellowBox, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStackNavigator from './src/services/navigator';
import configureStore from './src/store';
import colors from './src/utils/colors';

YellowBox.ignoreWarnings(['Remote debugger']);
const { store, persistor } = configureStore();
const AppNavigator = createStackNavigator;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <AppNavigator />
          </SafeAreaView>
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

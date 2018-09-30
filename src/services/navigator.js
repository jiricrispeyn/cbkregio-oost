import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import LeaguesScreen from '../screens/LeaguesScreen';
import LeagueDetailScreen from '../screens/LeagueDetailScreen';

const headerStyle = {
  height: 64,
  backgroundColor: '#172E4C',
  borderBottomWidth: 0
};
const headerTitleStyle = {
  color: '#fff',
  fontSize: 34,
  fontWeight: '600'
};
const headerBackTitleStyle = {
  color: '#fff',
  fontSize: 15
};
const headerTintColor = '#fff';
const styles = {
  headerStyle,
  headerTitleStyle,
  headerBackTitleStyle,
  headerTintColor
};

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default createStackNavigator(
  {
    Leagues: {
      screen: LeaguesScreen,
      navigationOptions: {
        title: 'Reeksen',
        ...styles
      }
    },
    LeagueDetail: {
      screen: LeagueDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.league,
        ...styles
      })
    }
  },
  {
    initialRouteName: 'Leagues',
    cardStyle: {
      backgroundColor: '#172E4C'
    }
  }
);

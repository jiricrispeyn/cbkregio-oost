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
  backgroundColor: '#6563A4',
  shadowColor: 'transparent'
};
const headerTitleStyle = {
  color: '#fff',
  fontSize: 17
};
const headerBackTitleStyle = {
  color: '#fff'
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

const LeaguesStackNavigator = createStackNavigator(
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
    initialRouteName: 'Leagues'
  }
);

export default createBottomTabNavigator(
  {
    Leagues: {
      screen: LeaguesStackNavigator,
      navigationOptions: {
        title: 'Reeksen'
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: { title: 'Instellingen' }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#FC3768',
      inactiveTintColor: 'rgba(29, 29, 38, .3)',
      style: {
        height: 60,
        backgroundColor: '#fff',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1
      },
      labelStyle: {
        fontSize: 15
      }
    }
  }
);

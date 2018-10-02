import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CustomHeader from '../components/header/CustomHeader';
import LeaguesScreen from '../screens/LeaguesScreen';
import LeagueDetailScreen from '../screens/LeagueDetailScreen';

export default createStackNavigator(
  {
    Leagues: {
      screen: LeaguesScreen,
      navigationOptions: {
        title: 'Reeksen',
        header: props => <CustomHeader {...props} />,
      },
    },
    LeagueDetail: {
      screen: LeagueDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.league,
        header: props => <CustomHeader {...props} />,
      }),
    },
  },
  {
    initialRouteName: 'Leagues',
    cardStyle: {
      backgroundColor: '#172E4C',
    },
  }
);

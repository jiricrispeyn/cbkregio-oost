import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CustomHeader from '../components/header/CustomHeader';
import LeaguesScreen from '../screens/LeaguesScreen';
import LeagueDetailScreen from '../screens/LeagueDetailScreen';
import TablesScreen from '../screens/TablesScreen';

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
    Tables: {
      screen: TablesScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Klassement',
        header: props => <CustomHeader {...props} />,
      }),
    },
  },
  {
    initialRouteName: 'Tables',
    cardStyle: {
      backgroundColor: '#172E4C',
    },
  }
);

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CustomHeader from '../components/header/CustomHeader';
import LeaguesScreen from '../screens/LeaguesScreen';
import LeagueDetailScreen from '../screens/LeagueDetailScreen';
import TablesScreen from '../screens/TablesScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ScoresheetScreen from '../screens/ScoresheetScreen';
import PlayersScreen from '../screens/PlayersScreen';
import AddressesScreen from '../screens/AddressesScreen';
import colors from '../utils/colors';

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
    Results: {
      screen: ResultsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Resultaten',
        header: props => <CustomHeader {...props} />,
      }),
    },
    Scoresheet: {
      screen: ScoresheetScreen,
      navigationOptions: ({ navigation }) => {
        const { home, away } = navigation.state.params;

        return {
          title: `${home} - ${away}`,
          header: props => (
            <CustomHeader
              {...props}
              titleStyle={{ fontSize: 18, lineHeight: 21 }}
            />
          ),
        };
      },
    },
    Players: {
      screen: PlayersScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Spelers',
        header: props => <CustomHeader {...props} />,
      }),
    },
    Addresses: {
      screen: AddressesScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Adressen',
        header: props => <CustomHeader {...props} />,
      }),
    },
  },
  {
    initialRouteName: 'Leagues',
    cardStyle: {
      backgroundColor: colors.firefly,
    },
    transitionConfig: () => ({
      containerStyle: {},
    }),
  }
);

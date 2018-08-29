import React from "react";
import { Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import LeaguesScreen from "../screens/LeaguesScreen";
import LeagueDetailScreen from "../screens/LeagueDetailScreen";

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        title: "Reeksen"
      }
    },
    LeagueDetail: {
      screen: LeagueDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.league
      })
    }
  },
  {
    initialRouteName: "Leagues"
  }
);

export default createBottomTabNavigator({
  Leagues: {
    screen: LeaguesStackNavigator,
    navigationOptions: {
      title: "Reeksen"
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: { title: "Instellingen" }
  }
});

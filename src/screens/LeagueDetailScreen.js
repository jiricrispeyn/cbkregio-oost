import React, { PureComponent } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator
} from "react-native";
import ListItem from "../components/list/ListItem";
import { database } from "../services/firebase";

class LeagueDetailScreen extends PureComponent {
  state = {
    clubs: [],
    isLoading: true
  };

  async componentDidMount() {
    console.log(this.props);
    const clubs = await database
      .ref(`/clubs/${this.props.navigation.state.params.league}`)
      .once("value");
    console.log(clubs.val());
    this.setState({ clubs: clubs.val(), isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView>
          <View style={[styles.screen, { justifyContent: "center" }]}>
            <ActivityIndicator />
          </View>
        </SafeAreaView>
      );
    }

    const { clubs } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.screen}>
          <ScrollView style={styles.scrollView}>
            {clubs &&
              clubs.map((club, i) => (
                <ListItem
                  key={i}
                  title={club.name}
                  divider={i === 0 ? false : true}
                />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: "100%"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 64,
    backgroundColor: "#6563A4"
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "400"
  }
});

export default LeagueDetailScreen;

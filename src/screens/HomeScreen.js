import React, { PureComponent } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import ListItem from "../components/list/ListItem";

class HomeScreen extends PureComponent {
  state = {};

  render() {
    const leagues = [
      "1A",
      "1B",
      "2A",
      "2B",
      "2C",
      "3A",
      "3B",
      "3C",
      "4A",
      "4B",
      "4C"
    ];
    return (
      <SafeAreaView>
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={styles.title}>Reeksen</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            {leagues.map((league, i) => (
              <ListItem
                key={i}
                title={league}
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

export default HomeScreen;

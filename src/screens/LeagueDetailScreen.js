import React, { PureComponent } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";

class LeagueDetailScreen extends PureComponent {
  state = {};

  render() {
    return (
      <SafeAreaView>
        <View style={styles.screen}>
          <ScrollView>
            <Text>League Detail Screen</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: "100%"
  }
});

export default LeagueDetailScreen;

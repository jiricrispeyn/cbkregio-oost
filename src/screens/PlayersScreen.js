import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from '../components/tabs/Tabs';

export default class PlayersScreen extends PureComponent {
  state = {
    selectedIndex: 0,
  };
  onPress(selectedIndex) {
    this.setState({
      selectedIndex,
    });
  }

  render() {
    const tabs = ['Spelerslijst', 'Elo Ranking'];
    return (
      <View style={styles.screen}>
        <Tabs
          tabs={tabs}
          selectedIndex={this.state.selectedIndex}
          onPress={this.onPress.bind(this)}
          tabStyle={styles.tabStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 15,
  },
  tabStyle: {},
});

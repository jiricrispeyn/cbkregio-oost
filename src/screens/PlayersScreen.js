import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from '../components/tabs/Tabs';
import { API_URL } from '../config/api';

export default class PlayersScreen extends PureComponent {
  state = {
    selectedIndex: 0,
  };

  onPress(selectedIndex) {
    this.setState({
      selectedIndex,
    });
  }

  async getPlayers(id) {
    return fetch(`${API_URL}/leagues/${id}/players`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async getEloRanking(id) {
    return fetch(`${API_URL}/leagues/${id}/elo-ranking`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', '2C');
    const [{ players }, { players: eloRanking }] = await Promise.all([
      this.getPlayers(league),
      this.getEloRanking(league),
    ]);

    console.table(players);
    console.table(eloRanking);
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

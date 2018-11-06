import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import EloRanking from '../views/EloRanking';
import Players from '../views/Players';
import Tabs from '../components/tabs/Tabs';
import { API_URL } from '../config/api';

const tabs = ['Spelerslijst', 'Elo Ranking'];

export default class PlayersScreen extends PureComponent {
  state = {
    selectedIndex: 0,
    players: [],
    eloRanking: [],
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

    this.setState({
      eloRanking,
      players,
    });
  }

  render() {
    const { selectedIndex, players, eloRanking } = this.state;

    return (
      <View style={styles.screen}>
        <Tabs
          tabs={tabs}
          selectedIndex={selectedIndex}
          onPress={this.onPress.bind(this)}
        />
        {selectedIndex === 0 && <Players data={players} />}
        {selectedIndex === 1 && <EloRanking data={eloRanking} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    marginHorizontal: 15,
  },
});

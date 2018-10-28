import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Tabs from '../components/tabs/Tabs';
import { API_URL } from '../config/api';
import { LinearGradient } from 'expo';

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
      players,
      eloRanking,
    });
  }

  renderPlayers() {
    const { players } = this.state;

    const playersByClub = players.reduce((acc, curr) => {
      const { club } = curr;
      const players = acc[club] || [];

      return {
        ...acc,
        [club]: [...players, curr],
      };
    }, {});

    return (
      <React.Fragment>
        <Tabs
          tabs={Object.keys(playersByClub)}
          selectedIndex={0}
          scroll={true}
        />
      </React.Fragment>
    );
  }

  renderEloRanking() {
    const { eloRanking } = this.state;

    return eloRanking.map(player => {
      const { rank, rating, name, club, percentage } = player;
      return (
        <View style={styles.playerContainer}>
          <View style={styles.playerLeft}>
            <LinearGradient
              colors={['#25ABFB', '#1073F5']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.rankWrapper}
            >
              <Text style={styles.rank}>{rank}</Text>
            </LinearGradient>
            <View style={styles.player}>
              <Text style={styles.club}>{club}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          <View style={styles.playerRight}>
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    const tabs = ['Spelerslijst', 'Elo Ranking'];
    const { selectedIndex } = this.state;

    return (
      <View style={styles.screen}>
        <Tabs
          tabs={tabs}
          selectedIndex={selectedIndex}
          onPress={this.onPress.bind(this)}
          tabStyle={styles.tabStyle}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {selectedIndex === 0 && this.renderPlayers()}
          {selectedIndex === 1 && (
            <View style={styles.eloRanking}>{this.renderEloRanking()}</View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    marginHorizontal: 15,
  },
  scrollView: {},
  contentContainerStyle: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 15,
  },
  tabStyle: {},
  eloRanking: {
    paddingVertical: 15,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  playerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerRight: {
    alignItems: 'flex-end',
  },
  rankWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  rank: {
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
  },
  player: {
    marginLeft: 20,
  },
  name: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#0E1D31',
  },
  club: {
    fontSize: 10,
    fontWeight: '500',
    color: '#818790',
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0E1D31',
  },
});

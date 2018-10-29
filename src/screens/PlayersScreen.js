import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Tabs from '../components/tabs/Tabs';
import Fab from '../components/buttons/Fab';
import { API_URL } from '../config/api';
import { LinearGradient } from 'expo';

const tabs = ['Spelerslijst', 'Elo Ranking'];
const eloViews = {
  rating: 'rating',
  stats: 'stats',
};

export default class PlayersScreen extends PureComponent {
  state = {
    selectedIndex: 0,
    selectedClub: 0,
    players: [],
    playersByClub: {},
    eloRanking: [],
    eloView: eloViews.rating,
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

    const playersByClub = players.reduce((acc, curr) => {
      const { club } = curr;
      const players = acc[club] || [];

      return {
        ...acc,
        [club]: [...players, curr],
      };
    }, {});

    this.setState({
      players,
      eloRanking,
      playersByClub,
    });
  }

  keyExtractor = ({ id }) => id;

  switchEloView = () => {
    const { rating, stats } = eloViews;

    this.setState(prevState => ({
      eloView: prevState.eloView === rating ? stats : rating,
    }));
  };

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

  renderItem({ rank, name, club, rating, percentage, sets }) {
    const { eloView } = this.state;

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
          {eloView === 'rating' ? (
            <Text style={styles.rating}>{rating}</Text>
          ) : (
            <React.Fragment>
              <Text style={styles.sets}>{sets} sets</Text>
              <Text style={[styles.rating, { marginTop: 5 }]}>
                {percentage}%
              </Text>
            </React.Fragment>
          )}
        </View>
      </View>
    );
  }

  render() {
    const {
      selectedIndex,
      players,
      playersByClub,
      eloRanking,
      eloView,
    } = this.state;

    return (
      <View style={styles.screen}>
        <Tabs
          tabs={tabs}
          selectedIndex={selectedIndex}
          onPress={this.onPress.bind(this)}
          tabStyle={styles.tabStyle}
        />
        {selectedIndex === 0 && (
          <React.Fragment>
            <Tabs
              tabs={Object.keys(playersByClub)}
              selectedIndex={0}
              scroll={true}
              onPress={() => {}}
              highlightColor="#B9C2CE"
              style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainerStyle}
              data={players}
              renderItem={({ item }) => (
                <View>
                  <Text>
                    {item.last_name} {item.first_name}
                  </Text>
                </View>
              )}
              keyExtractor={this.keyExtractor}
            />
          </React.Fragment>
        )}
        {selectedIndex === 1 && (
          <React.Fragment>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainerStyle}
              data={eloRanking}
              extraData={eloView}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={this.keyExtractor}
            />
            <View style={styles.fabWrapper}>
              <Fab
                icon={eloView === eloViews.rating ? 'chart' : 'trophy'}
                onPress={this.switchEloView}
              />
            </View>
          </React.Fragment>
        )}
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
  sets: {
    fontSize: 12,
    fontWeight: '500',
    color: '#818790',
  },
  fabWrapper: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
});

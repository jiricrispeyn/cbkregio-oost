import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import EloRanking from '../views/EloRanking';
import Players from '../views/Players';
import Tabs from '../components/tabs/Tabs';
import { getPlayers, getEloRanking } from '../config/api';
import { makeCancelable } from '../utils/promise';

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

  componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);

    this.cancelablePromise = makeCancelable(
      Promise.all([getPlayers(league), getEloRanking(league)])
    );
    this.cancelablePromise.promise
      .then(([{ players }, { players: eloRanking }]) => {
        this.setState({
          eloRanking,
          players,
        });
      })
      .catch(reason => console.log(reason));
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel();
    }
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

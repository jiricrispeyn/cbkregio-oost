import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  getActivePlayers,
  isActivePlayersLoading,
  getActivePlayersError,
  getActiveEloRanking,
  isActiveEloRankingLoading,
  getActiveEloRankingError,
} from '../selectors';
import EloRanking from '../views/EloRanking';
import Players from '../views/Players';
import Tabs from '../components/tabs/Tabs';
import { fetchPlayers } from '../actions/players';
import { fetchEloRanking } from '../actions/elo-ranking';

const tabs = ['Spelerslijst', 'Elo Ranking'];

class PlayersScreen extends PureComponent {
  state = {
    selectedIndex: 0,
  };

  onPress(selectedIndex) {
    this.setState({
      selectedIndex,
    });
  }

  componentDidMount() {
    const {
      navigation,
      dispatch,
      playersLoading,
      eloRankingLoading,
    } = this.props;
    const league = navigation.getParam('league', null);
    const loading = playersLoading || eloRankingLoading;
    dispatch(fetchPlayers(league));
    dispatch(fetchEloRanking(league));
    navigation.setParams({ loading });
  }

  componentDidUpdate(prevProps) {
    const { navigation, playersLoading, eloRankingLoading } = this.props;

    if (
      playersLoading !== prevProps.playersLoading ||
      eloRankingLoading !== prevProps.eloRankingLoading
    ) {
      const loading = playersLoading || eloRankingLoading;
      navigation.setParams({ loading });
    }
  }

  render() {
    const { selectedIndex } = this.state;

    return (
      <View style={styles.screen}>
        <Tabs
          tabs={tabs}
          selectedIndex={selectedIndex}
          onPress={this.onPress.bind(this)}
        />
        {selectedIndex === 0 && <Players data={this.props.players} />}
        {selectedIndex === 1 && <EloRanking data={this.props.eloRanking} />}
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

const mapStateToProps = state => ({
  players: getActivePlayers(state),
  playersLoading: isActivePlayersLoading(state),
  playersError: getActivePlayersError(state),
  eloRanking: getActiveEloRanking(state),
  eloRankingLoading: isActiveEloRankingLoading(state),
  eloRankingError: getActiveEloRankingError(state),
});

export default connect(mapStateToProps)(PlayersScreen);

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import Tabs from '../components/tabs/Tabs';

export default class Players extends PureComponent {
  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
  }

  state = {
    selectedClub: 0,
    selectedPlayers: [],
    playersByClub: {},
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { data } = this.props;

    if (data.length > 0) {
      this.setPlayersState(data);
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      this.setPlayersState(data);
    }
  }

  setPlayersState(players) {
    const playersByClub = this.getPlayersByClub(players);
    const selectedPlayers = this.getSelectedPlayers(
      playersByClub,
      this.state.selectedClub
    );
    this.setState({ playersByClub, selectedPlayers });
  }

  getSelectedPlayers(playersByClub, selectedClub) {
    return Object.values(playersByClub)[selectedClub];
  }

  getPlayersByClub(players) {
    return players.reduce((acc, curr) => {
      const { club } = curr;
      const players = acc[club] || [];

      return {
        ...acc,
        [club]: [...players, curr],
      };
    }, {});
  }

  onPress = selectedClub => {
    const selectedPlayers = this.getSelectedPlayers(
      this.state.playersByClub,
      selectedClub
    );

    this.setState({
      selectedClub,
      selectedPlayers,
    });
  };

  keyExtractor = ({ id }) => id;

  renderItem({ last_name, first_name, id, ranking, birthdate }) {
    return (
      <View style={styles.item}>
        <LinearGradient
          colors={['#25ABFB', '#1073F5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.idWrapper}
        >
          <Text style={styles.id}>{id}</Text>
        </LinearGradient>
        <View style={styles.player}>
          <Text style={styles.birthdate}>{birthdate}</Text>
          <Text style={styles.name}>
            {first_name} {last_name}
          </Text>
        </View>
        <View>
          <Text style={styles.ranking}>{ranking}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.data.length === 0) {
      return (
        <View style={[styles.contentContainerStyle, { paddingVertical: 30 }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <React.Fragment>
        <Tabs
          tabs={Object.keys(this.state.playersByClub)}
          selectedIndex={this.state.selectedClub}
          scroll={true}
          onPress={this.onPress}
          highlightColor="#B9C2CE"
          style={styles.tabs}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          data={this.state.selectedPlayers}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={this.keyExtractor}
          ref={this.scrollView}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  contentContainerStyle: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  tabs: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  idWrapper: {
    width: 55,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  id: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  player: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#0E1D31',
  },
  birthdate: {
    fontSize: 10,
    fontWeight: '500',
    color: '#818790',
  },
  ranking: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0E1D31',
  },
});

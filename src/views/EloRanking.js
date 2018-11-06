import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import Fab from '../components/buttons/Fab';

const views = {
  rating: 'rating',
  stats: 'stats',
};

export default class EloRanking extends PureComponent {
  state = {
    selectedView: views.rating,
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  switchView = () => {
    const { rating, stats } = views;

    this.setState(prevState => ({
      selectedView: prevState.selectedView === rating ? stats : rating,
    }));
  };

  keyExtractor = ({ id }) => id;

  renderItem({
    rank,
    name,
    club,
    rating,
    percentage,
    sets,
    wins,
    draws,
    losses,
  }) {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
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
        <View style={styles.itemRight}>
          {this.state.selectedView === views.rating ? (
            <Text style={styles.rating}>{rating}</Text>
          ) : (
            <React.Fragment>
              <Text style={styles.sets}>
                {sets} sets ({wins}-{draws}-{losses})
              </Text>
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
    const { selectedView } = this.state;
    const { data } = this.props;

    if (data.length === 0) {
      return (
        <View style={[styles.contentContainerStyle, { paddingVertical: 30 }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <React.Fragment>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          data={data}
          extraData={selectedView}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={this.keyExtractor}
          onMomentumScrollBegin={() => console.log('sup')}
        />
        <View style={styles.fabWrapper}>
          <Fab
            icon={selectedView === views.rating ? 'chart' : 'trophy'}
            onPress={this.switchView}
          />
        </View>
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
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

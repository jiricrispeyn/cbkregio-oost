import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ListItem from '../components/list/ListItem';
import { fetchLeagues } from '../actions/leagues';

class LeaguesScreen extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchLeagues());
  }

  render() {
    const { leagues, loading, navigation } = this.props;
    if (loading) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listWrapper}>
            {leagues.map((league, i) => (
              <ListItem
                key={i}
                title={league.id}
                rightIcon="chevron-right"
                divider={i !== 0}
                isFirst={i === 0}
                isLast={i === leagues.length - 1}
                onPress={() =>
                  navigation.navigate('LeagueDetail', {
                    league: league.id,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    paddingHorizontal: 15,
  },
  scrollView: {
    marginTop: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
});

const mapStateToProps = state => ({
  leagues: state.leaguesList.leagues,
  loading: state.leaguesList.loading,
  error: state.leaguesList.error,
});

export default connect(mapStateToProps)(LeaguesScreen);

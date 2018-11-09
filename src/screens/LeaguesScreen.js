import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import ListItem from '../components/list/ListItem';
import { getLeagues } from '../config/api';
import { makeCancelable } from '../utils/promise';

class LeaguesScreen extends PureComponent {
  state = {
    leagues: [],
    isLoading: true,
  };

  componentDidMount() {
    this.cancelablePromise = makeCancelable(getLeagues());
    this.cancelablePromise.promise
      .then(({ leagues }) => {
        this.setState({ leagues, isLoading: false });
      })
      .catch(reason => console.log(reason));
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    const { leagues } = this.state;

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
                  this.props.navigation.navigate('LeagueDetail', {
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

export default LeaguesScreen;

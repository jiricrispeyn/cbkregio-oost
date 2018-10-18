import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import ListItem from '../components/list/ListItem';
import { API_URL } from '../config/api';

class LeaguesScreen extends PureComponent {
  state = {
    leagues: [],
    isLoading: true,
  };

  getLeagues() {
    return fetch(`${API_URL}/leagues`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    const { leagues } = await this.getLeagues();
    this.setState({ leagues, isLoading: false });
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

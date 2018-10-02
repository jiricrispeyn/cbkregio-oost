import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import ListItem from '../components/list/ListItem';
import { database } from '../services/firebase';

class LeaguesScreen extends PureComponent {
  state = {
    leagues: [],
    isLoading: true
  };

  async componentDidMount() {
    const leagues = await database.ref('/leagues').once('value');
    this.setState({ leagues: leagues.val(), isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listWrapper}>
            {this.state.leagues.map((league, i) => (
              <ListItem
                key={i}
                title={league}
                rightIcon="keyboard-arrow-right"
                divider={i === 0 ? false : true}
                onPress={() =>
                  this.props.navigation.navigate('LeagueDetail', { league })
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
    paddingHorizontal: 15
  },
  scrollView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginVertical: 15
  }
});

export default LeaguesScreen;

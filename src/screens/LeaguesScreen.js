import React, { PureComponent } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native';
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
        <SafeAreaView>
          <View style={[styles.screen, { justifyContent: 'center' }]}>
            <ActivityIndicator />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView>
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
                  isFirst={i === 0}
                  isLast={i === this.state.leagues.length - 1}
                  onPress={() =>
                    this.props.navigation.navigate('LeagueDetail', { league })
                  }
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    paddingHorizontal: 15
  },
  listWrapper: {
    paddingVertical: 15
  }
});

export default LeaguesScreen;

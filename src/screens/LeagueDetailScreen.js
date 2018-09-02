import React, { PureComponent } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native';
import ListItem from '../components/list/ListItem';
import Tabs from '../components/tabs/Tabs';
import { database } from '../services/firebase';

class LeagueDetailScreen extends PureComponent {
  state = {
    clubs: [],
    isLoading: true
  };

  async componentDidMount() {
    console.log(this.props);
    const clubs = await database
      .ref(`/clubs/${this.props.navigation.state.params.league}`)
      .once('value');
    this.setState({ clubs: clubs.val(), isLoading: false });
  }

  renderTabs() {
    return (
      <Tabs
        tabs={[
          'Klassement',
          'Vorige speeldag',
          'Kalender',
          'Spelerslijst',
          'ELO Ranking',
          'Adressen'
        ]}
      />
    );
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  renderClubs(clubs) {
    return clubs.map((club, i) => (
      <ListItem key={i} title={club.name} divider={i === 0 ? false : true} />
    ));
  }

  render() {
    const { isLoading, clubs } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.screen}>
          {this.renderTabs()}
          {isLoading
            ? this.renderLoading()
            : clubs && <ScrollView>{this.renderClubs(clubs)}</ScrollView>}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: '#fff'
  }
});

export default LeagueDetailScreen;

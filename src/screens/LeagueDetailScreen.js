import React, { PureComponent } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Clipboard,
  Alert
} from 'react-native';
import ListItem from '../components/list/ListItem';
import Tabs from '../components/tabs/Tabs';
import { database } from '../services/firebase';

class LeagueDetailScreen extends PureComponent {
  constructor() {
    super();
    this.updateIndex = this.updateIndex.bind(this);
  }

  state = {
    clubs: [],
    selectedIndex: 0,
    isLoading: true
  };

  async componentDidMount() {
    console.log(this.props);
    const clubs = await database
      .ref(`/clubs/${this.props.navigation.state.params.league}`)
      .once('value');
    this.setState({ clubs: clubs.val(), isLoading: false });
    console.log(clubs.val());
  }

  copy(club) {
    Clipboard.setString(club.address);
    Alert.alert(`Adres ${club.name} gekopieerd`);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  renderTabs() {
    const tabs = [
      'Adressen',
      'Klassement',
      'Vorige speeldag',
      'Kalender',
      'Spelerslijst',
      'ELO Ranking'
    ];
    const { selectedIndex } = this.state;

    return (
      <Tabs
        tabs={tabs}
        selectedIndex={selectedIndex}
        onPress={this.updateIndex}
        style={{ marginTop: 15 }}
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
    return (
      <View style={styles.listWrapper}>
        {clubs.map((club, i) => (
          <ListItem
            key={i}
            title={club.name}
            rightTitle={club.place}
            subtitle={club.address}
            divider={i === 0 ? false : true}
            isLast={i === clubs.length - 1}
            onPress={() => this.copy(club)}
          />
        ))}
      </View>
    );
  }

  render() {
    const { isLoading, clubs } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.screen}>
          <View style={styles.scrollViewWrapper}>
            {this.renderTabs()}
            {isLoading
              ? this.renderLoading()
              : clubs && (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {this.renderClubs(clubs)}
                  </ScrollView>
                )}
          </View>
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
  scrollViewWrapper: {
    height: '100%'
  },
  listWrapper: {
    paddingBottom: 15
  }
});

export default LeagueDetailScreen;

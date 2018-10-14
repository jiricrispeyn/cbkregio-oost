import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Clipboard,
  Alert,
} from 'react-native';
import ListItem from '../components/list/ListItem';
import Tabs from '../components/tabs/Tabs';
import { database } from '../services/firebase';
import { API_URL } from '../config/api';

class LeagueDetailScreen extends PureComponent {
  constructor() {
    super();
    this.updateIndex = this.updateIndex.bind(this);
  }

  state = {
    clubs: [],
    selectedIndex: 0,
    isLoading: true,
  };

  getAddresses(league) {
    return fetch(`${API_URL}/leagues/${league}/addresses`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    const { league } = this.props.navigation.state.params;
    const { addresses } = await this.getAddresses(league);
    this.setState({ clubs: addresses, isLoading: false });
  }

  copy(club) {
    Clipboard.setString(club.address);
    Alert.alert(`Adres ${club.club} gekopieerd`);
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
      'ELO Ranking',
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
            title={club.club}
            rightTitle={club.place}
            subtitle={club.address}
            divider={i === 0 ? false : true}
            onPress={() => this.copy(club)}
          />
        ))}
      </View>
    );
  }

  render() {
    const { isLoading, clubs, selectedIndex } = this.state;

    return (
      <View style={styles.screen}>
        <View style={styles.scrollViewWrapper}>
          {this.renderTabs()}
          {isLoading
            ? this.renderLoading()
            : clubs && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                >
                  {selectedIndex === 0 && this.renderClubs(clubs)}
                </ScrollView>
              )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    paddingHorizontal: 15,
  },
  scrollViewWrapper: {
    height: '100%',
  },
  scrollView: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 15,
  },
  listWrapper: {
    paddingBottom: 15,
  },
});

export default LeagueDetailScreen;

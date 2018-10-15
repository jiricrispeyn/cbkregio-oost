import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ListItem from '../components/list/ListItem';

class LeagueDetailScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    const items = [
      'Klassement',
      'Uitslagen',
      'Elo Ranking',
      'Spelerslijst',
      'Adressen',
    ];

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listWrapper}>
            {items.map((item, i) => (
              <ListItem
                key={i}
                title={item}
                rightIcon="chevron-right"
                isFirst={i === 0}
                isLast={i === items.length - 1}
                divider={i === 0 ? false : true}
                onPress={() => navigation.navigate('Tables', { league })}
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
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
});

export default LeagueDetailScreen;

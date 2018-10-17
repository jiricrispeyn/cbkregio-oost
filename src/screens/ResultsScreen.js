import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import closestIndexTo from 'date-fns/closest_index_to';
import isBefore from 'date-fns/is_before';
import differenceInDays from 'date-fns/difference_in_days';
import { API_URL } from '../config/api';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    results: [],
    trendingMatches: null,
  };

  getLeagueDetail(id) {
    return fetch(`${API_URL}/leagues/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  getTrendingMatches(results) {
    const now = new Date();
    const dates = results.map(result => result._date);
    const closestIndex = closestIndexTo(now, dates);
    const shouldShowPrev =
      closestIndex > 0 &&
      isBefore(now, results[closestIndex]._date) &&
      differenceInDays(now, results[closestIndex]._date) < -1;

    return shouldShowPrev ? results[closestIndex - 1] : results[closestIndex];
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    let { results } = await this.getLeagueDetail(league);

    results = results.map(result => {
      const [day, month, year] = result.date.split('-');
      const _date = new Date(year, month - 1, day);

      return { _date, ...result };
    });

    const trendingMatches = this.getTrendingMatches(results);
    console.log(trendingMatches);

    this.setState({
      results,
      trendingMatches,
      isLoading: false,
    });
  }

  render() {
    const { results, trendingMatches } = this.state;
    return (
      <View style={styles.screen}>
        {trendingMatches && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {trendingMatches.matches.map(match => (
              <View>
                <Text>
                  {match.home.club} {match.home.score}
                </Text>
                <Text>
                  {match.away.club} {match.away.score}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 15,
  },
  tableHeadBorder: {
    borderRightWidth: 0,
  },
  tableHeadStyle: {
    height: 40,
  },
  tableHeadText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F96A0',
    paddingHorizontal: 16,
  },
  scrollView: {
    marginTop: 15,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  tableDataStyle: {
    height: 52,
  },
  tableDataText: {
    paddingHorizontal: 16,
    fontSize: 12,
  },
});

export default TablesScreen;

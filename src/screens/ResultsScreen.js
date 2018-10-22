import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import closestIndexTo from 'date-fns/closest_index_to';
import isBefore from 'date-fns/is_before';
import differenceInDays from 'date-fns/difference_in_days';
import format from 'date-fns/format';
import locale from 'date-fns/locale/nl';
import { API_URL } from '../config/api';
import TrendingMatch from '../components/matches/TrendingMatch';
import Datepicker from '../components/datepicker/Datepicker';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    results: [],
    trendingMatches: null,
    selectedDate: null,
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

  getDefaultSelected(results) {
    const { _date } = results.find(result => result.matches);

    return _date;
  }

  getDates(results) {
    return results.reduce(
      (acc, result) => {
        const dates = [...acc.dates, result._date];
        const disabledDates = !result.matches
          ? [...acc.disabledDates, result._date]
          : acc.disabledDates;

        return { dates, disabledDates };
      },
      {
        dates: [],
        disabledDates: [],
      }
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', '2C');
    let { results } = await this.getLeagueDetail(league);

    results = results.map(result => {
      const [day, month, year] = result.date.split('-');
      const _date = new Date(year, month - 1, day);

      return { _date, ...result };
    });

    const trendingMatches = this.getTrendingMatches(results);
    const selectedDate = this.getDefaultSelected(results);

    this.setState({
      results,
      trendingMatches,
      selectedDate,
      isLoading: false,
    });
  }

  renderTrendingMatches(trendingMatches) {
    const date = format(trendingMatches._date, 'D MMMM YYYY', { locale });
    return (
      <View>
        <View style={styles.trendingHeader}>
          <Text style={styles.trendingTitle}>Laatste speeldag</Text>
          <Text style={styles.trendingDate}>{date}</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {trendingMatches.matches.map(match => (
            <TrendingMatch match={match} cardStyle={styles.trendingCardStyle} />
          ))}
        </ScrollView>
      </View>
    );
  }

  onPress(selectedDate) {
    this.setState({ selectedDate });
  }

  render() {
    const { results, trendingMatches, selectedDate } = this.state;
    const { dates, disabledDates } = this.getDates(results);

    return (
      <View style={styles.screen}>
        {dates && (
          <Datepicker
            dates={dates}
            selected={selectedDate}
            disabled={disabledDates}
            style={styles.datepicker}
            onPress={this.onPress.bind(this)}
          />
        )}
        {trendingMatches && this.renderTrendingMatches(trendingMatches)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  datepicker: {
    marginTop: 30,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 31,
  },
  trendingTitle: {
    fontSize: 14,
    color: '#fff',
    letterSpacing: 0.24,
  },
  trendingDate: {
    fontSize: 10,
    color: '#3D618F',
  },
  scrollView: {
    paddingTop: 14,
    paddingBottom: 31,
  },
  contentContainerStyle: {
    paddingLeft: 15,
  },
  trendingCardStyle: {
    marginRight: 15,
  },
});

export default TablesScreen;

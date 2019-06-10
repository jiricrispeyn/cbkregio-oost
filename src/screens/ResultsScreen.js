import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { keyBy } from 'lodash';
import closestIndexTo from 'date-fns/closest_index_to';
import isBefore from 'date-fns/is_before';
import differenceInDays from 'date-fns/difference_in_days';
import format from 'date-fns/format';
import locale from 'date-fns/locale/nl';
import {
  getActiveResults,
  isActiveLeagueDetailLoading,
  getActiveLeagueDetailError,
} from '../selectors';
import { fetchLeagueDetail } from '../actions/league-detail';
import Match from '../components/matches/Match';
import Datepicker from '../components/datepicker/Datepicker';
import colors from '../utils/colors';

import { setScoresheet } from '../actions/nav';

class ResultsScreen extends PureComponent {
  state = {
    results: [],
    refreshing: false,
    selectedDate: null,
  };

  componentDidMount() {
    const { navigation, dispatch, results, loading } = this.props;
    const league = navigation.getParam('league', null);
    dispatch(fetchLeagueDetail(league));

    if (results.length > 0) {
      navigation.setParams({ loading });
    }

    this.setResults(results);
  }

  componentDidUpdate(prevProps) {
    const { refreshing } = this.state;
    const { navigation, results, loading } = this.props;

    if (loading !== prevProps.loading && !refreshing && results.length > 0) {
      navigation.setParams({ loading });
    }

    if (JSON.stringify(results) !== JSON.stringify(prevProps.results)) {
      this.setResults(results);
    }
  }

  setResults(newResults) {
    if (newResults.length === 0) {
      return;
    }

    const results = newResults.map(result => {
      const [day, month, year] = result.date.split('-');
      const _date = new Date(year, month - 1, day);

      return { ...result, _date };
    });

    this.setState(prevState => {
      if (prevState.selectedDate) {
        return { results };
      }

      const selectedDate = this.getDefaultSelected(results);

      return {
        results,
        selectedDate,
      };
    });
  }

  getDefaultSelected(results) {
    const now = new Date();
    let i = 0;

    const selected = results.reduce((acc, curr) => {
      const { type, _date } = curr;

      if (type !== 'league' || _date > now || _date < acc) {
        return acc;
      }

      return _date;
    }, new Date(0));

    return selected;
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

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    const { navigation, dispatch } = this.props;
    const league = navigation.getParam('league', null);
    await dispatch(fetchLeagueDetail(league));
    this.setState({
      refreshing: false,
    });
  };

  onSelectDate(selectedDate) {
    this.setState({ selectedDate });
  }

  renderResultsByDate(resultsByDate, selectedDate) {
    const { navigation, dispatch } = this.props;
    const league = navigation.getParam('league', null);

    if (!resultsByDate || !selectedDate) {
      return;
    }

    const results = resultsByDate[format(selectedDate, 'DD-MM-YYYY')];

    if (!results) {
      return;
    }

    const { _date, matches } = results;
    const date = format(_date, 'D MMMM YYYY', { locale });

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>{date}</Text>
        <View style={{ marginTop: 14 }}>
          {matches.map((match, i) => (
            <Match
              key={i}
              match={match}
              position={i}
              isFirst={i === 0}
              isLast={i === matches.length - 1}
              onPress={() => {
                dispatch(setScoresheet(match.scoresheet_id));
                navigation.navigate('Scoresheet', {
                  league,
                  id: match.scoresheet_id,
                  home: match.home.club,
                  away: match.away.club,
                });
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  render() {
    const { refreshing, selectedDate, results } = this.state;
    const { loading } = this.props;

    if (loading && !refreshing && results.length === 0) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }

    const resultsByDate = keyBy(results, 'date');
    const { dates, disabledDates } = this.getDates(results);

    return (
      <View style={styles.screen}>
        <Datepicker
          dates={dates}
          selected={selectedDate}
          disabled={disabledDates}
          style={styles.datepicker}
          onPress={this.onSelectDate.bind(this)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.renderResultsByDate(resultsByDate, selectedDate)}
        </ScrollView>
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
    height: 60,
  },
  scrollView: {
    marginTop: 15,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  resultsContainer: {
    marginHorizontal: 15,
  },
  resultsTitle: {
    color: colors.white,
    fontSize: 14,
    letterSpacing: 0.24,
  },
});

const mapStateToProps = state => ({
  results: getActiveResults(state),
  loading: isActiveLeagueDetailLoading(state),
  error: getActiveLeagueDetailError(state),
});

export default connect(mapStateToProps)(ResultsScreen);

import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchScoresheet } from '../actions/scoresheet';
import { scoresheetsSelector } from '../selectors';

class ScoresheetScreen extends PureComponent {
  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const scoresheetId = navigation.getParam('id', null);
    const leagueId = navigation.getParam('league', null);

    dispatch(fetchScoresheet(leagueId, scoresheetId));
    // if (results.length > 0) {
    //   navigation.setParams({ loading });
    // }
    // this.setResults(results);
  }

  componentDidUpdate(prevProps) {
    // const { refreshing } = this.state;
    // const { navigation, results, loading } = this.props;
    // if (loading !== prevProps.loading && !refreshing && results.length > 0) {
    //   navigation.setParams({ loading });
    // }
    // if (JSON.stringify(results) !== JSON.stringify(prevProps.results)) {
    //   this.setResults(results);
    // }
  }

  render() {
    console.log(this.props);

    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scoresheets: scoresheetsSelector(state),
});

export default connect(mapStateToProps)(ScoresheetScreen);

import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';
import { fetchScoresheet } from '../../actions/scoresheet';
import {
  getActiveScoresheet,
  isActiveAddressesLoading,
  getActiveAddressesError,
} from '../../selectors';
import {
  StyledResultContainer,
  StyledResultItem,
  StyledResultItemText,
} from './style';
import { ScrollView } from 'react-native-gesture-handler';

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

    const { scoresheet } = this.props;

    if (isEmpty(scoresheet)) {
      <View>
        <ActivityIndicator />
      </View>;
    }

    const homeScore = get(scoresheet, 'clubs.home.score');
    const awayScore = get(scoresheet, 'clubs.away.score');

    return (
      <View>
        <StyledResultContainer>
          <StyledResultItem isFirst={true} winner={homeScore >= 9}>
            <StyledResultItemText winner={homeScore >= 9}>
              {homeScore}
            </StyledResultItemText>
          </StyledResultItem>

          <StyledResultDivider />

          <StyledResultItem isLast={true} winner={awayScore >= 9}>
            <StyledResultItemText winner={awayScore >= 9}>
              {awayScore}
            </StyledResultItemText>
          </StyledResultItem>
        </StyledResultContainer>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  scoresheet: getActiveScoresheet(state),
  loading: isActiveAddressesLoading(state),
  error: getActiveAddressesError(state),
});

export default connect(mapStateToProps)(ScoresheetScreen);

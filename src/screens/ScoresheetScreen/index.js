import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';
import { fetchScoresheet } from '../../actions/scoresheet';
import {
  getActiveScoresheet,
  isActiveScoresheetLoading,
  getActiveScoresheetError,
} from '../../selectors';
import Tabs from '../../components/tabs/Tabs';
import Result from '../../components/result';

const tabs = ['Tab 1', 'Tab 2'];

class ScoresheetScreen extends PureComponent {
  state = {
    selectedIndex: 0,
  };

  onPress(selectedIndex) {
    this.setState({
      selectedIndex,
    });
  }

  componentDidMount() {
    const { navigation, scoresheet, dispatch, loading } = this.props;
    const scoresheetId = navigation.getParam('id', null);
    const leagueId = navigation.getParam('league', null);

    dispatch(fetchScoresheet(leagueId, scoresheetId));

    if (!isEmpty(scoresheet)) {
      navigation.setParams({ loading });
    }
  }

  componentDidUpdate(prevProps) {
    const { navigation, scoresheet, loading } = this.props;

    if (loading !== prevProps.loading && !isEmpty(scoresheet)) {
      navigation.setParams({ loading });
    }
  }

  render() {
    const { scoresheet } = this.props;
    const { selectedIndex } = this.state;

    if (isEmpty(scoresheet)) {
      <View>
        <ActivityIndicator />
      </View>;
    }

    const homeScore = get(scoresheet, 'clubs.home.score');
    const awayScore = get(scoresheet, 'clubs.away.score');

    return (
      <View>
        <Result
          home={homeScore}
          away={awayScore}
          style={{ alignSelf: 'center' }}
        />

        <View style={{ marginTop: 30, marginHorizontal: 16 }}>
          <Tabs
            tabs={tabs}
            selectedIndex={selectedIndex}
            onPress={this.onPress.bind(this)}
          />
          {selectedIndex === 0 && (
            <View>
              <Text>{tabs[0]}</Text>
            </View>
          )}
          {selectedIndex === 1 && (
            <View>
              <Text>{tabs[1]}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scoresheet: getActiveScoresheet(state),
  loading: isActiveScoresheetLoading(state),
  error: getActiveScoresheetError(state),
});

export default connect(mapStateToProps)(ScoresheetScreen);

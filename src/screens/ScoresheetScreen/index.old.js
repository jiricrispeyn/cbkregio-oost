import React, { PureComponent } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, get, flatten } from 'lodash';
import { fetchScoresheet } from '../../actions/scoresheet';
import {
  getActiveScoresheet,
  isActiveScoresheetLoading,
  getActiveScoresheetError,
} from '../../selectors';
import Tabs from '../../components/tabs/Tabs';
import Result from '../../components/result';
import { Text } from '../../components/text';
import colors from '../../utils/colors';

const tabs = ['Verloop', 'Blad'];

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
    const { scoresheet, navigation } = this.props;
    const { selectedIndex } = this.state;

    if (isEmpty(scoresheet)) {
      <View>
        <ActivityIndicator />
      </View>;
    }

    const homeScore = get(scoresheet, 'clubs.home.score');
    const awayScore = get(scoresheet, 'clubs.away.score');
    const homeLineup = get(scoresheet, 'clubs.home.lineup', {});
    const awayLineup = get(scoresheet, 'clubs.away.lineup', {});
    const homeName = navigation.getParam('home');
    const awayName = navigation.getParam('away');

    console.log({ scoresheet });

    return (
      <View>
        <Result
          home={homeScore}
          away={awayScore}
          style={{ alignSelf: 'center' }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 14 }}>{homeName}</Text>
          <Text style={{ fontSize: 14, marginLeft: 20 }}>{awayName}</Text>
        </View>

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
              <Tabs
                tabs={[homeName, awayName]}
                selectedIndex={0}
                onPress={e => console.log(e)}
                highlightColor="#B9C2CE"
                style={{
                  backgroundColor: colors.white,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                {flatten(Object.values(homeLineup)).map(player => (
                  <View key={player.id} style={{ flexDirection: 'row' }}>
                    <Text>{player.pair}</Text>
                    <Text>{player.id}</Text>
                    <Text>{player.name}</Text>
                  </View>
                ))}

                {flatten(Object.values(awayLineup)).map(player => (
                  <View key={player.id} style={{ flexDirection: 'row' }}>
                    <Text>{player.pair}</Text>
                    <Text>{player.id}</Text>
                    <Text>{player.name}</Text>
                  </View>
                ))}
              </ScrollView>
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

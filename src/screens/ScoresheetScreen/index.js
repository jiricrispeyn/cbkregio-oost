import React from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, get, flatten } from 'lodash';
import { fetchScoresheet } from '../../actions/scoresheet';
import {
  getActiveScoresheet,
  isActiveScoresheetLoading,
  getActiveScoresheetError,
} from '../../selectors';
import { Text } from '../../components/text';
import Tabs from '../../components/tabs/Tabs';
import Result from '../../components/result';
import colors from '../../utils/colors';

const ScoresheetScreen = ({
  navigation,
  dispatch,
  scoresheet,
  loading,
  error,
}) => {
  return <View />;
};

const mapStateToProps = state => ({
  scoresheet: getActiveScoresheet(state),
  loading: isActiveScoresheetLoading(state),
  error: getActiveScoresheetError(state),
});

export default connect(mapStateToProps)(ScoresheetScreen);

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  getActiveScoresheet,
  isActiveScoresheetLoading,
  getActiveScoresheetError,
} from '../../selectors';

const ScoresheetScreen = () => {
  return <View />;
};

const mapStateToProps = state => ({
  scoresheet: getActiveScoresheet(state),
  loading: isActiveScoresheetLoading(state),
  error: getActiveScoresheetError(state),
});

export default connect(mapStateToProps)(ScoresheetScreen);

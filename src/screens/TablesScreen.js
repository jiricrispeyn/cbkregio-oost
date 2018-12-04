import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import {
  getActiveTables,
  isActiveLeagueDetailLoading,
  getActiveLeagueDetailError,
} from '../selectors';
import { fetchLeagueDetail } from '../actions/league-detail';
import Table from '../components/table/Table';

const tableHead = ['#', 'Club', 'W', 'D', 'L', 'Pt'];

class TablesScreen extends PureComponent {
  state = {
    refreshing: false,
  };

  getTableData(tables) {
    return tables.map(row => {
      const { position, club, won, drawn, lost, points } = row;

      return [position, club, won, drawn, lost, points];
    });
  }

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const league = navigation.getParam('league', null);
    dispatch(fetchLeagueDetail(league));
    navigation.setParams({ loading: this.props.loading });
  }

  componentDidUpdate(prevProps) {
    const { navigation, loading } = this.props;
    if (loading !== prevProps.loading && !this.state.refreshing) {
      navigation.setParams({ loading });
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    const { navigation, dispatch } = this.props;
    const league = navigation.getParam('league', null);
    await dispatch(fetchLeagueDetail(league));
    this.setState({ refreshing: false });
  };

  render() {
    const { refreshing } = this.state;
    const { tables, loading } = this.props;
    const tableData = this.getTableData(tables);

    if (loading && !refreshing && tables.length === 0) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Table head={tableHead} data={tableData} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  scrollView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 15,
    marginHorizontal: 15,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
});

const mapStateToProps = state => ({
  tables: getActiveTables(state),
  loading: isActiveLeagueDetailLoading(state),
  error: getActiveLeagueDetailError(state),
});

export default connect(mapStateToProps)(TablesScreen);

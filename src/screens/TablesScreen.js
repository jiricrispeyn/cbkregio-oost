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
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    const { navigation, dispatch } = this.props;
    const league = navigation.getParam('league', null);
    await dispatch(fetchLeagueDetail(league));
    this.setState({ refreshing: false });
  };

  render() {
    const tableData = this.getTableData(this.props.tables);

    if (this.props.loading && !this.state.refreshing) {
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
              refreshing={this.state.refreshing}
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

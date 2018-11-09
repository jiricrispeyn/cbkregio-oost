import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { getLeagueDetail } from '../config/api';
import { makeCancelable } from '../utils/promise';
import Table from '../components/table/Table';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    refreshing: false,
    tableHead: ['#', 'Club', 'W', 'D', 'L', 'Pt'],
    tableData: [],
  };

  getTableData(tables) {
    return tables.map(row => {
      const { position, club, won, drawn, lost, points } = row;

      return [position, club, won, drawn, lost, points];
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);

    this.cancelablePromise = makeCancelable(getLeagueDetail(league));
    this.cancelablePromise.promise
      .then(({ tables }) => {
        const tableData = this.getTableData(tables);
        this.setState({ tableData, isLoading: false });
      })
      .catch(reason => console.log(reason));
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel();
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    const { tables } = await getLeagueDetail(league);
    const tableData = this.getTableData(tables);
    this.setState({ tableData, refreshing: false });
  };

  render() {
    const { isLoading, tableHead, tableData } = this.state;

    if (isLoading) {
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

export default TablesScreen;

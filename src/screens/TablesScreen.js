import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { API_URL } from '../config/api';
import Table from '../components/table/Table';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    refreshing: false,
    tableHead: ['#', 'Club', 'W', 'D', 'L', 'Pt'],
    tableData: [],
  };

  getLeagueDetail(id) {
    return fetch(`${API_URL}/leagues/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  getTableData(tables) {
    return tables.map(row => {
      const { position, club, won, drawn, lost, points } = row;

      return [position, club, won, drawn, lost, points];
    });
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    const { tables } = await this.getLeagueDetail(league);
    const tableData = this.getTableData(tables);
    this.setState({ tableData, isLoading: false });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    const { tables } = await this.getLeagueDetail(league);
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

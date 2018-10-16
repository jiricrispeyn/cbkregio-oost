import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { API_URL } from '../config/api';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    tableHead: ['#', 'Club', 'W', 'D', 'L', 'Setpt', 'Pt'],
    tableData: [],
  };

  getLeagueDetail(id) {
    return fetch(`${API_URL}/leagues/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  getTableData(tables) {
    return tables.map(row => {
      const { position, club, won, drawn, lost, setpoints, points } = row;

      return [position, club, won, drawn, lost, setpoints, points];
    });
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', '2C');
    const { tables } = await this.getLeagueDetail(league);
    const tableData = this.getTableData(tables);
    this.setState({ tableData, isLoading: false });
  }

  render() {
    const { tableHead, tableData } = this.state;
    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <Table>
            <Row data={tableHead} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    paddingHorizontal: 15,
  },
  scrollView: {
    marginTop: 15,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  text: {
    color: '#fff',
  },
});

export default TablesScreen;

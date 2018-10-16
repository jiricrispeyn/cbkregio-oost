import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { API_URL } from '../config/api';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    tableHead: ['#', 'Club', 'W', 'D', 'L', 'Setpt', 'Pt'],
    tableData: [],
    widthArr: [60, 180, 60, 60, 60, 90, 60],
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
    const { tableHead, tableData, widthArr } = this.state;
    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView horizontal={true}>
            <Table style={styles.table}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.tableHeadStyle}
                borderStyle={styles.tableHeadBorder}
                textStyle={styles.tableHeadText}
              />
              <Rows
                data={tableData}
                widthArr={widthArr}
                style={styles.tableDataStyle}
                textStyle={styles.tableDataText}
              />
            </Table>
          </ScrollView>
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
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  tableHeadBorder: {
    borderRightWidth: 0,
  },
  tableHeadStyle: {
    height: 40,
  },
  tableHeadText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F96A0',
    paddingHorizontal: 16,
  },
  scrollView: {
    marginTop: 15,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  tableDataStyle: {
    height: 52,
  },
  tableDataText: {
    paddingHorizontal: 16,
    fontSize: 12,
  },
});

export default TablesScreen;

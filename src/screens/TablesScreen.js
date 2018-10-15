import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from '../components/table/Table';
import { API_URL } from '../config/api';

class TablesScreen extends PureComponent {
  state = {
    tables: [],
    isLoading: true,
  };

  getLeagueDetail(id) {
    return fetch(`${API_URL}/leagues/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', '2C');
    const { tables } = await this.getLeagueDetail(league);
    this.setState({ tables, isLoading: false });
  }

  render() {
    const { tables } = this.state;
    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <Table style={styles.table}>
            <TableRow>
              <TableHeader text="#" />
              <TableHeader text="Club" />
              <TableHeader text="W" />
              <TableHeader text="D" />
              <TableHeader text="L" />
              <TableHeader text="Setpt" />
              <TableHeader text="Pt" />
            </TableRow>
            {tables.map((row, i) => (
              <TableRow key={i}>
                <TableCell text={row.position} />
                <TableCell text={row.club} />
                <TableCell text={row.won} />
                <TableCell text={row.drawn} />
                <TableCell text={row.lost} />
                <TableCell text={row.setpoints} />
                <TableCell text={row.points} />
              </TableRow>
            ))}
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
});

export default TablesScreen;

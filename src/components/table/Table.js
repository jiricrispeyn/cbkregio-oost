import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Table = props => {
  const { children } = props;
  return <View style={styles.table}>{children}</View>;
};

export const TableRow = props => {
  const { children } = props;
  return <View style={styles.tableRow}>{children}</View>;
};

export const TableCell = props => {
  const { text, style, textStyle } = props;
  return (
    <View style={[styles.tableCell, style]}>
      <Text style={[styles.tableCellText, textStyle]}>{text}</Text>
    </View>
  );
};

export const TableHeader = props => {
  const { text, style, textStyle } = props;
  return (
    <View style={[styles.tableHeader, style]}>
      <Text style={[styles.tableHeaderText, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tableCell: {
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  tableCellText: {
    fontSize: 12,
    color: '#0E1D31',
  },
  tableHeader: {
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F96A0',
  },
});

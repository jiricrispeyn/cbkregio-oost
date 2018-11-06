import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../utils/colors';

function getCellStyle(head, pos, suffix) {
  switch (head[pos]) {
    case '#':
      return styles[`positionCell${suffix}`];
    case 'Club':
      return styles[`clubCell${suffix}`];
    case 'W':
    case 'L':
    case 'D':
      return styles[`matchesCell${suffix}`];
    case 'Pt':
      return styles[`pointsCell${suffix}`];
    default:
      return;
  }
}

const Table = ({ head, data, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styles.headerRow]}>
        {head.map((cell, i) => (
          <View
            style={[styles.cellWrapper, getCellStyle(head, i, 'Wrapper')]}
            key={i}
          >
            <Text
              style={[styles.cell, getCellStyle(head, i), styles.headerText]}
            >
              {cell}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.data}>
        {data.map((row, i) => (
          <View key={i} style={[styles.row, styles.dataRow]}>
            {row.map((cell, j) => (
              <View
                key={j}
                style={[
                  styles.cellWrapper,
                  getCellStyle(head, j, 'Wrapper'),
                  i < 2 && { backgroundColor: colors.whisper },
                ]}
              >
                <Text
                  style={[styles.cell, getCellStyle(head, j), styles.dataText]}
                  numberOfLines={1}
                >
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
  cellWrapper: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionCellWrapper: {
    width: 30,
    borderRightWidth: 1,
    borderColor: colors.mystic,
  },
  clubCellWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 16,
  },
  matchesCellWrapper: {
    width: 35,
  },
  pointsCellWrapper: {
    width: 35,
  },
  cell: {
    color: colors.firefly,
    fontSize: 12,
  },
  positionCell: {
    fontWeight: '500',
    color: colors.firefly,
  },
  clubCell: {},
  matchesCell: {
    fontWeight: '500',
    color: colors.manatee,
  },
  pointsCell: {
    width: 35,
    fontWeight: '500',
    letterSpacing: 0.14,
    color: colors.firefly,
    backgroundColor: 'green',
  },
  headerRow: {
    height: 40,
  },
  dataRow: {
    height: 52,
    borderTopWidth: 1,
    borderColor: colors.mystic,
  },
  headerText: {
    color: colors.manatee,
    fontWeight: '500',
  },
  dataText: {},
});

export default Table;

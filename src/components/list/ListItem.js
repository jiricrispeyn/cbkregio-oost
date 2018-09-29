import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class ListItem extends PureComponent {
  state = {};
  render() {
    const {
      title,
      rightTitle,
      subtitle,
      divider,
      isFirst,
      isLast,
      onPress
    } = this.props;
    return (
      <View>
        {divider && <View style={styles.divider} />}
        <TouchableOpacity
          style={[
            styles.listItem,
            isFirst && styles.firstListItem,
            isLast && styles.lastListItem
          ]}
          onPress={onPress}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            {rightTitle && <Text style={styles.rightTitle}>{rightTitle}</Text>}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    padding: 30
  },
  firstListItem: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  lastListItem: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    color: '#1D1D26',
    letterSpacing: 0.19
  },
  rightTitle: {
    fontSize: 13,
    color: 'rgba(29, 29, 38, .5)'
  },
  subtitle: {
    marginTop: 5,
    fontSize: 13,
    color: 'rgba(29, 29, 38, .5)'
  },
  divider: {
    height: 1,
    backgroundColor: '#D9E0E9'
  }
});

export default ListItem;

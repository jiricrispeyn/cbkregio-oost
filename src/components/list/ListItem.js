import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class ListItem extends PureComponent {
  state = {};
  render() {
    const { title, rightTitle, subtitle, divider, onPress } = this.props;
    return (
      <View>
        {divider && <View style={styles.divider} />}
        <TouchableOpacity style={styles.listItem} onPress={onPress}>
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
    padding: 30
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    color: '#1D1D26'
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
    backgroundColor: 'rgba(29, 29, 38, .1)'
  }
});

export default ListItem;

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class ListItem extends PureComponent {
  state = {};
  render() {
    const {
      title,
      rightTitle,
      rightIcon,
      subtitle,
      divider,
      onPress,
    } = this.props;
    return (
      <View>
        {divider && <View style={styles.divider} />}
        <TouchableOpacity style={styles.listItem} onPress={onPress}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            {rightTitle && <Text style={styles.rightTitle}>{rightTitle}</Text>}
            {rightIcon && (
              <MaterialIcons
                name={rightIcon}
                size={32}
                style={styles.rightIcon}
              />
            )}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 30,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#1D1D26',
    letterSpacing: 0.19,
  },
  rightTitle: {
    fontSize: 12,
    color: '#8F96A0',
  },
  rightIcon: {
    color: '#CED4DB',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: '#8F96A0',
  },
  divider: {
    height: 1,
    backgroundColor: '#D9E0E9',
  },
});

export default ListItem;

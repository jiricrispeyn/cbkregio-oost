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
      isFirst,
      isLast,
      divider,
      onPress,
      listItemStyle,
    } = this.props;
    return (
      <View>
        {divider && <View style={styles.divider} />}
        <TouchableOpacity
          style={[
            styles.listItem,
            isFirst && styles.isFirst,
            isLast && styles.isLast,
            listItemStyle,
          ]}
          onPress={onPress}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            {rightTitle && <Text style={styles.rightTitle}>{rightTitle}</Text>}
            {rightIcon && (
              <MaterialIcons
                name={rightIcon}
                size={30}
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
    backgroundColor: '#fff',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#0E1D31',
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
  isFirst: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  isLast: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9E0E9',
  },
});

export default ListItem;

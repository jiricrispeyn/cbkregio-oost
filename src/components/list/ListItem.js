import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../utils/colors';

const ListItem = props => {
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
    component: Component = onPress ? TouchableOpacity : View,
  } = props;
  return (
    <View>
      {divider && <View style={styles.divider} />}
      <Component
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
      </Component>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 30,
    backgroundColor: colors.white,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: colors.firefly,
    letterSpacing: 0.19,
  },
  rightTitle: {
    fontSize: 12,
    color: colors.manatee,
  },
  rightIcon: {
    color: colors.mischka,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: colors.manatee,
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
    backgroundColor: colors.mystic,
  },
});

export default ListItem;

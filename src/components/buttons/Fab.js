import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors, { blueGradient } from '../../utils/colors';

const Fab = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={blueGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.fab}
      >
        <EvilIcons
          name={icon}
          size={24}
          color={colors.white}
          style={styles.icon}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

Fab.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    shadowColor: colors.black,
    shadowOffset: {
      x: 0,
      y: 20,
    },
    shadowOpacity: 0.8,
    shadowRadius: 40,
  },
  icon: {
    top: 1,
  },
});

export default Fab;

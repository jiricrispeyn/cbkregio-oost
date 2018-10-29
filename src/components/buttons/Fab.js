import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const Fab = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#25ABFB', '#1073F5']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.fab}
      >
        <EvilIcons name={icon} size={24} color="#fff" style={styles.icon} />
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
    shadowColor: '#000',
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

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class CustomHeader extends PureComponent {
  state = {};

  _getTitle(scene) {
    const { title } = scene.descriptor.options;

    return title;
  }

  _getLastScene(scene) {
    return this.props.scenes.find(s => s.index === scene.index - 1);
  }

  _getParentTitle(scene) {
    const lastScene = this._getLastScene(scene);

    if (!lastScene) {
      return null;
    }

    return this._getTitle(lastScene);
  }

  _renderParentTitle(title) {
    if (!title) {
      return;
    }

    const { navigation, key } = this.props.scene.descriptor;
    const goBack = () => {
      // Go back on next tick because button ripple effect needs to happen on Android
      requestAnimationFrame(() => {
        navigation.goBack(key);
      });
    };

    return (
      <TouchableOpacity style={styles.parentTitleWrapper} onPress={goBack}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={32}
          style={styles.backIcon}
        />
        <Text style={styles.parentTitle}>{title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const largeTitle = this._getTitle(this.props.scene);
    const parentTitle = this._getParentTitle(this.props.scene);

    return (
      <View style={styles.container}>
        {this._renderParentTitle(parentTitle)}
        <Text style={styles.largeTitle}>{largeTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: '#172E4C',
    height: 116,
    paddingTop: 36,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 16
  },
  largeTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '600'
  },
  parentTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  parentTitle: {
    color: '#fff',
    fontSize: 15
  },
  backIcon: {
    color: '#fff'
  }
});

export default CustomHeader;

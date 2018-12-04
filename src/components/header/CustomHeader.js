import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import colors from '../../utils/colors';
import { get } from 'lodash';

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
        <EvilIcons name="chevron-left" size={32} style={styles.backIcon} />
        <Text style={styles.parentTitle}>{title}</Text>
      </TouchableOpacity>
    );
  }

  _getLoading(scene) {
    const isLoading = get(scene, 'route.params.loading');

    if (!isLoading) {
      return null;
    }

    return <ActivityIndicator />;
  }

  render() {
    const largeTitle = this._getTitle(this.props.scene);
    const parentTitle = this._getParentTitle(this.props.scene);
    const loader = this._getLoading(this.props.scene);

    return (
      <View style={styles.container}>
        <View style={styles.parentTitleContainer}>
          {this._renderParentTitle(parentTitle)}
          {loader}
        </View>
        <Text style={styles.largeTitle}>{largeTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: colors.firefly,
    height: 116,
    paddingTop: 36,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 16,
  },
  largeTitle: {
    color: colors.white,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '600',
  },
  parentTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    marginLeft: -8,
  },
  parentTitle: {
    color: colors.white,
    fontSize: 15,
  },
  backIcon: {
    top: 1,
    color: colors.white,
  },
});

export default CustomHeader;

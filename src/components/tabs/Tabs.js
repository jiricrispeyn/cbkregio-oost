import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';

class Tabs extends PureComponent {
  state = {};

  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedIndex: PropTypes.number,
    onPress: PropTypes.func,
    scroll: PropTypes.bool,
    style: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    highlightColor: PropTypes.string,
  };

  static defaultProps = {
    selectedIndex: 0,
    scroll: false,
    highlightColor: colors.dodgerBlue,
  };

  renderTab(tab, i) {
    const {
      selectedIndex,
      onPress,
      tabStyle,
      scroll,
      highlightColor,
    } = this.props;
    const isSelected = selectedIndex === i;
    return (
      <TouchableOpacity
        key={i}
        style={[styles.tab, scroll ? { width: 155 } : { flex: 1 }, tabStyle]}
        onPress={() => onPress(i)}
      >
        {i > 0 && <View style={styles.tabDivider} />}
        <View style={styles.tabTextWrapper}>
          <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
            {tab}
          </Text>
        </View>
        {isSelected && (
          <View
            style={[
              styles.selectedTabBorder,
              { backgroundColor: highlightColor },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  }

  renderTabs(tabs) {
    return tabs.map((tab, i) => this.renderTab(tab, i));
  }

  render() {
    const { tabs, style, scroll } = this.props;

    return (
      <View style={[styles.tabs, style]}>
        {scroll ? (
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {this.renderTabs(tabs)}
          </ScrollView>
        ) : (
          this.renderTabs(tabs)
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 60,
    backgroundColor: colors.whisper,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.mystic,
  },
  scrollView: {},
  tab: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    color: colors.manatee,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.14,
  },
  selectedTabText: {
    color: colors.firefly,
  },
  tabTextWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  tabDivider: {
    width: 1,
    height: 10,
    backgroundColor: colors.athensGray,
  },
  selectedTabBorder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
  },
});

export default Tabs;

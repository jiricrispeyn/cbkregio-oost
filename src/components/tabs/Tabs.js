import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

class Tabs extends PureComponent {
  state = {};

  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedIndex: PropTypes.number,
    onPress: PropTypes.func,
    scroll: PropTypes.bool,
    style: PropTypes.object,
    tabStyle: PropTypes.object,
    highlightColor: PropTypes.string,
  };

  static defaultProps = {
    selectedIndex: 0,
    scroll: false,
    highlightColor: '#25ABFB',
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
    backgroundColor: '#FAFAFC',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9E0E9',
  },
  scrollView: {},
  tab: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    color: '#8F96A0',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.14,
  },
  selectedTabText: {
    color: '#0E1D31',
  },
  tabTextWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  tabDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#E0E4EA',
  },
  selectedTabBorder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
  },
});

export default Tabs;

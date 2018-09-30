import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

class Tabs extends PureComponent {
  state = {};

  renderTab(tab, i) {
    const { selectedIndex, onPress } = this.props;
    const isSelected = selectedIndex === i;
    return (
      <TouchableOpacity key={i} style={styles.tab} onPress={() => onPress(i)}>
        {i > 0 && <View style={styles.tabDivider} />}
        <View style={styles.tabTextWrapper}>
          <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
            {tab}
          </Text>
        </View>
        {isSelected && <View style={styles.selectedTabBorder} />}
      </TouchableOpacity>
    );
  }

  renderDivider() {}

  render() {
    const { tabs, style } = this.props;
    return (
      <View style={[styles.tabs, style]}>
        <ScrollView
          style={styles.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((tab, i) => this.renderTab(tab, i))}
        </ScrollView>
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
    borderBottomColor: '#D9E0E9'
  },
  scrollView: {},
  tab: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: 115
  },
  tabText: {
    color: '#8F96A0',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.14
  },
  selectedTabText: {
    color: '#0E1D31'
  },
  tabTextWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  tabDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#E0E4EA'
  },
  selectedTabBorder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#25ABFB'
  }
});

export default Tabs;

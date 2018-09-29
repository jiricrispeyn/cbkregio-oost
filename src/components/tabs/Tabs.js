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
    return (
      <TouchableOpacity key={i} style={styles.tab}>
        {i > 0 && <View style={styles.tabDivider} />}
        <Text style={styles.tabText}>{tab}</Text>
      </TouchableOpacity>
    );
  }

  renderDivider() {}

  render() {
    const { tabs } = this.props;
    return (
      <View style={styles.tabs}>
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
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FAFAFC',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  scrollView: {},
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 115
  },
  tabText: {
    color: '#0E1D31',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.14
  },
  tabDivider: {
    alignSelf: 'flex-start',
    width: 1,
    height: 10,
    backgroundColor: '#E0E4EA'
  }
});

export default Tabs;

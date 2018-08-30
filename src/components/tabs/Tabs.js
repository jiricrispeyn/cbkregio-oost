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

  getTabIconColor(i) {
    switch (i) {
      case 0:
        return '#50D2C2';
      case 1:
        return '#D667CD';
      case 2:
        return '#FFC000';
      case 3:
        return '#00B9FF';
      default:
        return '#fff';
    }
  }

  renderTab(tab, i) {
    return (
      <TouchableOpacity key={i} style={styles.tab}>
        <View
          style={[styles.tabIcon, { borderColor: this.getTabIconColor(i) }]}
        />
        <Text style={styles.tabText}>{tab}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { tabs } = this.props;
    return (
      <View style={styles.tabs}>
        <ScrollView
          style={styles.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View width={5} />
          {tabs.map((tab, i) => this.renderTab(tab, i))}
          <View width={15} />
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
    backgroundColor: '#6563A4'
  },
  scrollView: {},
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 11,
    marginLeft: 10,
    borderColor: 'rgba(255, 255, 255, .2)',
    borderWidth: 1,
    borderRadius: 18
  },
  tabIcon: {
    width: 11,
    height: 11,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 6
  },
  tabText: {
    color: '#fff',
    fontSize: 13
  }
});

export default Tabs;

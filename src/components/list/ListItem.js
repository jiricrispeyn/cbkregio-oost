import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";

class ListItem extends PureComponent {
  state = {};
  render() {
    const { title, divider } = this.props;
    return (
      <View>
        {divider && <View style={styles.divider} />}
        <View style={styles.listItem}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 30
  },
  title: {
    fontSize: 16,
    color: "#1D1D26"
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(29, 29, 38, .1)"
  }
});

export default ListItem;

import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

class ListItem extends PureComponent {
  state = {};
  render() {
    const { title, divider, onPress } = this.props;
    return (
      <View>
        {divider && <View style={styles.divider} />}
        <TouchableOpacity style={styles.listItem} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
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

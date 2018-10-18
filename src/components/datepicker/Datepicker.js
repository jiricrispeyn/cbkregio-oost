import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import format from 'date-fns/format';
import locale from 'date-fns/locale/nl';

class Datepicker extends PureComponent {
  state = {};

  renderDateCircle(date, i) {
    const isDisabled = this.props.disabled.includes(date);
    const day = format(date, 'D', { locale });
    const month = format(date, 'MMM', { locale });
    return (
      <View style={styles.dateContainer} key={i}>
        <TouchableOpacity
          style={[
            styles.dateLink,
            isDisabled && styles.dateLinkDisabled,
            i === 0 && styles.dateLinkFirst,
          ]}
        >
          <Text style={styles.dateTextDay}>{day}</Text>
          <Text style={styles.dateTextMonth}>{month}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { dates, style } = this.props;
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView, style]}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {dates.map((date, i) => this.renderDateCircle(date, i))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  dateLink: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#26446B',
  },
  dateLinkDisabled: {
    opacity: 0.2,
  },
  dateLinkFirst: {
    marginLeft: 0,
  },
  dateTextDay: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D618F',
  },
  dateTextMonth: {
    fontSize: 10,
    color: '#3D618F',
  },
});

export default Datepicker;

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import format from 'date-fns/format';
import locale from 'date-fns/locale/nl';

class Datepicker extends PureComponent {
  state = {};

  renderDate(date, i) {
    const { onPress, selected, disabled } = this.props;
    const isDisabled = disabled.includes(date);
    const day = format(date, 'D', { locale });
    const month = format(date, 'MMM', { locale });
    const containerStyle = [styles.dateContainer, i === 0 && styles.firstDate];

    if (date === selected) {
      return (
        <View style={containerStyle} key={i}>
          {this.renderSelected(day, month)}
        </View>
      );
    }

    return (
      <View style={containerStyle} key={i}>
        <TouchableOpacity
          style={[
            styles.circle,
            styles.circleBorder,
            isDisabled && styles.disabledTouchable,
          ]}
          onPress={() => !isDisabled && onPress(date)}
        >
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.monthText}>{month}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderSelected(day, month) {
    return (
      <LinearGradient
        colors={['#00B6FF', '#007FFF']}
        start={[1, 1]}
        end={[0, 0]}
        style={styles.circle}
      >
        <Text style={[styles.dayText, styles.selectedText]}>{day}</Text>
        <Text style={[styles.monthText, styles.selectedText]}>{month}</Text>
      </LinearGradient>
    );
  }

  render() {
    const { dates, style } = this.props;

    if (!dates) {
      return;
    }

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView, style]}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {dates.map((date, i) => this.renderDate(date, i))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  dateContainer: {
    marginLeft: 20,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  circleBorder: {
    borderWidth: 1,
    borderColor: '#3a68a3',
  },
  disabledTouchable: {
    opacity: 0.3,
  },
  firstDate: {
    marginLeft: 0,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5e87ba',
  },
  monthText: {
    fontSize: 10,
    color: '#5e87ba',
  },
  selectedText: {
    color: '#fff',
  },
});

export default Datepicker;

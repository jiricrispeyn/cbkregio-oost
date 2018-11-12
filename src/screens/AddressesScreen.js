import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Clipboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getAddresses } from '../config/api';
import { makeCancelable } from '../utils/promise';
import Swipeout from 'react-native-swipeout';
import { createOpenLink } from 'react-native-open-maps';
import ListItem from '../components/list/ListItem';
import colors from '../utils/colors';

export default class AddressesScreen extends PureComponent {
  state = {
    addresses: [],
    isLoading: true,
    rowID: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);

    this.cancelablePromise = makeCancelable(getAddresses(league));
    this.cancelablePromise.promise
      .then(({ addresses }) => {
        const filteredAddresses = addresses.filter(
          ({ address }) => address.length > 0
        );
        this.setState({ addresses: filteredAddresses, isLoading: false });
      })
      .catch(reason => console.log(reason));
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel();
    }
  }

  swipeoutBtns(address) {
    return [
      {
        text: this.renderSwipeoutBtn('Kopieer', 'tel. nr.'),
        type: 'default',
        onPress: () =>
          this.onCopy(
            address.phone,
            `Telefoonnummer ${address.club} gekopieerd.`
          ),
      },
      {
        text: this.renderSwipeoutBtn('Kopieer', 'adres'),
        type: 'secondary',
        onPress: () =>
          this.onCopy(address.address, `Adres ${address.club} gekopieerd.`),
      },
      {
        text: this.renderSwipeoutBtn('Open', 'Kaart'),
        type: 'primary',
        onPress: createOpenLink({ query: address.address }),
      },
    ];
  }

  onCopy(item, text) {
    Clipboard.setString(item);
    Alert.alert(text);
  }

  renderSwipeoutBtn(title, subtitle) {
    return (
      <View style={styles.swipeoutBtn}>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={styles.swipeoutBtnText}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={styles.swipeoutBtnText}
          >
            {subtitle}
          </Text>
        )}
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          {this.state.addresses.map((address, i) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.divider} />}
              <Swipeout
                style={[
                  i === 0 && styles.isFirst,
                  i === this.state.addresses.length - 1 && styles.isLast,
                ]}
                backgroundColor={colors.white}
                close={this.state.rowID !== i}
                key={i}
                rowID={i}
                right={this.swipeoutBtns(address)}
                onOpen={(sectionID, rowID) => {
                  this.setState({ rowID });
                }}
              >
                <ListItem
                  title={address.club}
                  subtitle={address.address}
                  rightTitle={address.place}
                />
              </Swipeout>
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    paddingHorizontal: 15,
  },
  scrollView: {
    marginTop: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: colors.mystic,
  },
  isFirst: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  isLast: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  swipeoutBtnText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
  },
});

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
import { connect } from 'react-redux';
import { fetchAddresses } from '../actions/addresses';
import {
  getActiveAddresses,
  isActiveAddressesLoading,
  getActiveAddressesError,
} from '../selectors';
import Swipeout from 'react-native-swipeout';
import { createOpenLink } from 'react-native-open-maps';
import ListItem from '../components/list/ListItem';
import colors from '../utils/colors';

class AddressesScreen extends PureComponent {
  state = {
    rowID: null,
    scrollEnabled: true,
  };

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const league = navigation.getParam('league', null);
    dispatch(fetchAddresses(league));
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
    const { addresses, loading } = this.props;

    if (loading && addresses.length === 0) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          scrollEnabled={this.state.scrollEnabled}
        >
          {addresses
            .filter(address => address.club !== 'BYE - VRIJ')
            .map((address, i) => (
              <React.Fragment key={i}>
                {i > 0 && <View style={styles.divider} />}
                <Swipeout
                  style={[
                    i === 0 && styles.isFirst,
                    i === addresses.length - 1 && styles.isLast,
                  ]}
                  backgroundColor={colors.white}
                  close={this.state.rowID !== i}
                  key={i}
                  rowID={i}
                  right={this.swipeoutBtns(address)}
                  onOpen={(sectionID, rowID) => {
                    this.setState({ rowID });
                  }}
                  scroll={scrollEnabled => this.setState({ scrollEnabled })}
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

const mapStateToProps = state => ({
  addresses: getActiveAddresses(state),
  loading: isActiveAddressesLoading(state),
  error: getActiveAddressesError(state),
});

export default connect(mapStateToProps)(AddressesScreen);

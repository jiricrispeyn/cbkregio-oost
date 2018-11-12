import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAddresses } from '../config/api';
import { makeCancelable } from '../utils/promise';
import Swipeout from 'react-native-swipeout';
import { createOpenLink } from 'react-native-open-maps';

export default class AddressesScreen extends PureComponent {
  state = {
    addresses: [],
    isLoading: true,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', '2C');

    this.cancelablePromise = makeCancelable(getAddresses(league));
    this.cancelablePromise.promise
      .then(({ addresses }) => {
        console.log(addresses);
        this.setState({ addresses, isLoading: false });
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
        text: 'Kaart',
        onPress: createOpenLink({ query: address.address }),
      },
    ];
  }

  render() {
    return (
      <>
        {this.state.addresses.map((address, i) => (
          <Swipeout key={i} right={this.swipeoutBtns(address)}>
            <View>
              <Text>{address.club}</Text>
              <Text>{address.address}</Text>
            </View>
          </Swipeout>
        ))}
      </>
    );
  }
}

const styles = StyleSheet.create({});

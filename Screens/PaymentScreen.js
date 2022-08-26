import React, {Component} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
export default class PaymentScreen extends Component<Props> {

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.button1}>
          <Button
            title="Credit Card"
            onPress={() => {
              this.props.navigation.navigate ('CreditCard');
            }}
          />
        </View>
        <View style={styles.button2}>
          <Button
            title="Online Banking"
            onPress={() => {
              this.props.navigation.navigate ('OnlineBanking');
            }}
          />
        </View>
        <View style={styles.button3}>
          <Button
            title="E-wallet"
            onPress={() => {
              this.props.navigation.navigate ('E-wallet');
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    marginTop: 30,
    marginBottom: 50,
  },
    
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  button1: {
    marginTop: 20,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    
  },
  button2: {
    marginTop: 20,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    
  },
  button3: {
    marginTop: 20,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    
  },
});
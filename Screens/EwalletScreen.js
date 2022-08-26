import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, Button} from 'react-native';
export default class EwalletCardScreen extends Component<Props> {
  render () {
    return (
      <View>
      <View style={styles.container}>
        <Image
          style={{
            resizeMode: "contain",
            height: 400,
            width: 400,
            position: 'absolute', top: 20
          }}
          source={require("../assets/qrcode.jpg")}
        />
        <Text style = {styles.text}>Please scan the QR code above to make payment</Text>
        
        </View>
        <View style={styles.button}>
          <Button
            title="Scanned"
            onPress={() => {
              this.props.navigation.navigate ('Successful Payment');
            }}
          />
        </View>
        </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    position: 'absolute', top: 420
  },

    button: {
      position: 'relative', top: 530,
      alignItems: 'center',
      justifyContent: 'center'
  },
});
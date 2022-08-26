import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TextInput, Button} from 'react-native';
export default class CreditCardScreen extends Component<Props> {
  render () {
    return (
      <View>
        <View style={styles.button}>
          <Button
            title="Pay Now"
            onPress={() => {
              this.props.navigation.navigate ('Successful Payment');
            }}
          />
        </View>
        <View>
        <Image
          style={{
            resizeMode: "contain",
            height: 400,
            width: 400,
            marginLeft: 5,
            marginRight: 20,
            position: 'absolute', top: -100
          }}
          source={require("../assets/card.jpg")}
        />
        </View>
        <View style={styles.container}>
        <View>
        <TextInput style={styles.input} 
          name='input'
          placeholder="Card Number (16 digits)"
          keyboardType="numeric"
        />
        </View>
      
        <View>
        <TextInput style={styles.input} 
          name='input2'
          placeholder="Cardholder Name"
          keyboardType="default"
        />
        </View>
     
        <View>
        <TextInput style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          keyboardType="default"
        />
        </View>

        <View>
        <TextInput style={styles.input}
          placeholder="CVV/CVV2"
          keyboardType="default"
        />
        </View>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create ({

  container:{
    position: 'relative', top: 220,
  },
  input: {
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    padding: 10
  },

  button: {
  position: 'relative', top: 530,
  alignItems: 'center',
  justifyContent: 'center',
  },

});
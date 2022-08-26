import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, Button, Alert} from 'react-native';
let config = require('./../Config');

export default class PaymentSuccessful extends Component<Props> {
  constructor(props) {
    super(props);

    this._deleteAll = this._deleteAll.bind(this);
  }

  //Run after checking out
  _deleteAll(){
    let url =
      config.settings.serverPath + '/api/carts';
    console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected == 0) {
          Alert.alert('Error in DELETING');
        }
      })
      .catch(error => {
        console.error(error);
      });
      
      this.props.navigation.replace('DrawerNavigation',{screen:'Home',
      params:{screen:'CartTab'},});
  }

  render () {
    return (
      <View>
      <View style={styles.container}>
        <Image
          style={{
            resizeMode: "contain",
            height: 400,
            width: 400,
            position: 'absolute', top: 10
          }}
          source={require("../assets/payment-success.png")}
        />
        <Text style = {styles.text}>Your payment has been successfully!</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Done"
            onPress={this._deleteAll}
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
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    position: 'absolute', top: 370
  },
  button: {
    position: 'relative', top: 530,
    alignItems: 'center',
    justifyContent: 'center'
},  
});
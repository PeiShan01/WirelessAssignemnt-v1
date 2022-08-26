import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native'; 

export default class OnlineBankingScreen extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <View>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate ('Successful Payment')}}>
          <Image style={styles.image1} source={require('../assets/cimb.jpg')} />
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate ('Successful Payment')}}>
          <Image style={styles.image2} source={require('../assets/maybank.jpg')} />
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate ('Successful Payment')}}>
          <Image style={styles.image3} source={require('../assets/public.jpg')} />
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate ('Successful Payment')}}>
          <Image style={styles.image4} source={require('../assets/hl.jpg')} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  image1: {
    resizeMode: "contain",
            height: 400,
            width: 420,
            position: 'absolute', top: -120
  },
  image2: {
    resizeMode: "contain",
            height: 400,
            width: 420,
            position: 'absolute', top: 30
  },
  image3: {
    resizeMode: "contain",
            height: 400,
            width: 420,
            position: 'absolute', top: 185
  },
  image4: {
    resizeMode: "contain",
            height: 400,
            width: 420,
            position: 'absolute', top: 330
  },
});
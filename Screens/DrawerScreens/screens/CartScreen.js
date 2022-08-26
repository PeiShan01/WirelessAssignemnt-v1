import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Products from '../../Products';

let config = require('../../../Config');

export default class CartScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      carts: [],
      isFetching: false,
      totalPrice: 0,
    };
    this._load = this._load.bind(this);
    this._getSum = this._getSum.bind(this);
  }

  _load() {
    let url = config.settings.serverPath + '/api/carts';
    fetch(url)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })
      .then(carts => {
        console.log(carts);
        this.setState({carts: carts});
      })
      .catch(error => {
        console.log(error);
        this._load;
      });
      
  }

  _getSum() {
    let url = config.settings.serverPath + '/api/carts/sum';
    fetch(url)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })
      .then(sum => {
        console.log(sum);
        this.setState({totalPrice: parseFloat(sum).toFixed(2).toString()});
      })
      .catch(error => {
        console.log(error);
      });
      
  }

  componentDidMount() {
    this._load();
    this._getSum();
  }

  render () {
    return (
      <View style={{paddingBottom: 50}}>
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          data={this.state.carts}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          
          renderItem={({item}) => (
          <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ProductDetail', {
                  id: item.id,
                  headerTitle: item.name,
                  refresh: this._load(),
                });
              }}>
          <Products>
            <Image source={{uri: item.image}} style={{
              width:200,
              height:200,
              margin:5,   
            }}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quantity: {item.quantity}</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>RM{item.price}</Text>
          </Products>
          </TouchableOpacity>
          )}
        />
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:20,flexDirection:'column',fontWeight:'bold'}}>Total Price: RM{this.state.totalPrice}</Text>
            <TouchableOpacity style={{height:40, width:100, flexDirection:'column',flex:1, marginLeft:20 ,marginTop:5,backgroundColor:'yellow', borderColor: "#FBB741",}} 
            onPress={() => {
              this.props.navigation.navigate ('Payment');
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>Checkout</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
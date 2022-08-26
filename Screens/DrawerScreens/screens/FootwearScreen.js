import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Products from '../../Products';

let config = require('../../../Config');

export default class FootwearScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      products: [],
    };
    this._loadByCategory = this._loadByCategory.bind(this);
  }

  _loadByCategory() {
    let url = config.settings.serverPath + '/api/products/Footwear';
    this.setState({isFetching: true});
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
      .then(products => {
        console.log(products);
        this.setState({products: products});
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this._loadByCategory();
  }

  render () {
    return (
      <View style = {{paddingVertical: 10}}>
        <FlatList
          data={this.state.products}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          
          renderItem={({item}) => (
          <TouchableOpacity
              underlayColor="pink"
              onPress={() => {
                this.props.navigation.navigate('ProductDetail', {
                  id: item.id,
                  headerTitle: item.name,
                });
              }}>
          <Products>
            <Image source={{uri: item.image}} style={{
              width:150,
              height:150,
              margin:5,   
            }}/>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>RM{item.price}</Text>
          </Products>
          </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

import React, {Component} from 'react';
import {Alert, Text, StyleSheet, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/AntDesign';
import Products from './Products'
import Ion from 'react-native-vector-icons/Ionicons';

let config = require('./../Config');


export default class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.route.params.id,
      quantity:'1',
      product: null,
    };

    this._loadByID = this._loadByID.bind(this);
    this._addCart = this._addCart.bind(this);
  }

  _loadByID() {
    let url = config.settings.serverPath + '/api/products/' + this.state.productID;
    console.log(url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(product => {
        this.setState({product: product});
      })
      .catch(error => {
        console.error(error);
        this._loadByID;
      });
  }

  _addCart() {
    let url = config.settings.serverPath + '/api/carts';
    let amount = (parseFloat(this.state.product.price) * parseInt(this.state.quantity)).toFixed(2);

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.product.name,
        image: this.state.product.image,
        price: amount,
        quantity: this.state.quantity,
      }),
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(respondJson => {
        if (respondJson.affected > 0) {
          Alert.alert('Record ADDED for', this.state.products.name);
        } else {
          Alert.alert('Error in ADDING');
        }
      })
      .catch(error => {
        console.log(error);
      });

      this.props.navigation.replace('DrawerNavigation',{screen:'Home',
        params:{screen:'CartTab'},});
  }

  handleIncrement = () => {
    this.setState({
      quantity: (Number(this.state.quantity) + Number(1)).toString(),
    })
  }

  handleDecrement = () => {
    if(Number(this.state.quantity)>1){
    this.setState({
      quantity: (Number(this.state.quantity) - Number(1)).toString(),
    })
  }
  }

  componentDidMount() {
    this._loadByID();
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.product.name});
  }

  render() {
    let product = this.state.product;
    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom:10,
            borderColor: '#000',
            }}>
            <Image source={{uri: product ? product.image : ''}} 
                style={{
                width: '40%',
                height: undefined,
                aspectRatio: 1,
            }}/>
        </View>

        <TextInput
            style={{fontWeight: 'bold', color: 'black', fontSize: 20}}
            value={product ? product.name : ''}
            multiline={true}
            editable={false}
        />

        <TextInput
            style={{fontWeight: 'bold', color: 'red', fontSize: 20}}
            value={product ? product.price : ''}
            editable={false}
        />

        <View style={{flexDirection:'row', margin:10}}>
          <TouchableOpacity style={{height:40, width:50, flexDirection:'column', backgroundColor:'yellow', borderColor: "#FBB741",}} onPress={this.handleDecrement}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>-</Text>
          </TouchableOpacity>
          <Text style={{height:40, width:100, borderWidth:1, borderColor:'#ccc' ,textAlign:'center',fontWeight: 'bold', color: 'red', fontSize: 20}}>{this.state.quantity}</Text>
          <TouchableOpacity style={{height:40, width:50, flexDirection:'column', backgroundColor:'yellow', borderColor: "#FBB741",}} onPress={this.handleIncrement}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>+</Text>
          </TouchableOpacity>
        </View>

        <Products>
            <TextInput
                style={{fontWeight: 'medium', color: '#000', fontSize: 15}}
                multiline={true}
                value={product ? product.description : ''}
                editable={false}
            />
        </Products>

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addCartbuttonStyle}
            onPress={this._addCart}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Add To Cart
                </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },

  addCartbuttonStyle: {
    borderRadius: 10,
    borderColor: "#FBB741",
    borderWidth: 1,
    height:50,
    width: 300,
    marginVertical: 10,
    alignItems:"center",
    justifyContent:"center",
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'yellow'
},
});
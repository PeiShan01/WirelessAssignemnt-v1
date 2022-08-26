import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, Button, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

let config = require('./../Config');

export default class EditScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.route.params.id,
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
    };
    
    this._edit = this._edit.bind(this);
    this._loadByID = this._loadByID.bind(this);
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
        this.setState({
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _edit() {
    let url = config.settings.serverPath + '/api/products/' + this.state.productID;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.productID,
        name: this.state.name,
        price: this.state.price,
        category: this.state.category,
        description: this.state.description,
        image: this.state.image,
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
          Alert.alert('Record UPDATED for', this.state.name);
        } else {
          Alert.alert('Error in UPDATING');
        }
        this.props.route.params._refresh();
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });

      this.props.route.params._refresh();
      this.props.route.params.homeRefresh();
      this.props.navigation.goBack();
  }

  componentDidMount() {
    this._loadByID();
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: 'Edit: ' + this.state.name});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom:10,
            borderColor: '#ccc',
            }}>
            <Image source={{uri: this.state.image}} 
              style={{
                width: '40%',
                height: undefined,
                aspectRatio: 1,
              }}/>
          </View>
            <Text style={styles.TextLabel}>Name:</Text>
            <TextInput
                style={styles.TextInput}
                value={this.state.name}
                onChangeText={name => {
                    this.setState({name});
                }}
                orientation={'vertical'}
            />
            <Text style={styles.TextLabel}>Price:</Text>
            <TextInput
                style={styles.TextInput}
                value={this.state.price}
                onChangeText={price => {
                    this.setState({price});
                }}
                orientation={'vertical'}
            />
            <Text style={styles.TextLabel}>Category:</Text>
            <Picker
            style={styles.picker}
            mode={'dialog'}                     
            prompt={'Select Product Category'}  
            selectedValue={this.state.category}
            onValueChange={
              (itemValue, itemIndex) => this.setState({category: itemValue})
            }>
              <Picker.Item label="Racquet" value="Racquet" />
              <Picker.Item label="Accessories" value="Accessories" />
              <Picker.Item label="Bag" value="Bag" />
              <Picker.Item label="Footwear" value="Footwear" />
              <Picker.Item label="Appareal" value="Appareal" />
            </Picker>
            <Text style={styles.TextLabel}>Description:</Text>
            <TextInput
                style={styles.TextInput}
                multiline={true}
                value={this.state.description}
                onChangeText={description => {
                    this.setState({description});
                }}
                orientation={'vertical'}
            />
            <Button
                title={'Save'}
                onPress={this._edit}
            />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: '#000099',
  },

  picker: {
    color: '#000099',
    margin: 10,
    width: '50%',
    left: 10,
    transform: [
      { scaleX: 1.5 }, 
      { scaleY: 1.5 },
   ]
 },
});
import React, {Component} from 'react';
import {Text, StyleSheet, Alert, View, TextInput, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/AntDesign';

const actions = [
  {
    text: 'Edit',
    color: '#c80000',
    icon: <Ionicons name="edit" size={30} color={'white'} />,
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#c80000',
    icon: <Ionicons name="delete" size={30} color={'white'} />,
    name: 'delete',
    position: 1,
  },
];

let config = require('./../Config');

export default class ViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.route.params.id,
      product: null,
    };

    this._loadByID = this._loadByID.bind(this);
  }
  
  componentDidMount() {
    this._loadByID();
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.product.name});
  }

  //Use to get product by id
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

  _delete() {
    Alert.alert('Confirm to DELETE', this.state.product.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url =
            config.settings.serverPath + '/api/products/' + this.state.productID;
          console.log(url);
          fetch(url, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: this.state.productID}),
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
          this.props.route.params._refresh();
          this.props.navigation.goBack();
        },
      },
    ]);
  }

  render() {
    let product = this.state.product;
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
            <Image source={{uri: product ? product.image : ''}} 
              style={{
                width: '40%',
                height: undefined,
                aspectRatio: 1,
              }}/>
          </View>
            <Text style={styles.TextLabel}>Name:</Text>
            <TextInput
                style={styles.TextInput}
                value={product ? product.name : ''}
                orientation={'vertical'}
                editable={false}
            />
            <Text style={styles.TextLabel}>Category:</Text>
            <TextInput
                style={styles.TextInput}
                value={product ? product.category : ''}
                orientation={'vertical'}
                editable={false}
            />
            <Text style={styles.TextLabel}>Price:</Text>
            <TextInput
                style={styles.TextInput}
                value={product ? product.price : ''}
                orientation={'vertical'}
                editable={false}
            />
            <Text style={styles.TextLabel}>Description:</Text>
            <TextInput
                style={styles.TextInput}
                multiline={true}
                value={product ? product.description : ''}
                orientation={'vertical'}
                editable={false}
            />
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#a80000'} 
          onPressItem={name => {
            switch (name) {
              case 'edit':
                this.props.navigation.navigate('AdminEditScreen', {
                  id: product ? product.id : 0,
                  headerTitle: product ? product.name : '',
                  _refresh: this._loadByID,
                  homeRefresh: this.props.route.params._refresh,
                });
                break;
              case 'delete':
                this._delete();
                break;
            }
          }}
        />
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
    color: 'black',
  },
});
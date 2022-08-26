import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/AntDesign';

let config = require('./../Config');

const actions = [
  {
    text: 'Add',
    icon: <Ionicons name="pluscircleo" size={40} color={'white'} />,
    name: 'add',
    position: 1,
  },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isFetching: false,
    };
    
    this._load = this._load.bind(this);
  }

  _load() {
    let url = config.settings.serverPath + '/api/products';
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
        this._load();
      });
  }

  componentDidMount() {
    this._load();
  }

  render() {
    console.log(this.state.products);
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          data={this.state.products}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={
            <View style={{flexDirection:'row', flex:1, backgroundColor:'#7fffd4'}}>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Image</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Name</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Category</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Price</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Description</Text>
              </View>
            </View>
          }
          renderItem={({item}) => (
          <TouchableHighlight
              underlayColor="pink"
              onPress={() => {
                this.props.navigation.navigate('AdminViewScreen', {
                  id: item.id,
                  headerTitle: item.name,
                  _refresh: this._load,
                });
              }}>
          <View style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.item}>
            <Image source={{uri: item.image}} style={{
              width:50,
              height:50,
              margin:5,
              
            }}/>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>{item.name}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>{item.category}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>RM{item.price}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>{item.description}</Text>
            </View>
          </View>
          </TouchableHighlight>
          )}
        />
      <FloatingAction
          actions={actions}
          overrideWithAction={true}
          color={'#a80000'}
          onPressItem={() => {
            this.props.navigation.navigate('AdminCreateScreen', {_refresh: this._load});
          }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent:'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#000',
  },
});
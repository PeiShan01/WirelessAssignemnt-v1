import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {ScrollView, Image, View, Text, SafeAreaView, TouchableOpacity, ImageBackground} from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
  } from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomTabNavigation from './BottomTabNavigation';
import RacquetScreen from './DrawerScreens/screens/RacquetScreen';
import ApparealScreen from './DrawerScreens/screens/ApparealScreen';
import BagScreen from './DrawerScreens/screens/BagScreen';
import FootwearScreen from './DrawerScreens/screens/FootwearScreen';
import AccessoriesScreen from './DrawerScreens/screens/AccessoriesScreen';
import AboutUs from './DrawerScreens/screens/AboutUs';
import MyAccountScreen from './DrawerScreens/screens/MyAccountScreen';

const Drawer = createDrawerNavigator ();

class UserDrawerComponent extends Component {
	render () {
	  return (
		<View style={{flex: 1}}>
		  	<DrawerContentScrollView
          {...this.props}
          contentContainerStyle={{backgroundColor: 'skyblue'}}>
            
            <ImageBackground
              source={require ('../assets/adminDrawer.jpg')}
              style={{padding: 10}}>

              <Image
                style={{
                alignSelf: 'flex-end',
                width: 64,
                height: 64,
                marginLeft: 20,
                borderRadius: 32,
                }}
                source={require ('../assets/profile_defaults.png')}
              />

              <Text
                style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                alignSelf: 'flex-end',
                marginLeft: 20,
                }}
              >
              Administrator
              </Text>

            </ImageBackground>

            <View style={{backgroundColor: '#fff', flex: 1, paddingTop: 10}}>
              <DrawerItemList {...this.props} />
            </View>
  		  </DrawerContentScrollView>

			<View style={{padding: 15, borderTopWidth: 1, borderTopColor: 'grey'}}>

				<TouchableOpacity 
          style={{paddingVertical: 5}}
          onPress={() => {
            this.props.navigation.navigate('Auth');
          }}>

					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Ionicons name="exit-outline" size={40} color={'red'}/>
						<Text
							style={{
              color: 'red',
              fontWeight: 'bold',
							marginLeft: 10,
							fontSize: 25,
							fontFamily: 'EduQLDBeginner-Bold',
							}}
						>
						Sign Out
						</Text>
					</View>
				</TouchableOpacity>
		  	</View>
		</View>
	  );
	}
  }

export default class App extends Component {
    
  render () {
    return (
 
        <Drawer.Navigator
          drawerContent={props => <UserDrawerComponent {...props} />}
          drawerStyle={{width: '65%', backgroundColor: 'white'}}
          drawerType="slide"
          overlayColor="transparent"
          screenOptions={{
            drawerActiveTintColor: 'darkslateblue',
            drawerActiveBackgroundColor: 'skyblue',
          }}
        >
          <Drawer.Screen name="Home" component={BottomTabNavigation} options={{headerShown: false}}/>
          
          <Drawer.Screen name="Racquet" component={RacquetScreen} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>

          <Drawer.Screen name="Appareal" component={ApparealScreen} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>

          <Drawer.Screen name="Bag" component={BagScreen} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>

          <Drawer.Screen name="Footwear" component={FootwearScreen} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>

          <Drawer.Screen name="Accessories" component={AccessoriesScreen} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>

          <Drawer.Screen name="My Account" component={MyAccountScreen} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>
          
          <Drawer.Screen name="About Us" component={AboutUs} options={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}/>

        </Drawer.Navigator>

    );
  }
}
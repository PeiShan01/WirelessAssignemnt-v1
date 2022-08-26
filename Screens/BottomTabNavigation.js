import React, {Component} from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Import Home Tab Screens
import HomeScreen from './DrawerScreens/screens/HomeScreen';

// Import Product Screens
import ProductScreen from './ProductScreen';

// Import Cart Screens
import CartScreen from './DrawerScreens/screens/CartScreen';

// Import Settings Screens
import SettingsScreen from './DrawerScreens/screens/SettingsScreen';
import AboutUs from './DrawerScreens/screens/AboutUs';
import MyAccountScreen from './DrawerScreens/screens/MyAccountScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeTab ({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' },
				headerLeft: () => (
					<Entypo
						name="menu"
						size={30}
						color="#fff"
						style = {{margin:10}}
						onPress={() => navigation.openDrawer()}
					/>
				  ),
			}}
		>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ title: 'Home',
				headerTitleAlign:'center',
				}}
			/>
	
		</Stack.Navigator>
	);
}

function ProductTab ({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="ProductScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' },
			}}
		>
			<Stack.Screen
				name="ProductScreen"
				component={ProductScreen}
				options={{ title: 'Product',
				headerTitleAlign:'center',
				headerLeft: () => (
					<Entypo
						name="menu"
						size={30}
						color="#fff"
						style = {{margin:10}}
						onPress={() => navigation.openDrawer()}
					/>
				  ),
				}}
			/>
	
		</Stack.Navigator>
	);
}

function CartTab ({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="CartScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' },
			}}
		>
			<Stack.Screen
				name="CartScreen"
				component={CartScreen}
				options={{ title: 'Cart',
				headerTitleAlign:'center',
				headerLeft: () => (
					<Entypo
						name="menu"
						size={30}
						color="#fff"
						style = {{margin:10}}
						onPress={() => navigation.openDrawer()}
					/>
				  ),
				}}
			/>
	
		</Stack.Navigator>
	);
}

function SettingsTab ({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="SettingsScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' }
			}}
		>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: 'Settings', 
				headerTitleAlign:'center',
				headerLeft: () => (
					<Entypo
						name="menu"
						size={30}
						color="#fff"
						style = {{margin:10}}
						onPress={() => navigation.openDrawer()}
					/>
				  ),
				}}/>
			<Stack.Screen
				name="MyAccountScreen"
				component={MyAccountScreen}
				options={{ title: 'My Account' }}/>
			<Stack.Screen
				name="AboutUs"
				component={AboutUs}
				options={{ title: 'About Us' }} />

		</Stack.Navigator>
	);
}

function MaterialBottomNavigation () {
	return (
		
		<Tab.Navigator
			initialRouteName="HomeTab"
			activeColor="#03a9f4"
			inactiveColor="#babcbe"
			barStyle={{ backgroundColor: '#000' }}
			shifting={true}
		>
			<Tab.Screen
				name="HomeTab"
				component={HomeTab}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="home"
							color={color}
							size={26}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="ProductTab"
				component={ProductTab}
				options={{
					tabBarLabel: 'Product',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="category"
							color={color}
							size={26}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="CartTab"
				component={CartTab}
				options={{
					tabBarLabel: 'Cart',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="local-mall"
							color={color}
							size={26}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="SettingsTab"
				component={SettingsTab}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="settings"
							color={color}
							size={26}
						/>
					),
				}}
			/>

		</Tab.Navigator>
		
	);
}


export default MaterialBottomNavigation;
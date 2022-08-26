import React, { Component } from 'react';

import { 
	StyleSheet, 
	View, 
	Text, 
	ScrollView, 
	TouchableOpacity, 
	SafeAreaView, 
	ImageBackground,
	KeyboardAvoidingView,
} from 'react-native';

import { TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);

		// ref = to access and manipulate DOM nodes and React elements directly
		// ref is created and assigned to an instance property 
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();

		this.state = {
			// input email and password
			userEmail: '',
			userPassword: '',

			// actual email and password in database
			actualEmail: '',
			actualPassword: '',

			// if error occured
			errorText_1: 'Empty field is not allowed !!!',
			errorText_2: 'This email or password is incorrect !!!',
			errorText_3: 'User not registered !!!',

			// navigate to screen
			navigation: this.props.navigation
		}
	}

	// execute when data place in DOM 
	componentDidMount = async() => {
		await AsyncStorage.getItem('userEmail')
			.then((value) => this.setState({ actualEmail: value }));
		await AsyncStorage.getItem('userPassword')
			.then((value) => this.setState({ actualPassword: value }));

		alert(this.state.actualEmail + ", " + this.state.actualPassword)
	}

	// to validate user input
	dataValidation = () => {

		// validate email: (match if contains) - Regex rule
		let emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

		// validate password: (match if contains) - Regex rule
		let passwordRegex = /^.{8,}$/;

		/* Admin Login Page */
		if(this.state.userEmail === "Admin" && this.state.userPassword === "admin123"){
			this.setState({ userEmail: '', userPassword: ''});
			return this.state.navigation.navigate('AdminDrawer');
		}

		/* User Login Page */
		/*  
			if not empty and not admin 
				1. check email with Regex
				2. check password with Regex
				3. compare with actual data
		*/
		else if (this.state.userEmail != '' && this.state.userEmail != ''){
			if (emailRegex.test(this.state.userEmail)) {
				if (passwordRegex.test(this.state.userPassword)) {
					AsyncStorage.setItem('isAuth', 'true')

					if (this.state.actualEmail === this.state.userEmail && this.state.actualPassword === this.state.userPassword ) {
						return this.state.navigation.navigate('DrawerNavigation');
					} 
					
					else {
						this.setState({ userEmail: '', userPassword: ''});
						return alert(this.state.errorText_3);
					}		
				} 
			
				else {
		 			this.setState({ userEmail: '', userPassword: ''});
		 			return alert(this.state.errorText_2);
				}
			}
			
			else {
				this.setState({ userEmail: '', userPassword: ''});
				return alert(this.state.errorText_2);
			} 
		}
		
		else {
			this.setState({ userEmail: '', userPassword: ''});
			return alert(this.state.errorText_1);
		}
 	}
	
	// display login form
	render(){
		return (	

			// SafeAreaView - display content according to device space
			<SafeAreaView style = {{ flex: 1}}> 

				{/* KeyboardAvoidingView + ScrollView - to avoid keyboard cover the text field */}
				<KeyboardAvoidingView style = {{ flex: 1 }}>

					<ImageBackground 
							style = {{ flex: 1 }}
							opacity = {0.8}
							source = {{ uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg' }}
					>
					
					<ScrollView contentContainerStyle = { styles.scrollviewStyles } showsVerticalScrollIndicator = {false} >
				
						{/* Text */}	
						<View style = { styles.headingStyles }>
							<Text style = {styles.title} > Welcome Back </Text>
							<Text style = {styles.subTitle} > Enter your credentials to continue </Text>
						</View>

						{/* Email Address */}	
						<TextInput
							mode = "flat"
							label = "Email"
							ref = {this.emailRef}
							value = {this.state.userEmail}
							style = {styles.inputStyles}
							onChangeText = {(userEmail) => this.setState({ userEmail })}
							placeholder = "Enter Email" 
							keyboardType = "email-address"
							returnKeyType = "next"
							onSubmitEditing = {() => this.passwordRef.current.focus()}
							blurOnSubmit = {false}
						/>
								
						{/* Password */}
						<TextInput
							mode="flat"
							label="Password"
							ref={this.passwordRef}
							value={this.state.userPassword}
							style={styles.inputStyles}
							onChangeText={ (userPassword) => this.setState({ userPassword })}
							secureTextEntry={true}
							placeholder="Enter Password"
							returnKeyType="done"
						/>
					
						{/* Login Button */}
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.loginbuttonStyle}
							onPress={this.dataValidation}>
								<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
									Login
								</Text>
						</TouchableOpacity>
				
	
						{/* Register Part */}
						<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'black' }} >
							Don't have an account?  
							<Text onPress = 
								{() => {
									this.setState({ userEmail: '', userPassword: '', errorText_1: '' });
									this.state.navigation.navigate('RegisterScreen');
								}}
								style={{color: '#00F', textDecorationLine: 'underline'}}>

								<Text> Sign Up</Text>
							</Text> 
						</Text>

					</ScrollView>
					</ImageBackground>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
};
	
const styles = StyleSheet.create({

	scrollviewStyles: {
		flexGrow:1,
		justifyContent:'center'
	},

	headingStyles: {
		alignItems: 'center'
	},

	title: {
		fontSize: 45,
		fontWeight: 'bold',
		fontFamily: 'sans-serif-medium',
		color: '#191970',
	},

	subTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		fontFamily: 'sans-serif-condensed',
		color: '#191970',
		marginVertical: 15
	},

	inputStyles: {
		overflow: 'hidden',
		borderColor: "#233067 ",
		borderWidth: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		marginHorizontal: 10,	
		marginVertical: 10,
		width: '95%',
		backgroundColor: 'white',
		marginLeft: 'auto',
		marginRight: 'auto'
	},

	loginbuttonStyle: {
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

	registerButtonStyle: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 30,
		borderColor: '#babcbe',
		paddingVertical: 15
	}
});
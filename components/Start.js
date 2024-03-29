import {
	Button,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React, { useState } from 'react';

export default function Start(props) {
	const [text, setText] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('#757083');

	const image = require('../assets/background_image.png');

	// sets the background color to be sent as a prop to the Chat component
	const toggleActiveBorder = (color) => {
		setBackgroundColor(color);
	};

	return (
		//prevents the input field from being hidden by the keyboard
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}>
			{/*  sets Background Image */}
			<ImageBackground source={image} resizeMode='cover' style={styles.image}>
				<Text style={styles.title}>Chatty Chat</Text>

				{/* defines the whole login box */}
				<View style={styles.loginBox}>
					<TextInput
						onChangeText={setText}
						value={text}
						placeholder='Your Name'
						placeholderTextColor='rgba(117, 112, 131, 0.5)'
						inlineImageLeft='icon'
						style={styles.input}
					/>
					<Text
						style={{ color: '#757083', marginLeft: '6%', marginRight: '6%' }}>
						Choose a backgroud color
					</Text>

					{/* defines the background color */}
					<View style={styles.colorContainer}>
						{/* a single background color element to choose from */}
						<View
							style={[
								styles.colorContainerItem,

								{
									backgroundColor: '#090C08',
								},
								backgroundColor === '#090C08' ? border.active : null,
							]}
							accessibilityLabel='Black background color'
							accessibilityHint='Changes chat background color to black'
							accessibilityRole='button'>
							<Button
								title=''
								onPress={() => {
									toggleActiveBorder('#090C08');
								}}></Button>
						</View>

						{/* a single background color element to choose from */}
						<View
							style={[
								styles.colorContainerItem,

								{
									backgroundColor: '#474056',
								},
								backgroundColor === '#474056' ? border.active : null,
							]}
							accessibilityLabel='Dark gray background color'
							accessibilityHint='Changes chat background color to dark gray'
							accessibilityRole='button'>
							<Button
								title=''
								onPress={() => {
									toggleActiveBorder('#474056');
								}}></Button>
						</View>

						{/* a single background color element to choose from */}
						<View
							style={[
								styles.colorContainerItem,

								{
									backgroundColor: '#8A95A5',
								},
								backgroundColor === '#8A95A5' ? border.active : null,
							]}
							accessibilityLabel='Light gray background color'
							accessibilityHint='Changes chat background color to light gray'
							accessibilityRole='button'>
							<Button
								title=''
								onPress={() => {
									toggleActiveBorder('#8A95A5');
								}}></Button>
						</View>

						{/* a single background color element to choose from */}
						<View
							style={[
								styles.colorContainerItem,

								{
									backgroundColor: '#B9C6AE',
								},
								backgroundColor === '#B9C6AE' ? border.active : null,
							]}
							accessibilityLabel='Green background color'
							accessibilityHint='Changes chat background color to green'
							accessibilityRole='button'>
							<Button
								title=''
								onPress={() => {
									toggleActiveBorder('#B9C6AE');
								}}></Button>
						</View>
					</View>

					<View style={styles.buttonBackground}>
						<Button
							title="Let's Chat!"
							onPress={() => {
								props.navigation.navigate('Chat', {
									name: text,
									color: backgroundColor,
								});
							}}
							color={Platform.OS === 'ios' ? '#FFFFFF' : '#757083'}
							style={styles.button}
							accessible={true}
							accessibilityLabel='Go to Chat screen'
							accessibilityHint='Navigates to Chat screen'
							accessibilityRole='button'
						/>
					</View>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 45,
		fontWeight: '600',
		color: 'white',
		textAlign: 'center',
	},
	loginBox: {
		backgroundColor: 'white',
		height: '44%',
		borderRadius: 2,
		margin: '6%',
	},
	input: {
		borderWidth: 1,
		borderColor: '#757083',
		borderRadius: 2,
		height: 60,
		margin: '6%',
		padding: 10,
	},
	colorContainer: {
		flex: 1,
		flexDirection: 'row',
		margin: '6%',
	},
	colorContainerItem: {
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10,
		padding: 10,
	},
	buttonBackground: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#757083',
		margin: '6%',
	},
	button: {
		fontSize: 16,
		fontWeight: '600',
	},
});

const border = StyleSheet.create({
	active: {
		borderWidth: 5,
		borderColor: '#757083',
	},
	hidden: {
		display: 'none',
		borderWidth: 5,
		borderColor: '#757083',
	},
});

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

//import necessary components from react-native
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db, storage } from '../firebaseConfig.js';

import { Actions } from 'react-native-gifted-chat';
//  import PropTypes
import PropTypes from 'prop-types';
//import react
import React from 'react';

export default function CustomActions(props) {
	const sendImage = async () => {
		try {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(
				false
			);
			if (status === 'granted') {
				const image = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: 'Images',
				}).catch((error) => console.log(error));

				if (!image.cancelled) {
					const imageUrl = await uploadImage(image.uri);
					props.onSend({ image: imageUrl });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const takeImage = async () => {
		try {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status === 'granted') {
				const image = await ImagePicker.launchCameraAsync({
					mediaTypes: 'Images',
				}).catch((error) => console.log(error));
				if (!image.cancelled) {
					const imageUrl = await uploadImage(image.uri);
					props.onSend({ image: imageUrl });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const sendLocation = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status === 'granted') {
				const result = await Location.getCurrentPositionAsync({}).catch(
					(error) => console.log(error)
				);
				const longitude = JSON.stringify(result.coords.longitude);
				const altitude = JSON.stringify(result.coords.latitude);
				if (result) {
					props.onSend({
						location: {
							longitude: result.coords.longitude,
							latitude: result.coords.latitude,
						},
					});
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const uploadImage = async (uri) => {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		const imageNameBefore = uri.split('/');
		const imageName = imageNameBefore[imageNameBefore.length - 1];

		const ref = storage.ref().child(`images/${imageName}`);

		const snapshot = await ref.put(blob);

		blob.close();

		return await snapshot.ref.getDownloadURL();
	};

	return (
		<Actions
			{...props}
			containerStyle={styles.container}
			// Display a menu to select actions.
			options={{
				'Send picture from library': sendImage,
				'Take picture': takeImage,
				'Share location': sendLocation,
				// Close menu and return to chat.
				Return: () => {},
			}}
			optionTintColor='#000000'
			accessible={true}
			accessibilityLabel='Actions menu'
			accessibilityHint='Display menu to send a picture, take a picture or send location'
			accessibilityRole='menu'
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: '#b2b2b2',
		borderWidth: 2,
		flex: 1,
	},
	iconText: {
		color: '#b2b2b2',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
});

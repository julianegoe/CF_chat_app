import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';

import { AsyncStorage } from 'react-native';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo';

export default function Chat(props) {
	const { name, color } = props.route.params;
	const [messages, setMessages] = useState([]);
	const [isConnected, setIsConnected] = useState(false);
	const [uid, setUid] = useState('');

	// create a reference to the messages collection in firestore
	const messagesReference = db.collection('messages');

	useEffect(() => {
		let unsubscribeMessages;
		let authUnsubscribe;

		// set name as title of the Chat screen
		props.navigation.setOptions({ title: name });

		// fetc connection status of user
		NetInfo.fetch().then((connection) => {
			if (connection.isConnected) {
				setIsConnected(true);
				// authenticates user and waits for changes in user auth state
				authUnsubscribe = auth.onAuthStateChanged(async (user) => {
					if (!user) {
						console.log('auth...');
						await auth.signInAnonymously();
					}

					//update user state with currently active user data
					setUid(user.uid);

					// listen to changes in the data base to update messages state
					unsubscribeMessages = messagesReference
						.orderBy('createdAt', 'desc')
						.onSnapshot(handleCollectionUpdate);
				});
			} else {
				console.log("I'm offline");
				setIsConnected(false);

				getMessages();
			}
		});

		// cleanup function to unsubscribe from auth and database update when component is not mounted
		return () => {
			unsubscribeMessages();
			authUnsubscribe();
		};
	}, []);

	useEffect(() => {
		saveMessagesOffline();
	}, [messages]);

	// callback function for onSnapshot to update messages state
	const handleCollectionUpdate = (querySnapshot) => {
		const messages = [];

		if (querySnapshot) {
			// go through each document
			querySnapshot.forEach((doc) => {
				// get the QueryDocumentSnapshot's data
				var data = doc.data();
				messages.push({
					_id: data._id,
					text: data.text || null,
					createdAt: data.createdAt.toDate(),
					user: data.user,
					image: data.image || null,
					location: data.location || null,
				});
			});
			setMessages(messages);
		} else return;
	};

	// appends new messages to messages object so it can be displayed
	const handleSend = (currentMessages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, currentMessages)
		);
		addMessage(currentMessages[0]);
	};

	// adds messages to firestore
	const addMessage = (currentMessage) => {
		console.log(currentMessage);
		messagesReference.add({
			_id: currentMessage._id,
			text: currentMessage.text || null,
			createdAt: currentMessage.createdAt || new Date(),
			user: currentMessage.user,
			image: currentMessage.image || null,
			location: currentMessage.location || null,
		});
	};

	const getMessages = async () => {
		try {
			const data = await AsyncStorage.getItem('messages');
			setMessages(JSON.parse(data));
		} catch (e) {
			console.log(e.message);
		}
	};

	const saveMessagesOffline = async () => {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(messages));
		} catch (error) {
			console.log(error.message);
		}
	};

	const deleteMessages = async () => {
		try {
			await AsyncStorage.removeItem('messages');
			setMessages([]);
		} catch (error) {
			console.log(error.message);
		}
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#A4C86A',
					},
					left: {
						color: 'black',
					},
				}}
			/>
		);
	};

	const renderInputToolbar = (props) => {
		if (isConnected == false) {
		} else {
			return <InputToolbar {...props} />;
		}
	};

	const renderCustomActions = (props) => <CustomActions {...props} />;

	//custom map view
	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{ width: 300, height: 200, margin: 5 }}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	return (
		/* Prevents Keyboard from hiding text input on Android phones */
		<View style={{ flex: 1, backgroundColor: color }}>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}

			<GiftedChat
				messages={messages}
				/* custom user id */
				user={{
					_id: uid,
					name: name,
				}}
				onSend={(currentMessage) => {
					handleSend(currentMessage);
				}}
				/* customizes style of speech bubble */
				renderBubble={renderBubble}
				showAvatarForEveryMessage={true}
				renderInputToolbar={renderInputToolbar}
				renderUsernameOnMessage={true}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
			/>
		</View>
	);
}

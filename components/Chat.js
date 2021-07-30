import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import useConstructor from '../customHooks';

const firebase = require('firebase');
require('firebase/firestore');

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyBdzYEUB_CZgyask3dZACUXs9csz_ItYs0',
		authDomain: 'chattyapp-863cc.firebaseapp.com',
		projectId: 'chattyapp-863cc',
		storageBucket: 'chattyapp-863cc.appspot.com',
		messagingSenderId: '116642040466',
		appId: '1:116642040466:web:cb892ce032a1e052c0744b',
		measurementId: 'G-7H3EJSCR30',
	});
}

export default function Chat(props) {
	const { name, color } = props.route.params;
	const [messages, setMessages] = useState([]);
	const [uid, setUid] = useState('');
	const reference = firebase.firestore().collection('messages');

	// sets name prop as title and initializies first messages
	// gets executed whenever there is change in the firebase databasae
	useEffect(() => {
		let unsubscribeMessages;
		let authUnsubscribe;
		// set name as title of the Chat screen
		props.navigation.setOptions({ title: name });

		// wait for changes in user auth state
		authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				console.log('auth...');
				await firebase.auth().signInAnonymously();
			}

			//update user state with currently active user data
			setUid(user.uid);
			console.log(user.uid);
		});

		// listen to changes in the data base
		unsubscribeMessages = reference
			.orderBy('createdAt', 'desc')
			.onSnapshot(onCollectionUpdate, (err) => {
				console.log('error: ' + err);
			});

		return () => {
			unsubscribeMessages();
			authUnsubscribe();
		};
	}, []);

	// callback function for onSnapshot to listen to changes in darabase
	const onCollectionUpdate = (querySnapshot) => {
		const messages = [];

		if (querySnapshot) {
			// go through each document
			querySnapshot.forEach((doc) => {
				// get the QueryDocumentSnapshot's data
				var data = doc.data();
				messages.push({
					_id: data._id,
					text: data.text,
					createdAt: data.createdAt.toDate(),
					user: data.user,
				});
			});
			setMessages(messages);
		} else return;
	};

	// appends new messages to messages object so it can be displayed
	const onSend = (newMessages = []) => {
		addMessage(newMessages[0]);
	};

	// adds messages to firebase
	const addMessage = ({ _id, createdAt, text, user }) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, {
				_id,
				createdAt,
				text,
				user: {
					_id: uid,
					name: name,
				},
			})
		);
		reference.add({
			_id,
			createdAt,
			text: `${text} from ${uid}`,
			user: {
				_id: uid,
				name: name,
			},
		});
	};

	return (
		/* Prevents Keyboard from hiding text input on Android phones */
		<View style={{ flex: 1, backgroundColor: color }}>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}

			<GiftedChat
				messages={messages}
				user={{
					_id: uid,
					name: name,
				}}
				onSend={(currentMessage) => {
					onSend(currentMessage);
				}}
				/* customizes color of speech bubble */
				renderBubble={(props) => {
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
							// renders bubble according to current user
							/* position={props.currentMessage.user._id == uid ? 'right' : 'left'} */
						/>
					);
				}}
				user={{
					_id: 1,
				}}
			/>
		</View>
	);
}

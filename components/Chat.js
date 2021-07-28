import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

/* const firebase = require('firebase');
require('firebase/firestore');

const useConstructor = (callBack = () => {}) => {
	const [hasBeenCalled, setHasBeenCalled] = useRef(false);
	if (hasBeenCalled) return;
	callBack();
	setHasBeenCalled(true);
}; */

export default function Chat(props) {
	const { name, color } = props.route.params;
	const [messages, setMessages] = useState([]);

	/* useConstructor(() => {
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
	}); */

	/* 	useEffect(() => {
		referenceChatMessages = firebase.firestore().collection('messages');
		const unsubscribe = referenceShoppingLists.onSnapshot(onCollectionUpdate);
	}, []); */

	// sets name prop as title and initializies first messages
	useEffect(() => {
		props.navigation.setOptions({ title: name });
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: 2,
				text: `${name} has entered the chat`,
				createdAt: new Date(),
				system: true,
			},
		]);
	}, []);

	// appends new messages to messages object so it can be displayed
	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		/* Prevents Keyboard from hiding text input on Android phones */
		<View style={{ flex: 1, backgroundColor: color }}>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}

			{/* Whole Chat UI out of the box */}
			<GiftedChat
				messages={messages}
				onSend={(messages) => onSend(messages)}
				/* customizes color of speech bubble */
				renderBubble={(props) => {
					return (
						<Bubble
							{...props}
							wrapperStyle={{
								right: {
									backgroundColor: '#A4C86A',
								},
							}}
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

import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

export default function Chat(props) {
	const { name, color } = props.route.params;
	const [messages, setMessages] = useState([]);

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

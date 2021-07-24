import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

export default function Chat(props) {
	const { name, color } = props.route.params;

	useEffect(() => {
		props.navigation.setOptions({ title: name });
		console.log(color);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: color }}>
			<Text>Hi, {name}</Text>
			<Button
				title='Back to start'
				onPress={() => {
					props.navigation.navigate('Start');
				}}></Button>
		</View>
	);
}

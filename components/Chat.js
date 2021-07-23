import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

export default function Chat(props) {
	const { name, backgroundColor } = props.route.params;

	useEffect(() => {
		props.navigation.setOptions({ title: name });
		console.log(backgroundColor);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: backgroundColor }}>
			<Text>Hi, {name}</Text>
			<Button
				title='Back to start'
				onPress={() => {
					props.navigation.navigate('Start');
				}}></Button>
		</View>
	);
}

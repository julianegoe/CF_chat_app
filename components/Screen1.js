import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function Screen1(props) {
	return (
		<View>
			<Text>Hi, I'm Screen 1</Text>
			<Button
				title='Go to Screen 2'
				onPress={() => {
					props.navigation.navigate('Screen2');
				}}></Button>
		</View>
	);
}

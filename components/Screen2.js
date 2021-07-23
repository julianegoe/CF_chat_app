import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function Screen2(props) {
	return (
		<View>
			<Text>Hi, I'm Screen 2</Text>
			<Button
				title='Go to Screen 1'
				onPress={() => {
					props.navigation.navigate('Screen1');
				}}></Button>
		</View>
	);
}

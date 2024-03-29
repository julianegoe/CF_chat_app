// import react native gesture handler
import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';

import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Start from './components/Start';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';

// creates a stack navigation
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen name='Start' component={Start}></Stack.Screen>
				<Stack.Screen name='Chat' component={Chat}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

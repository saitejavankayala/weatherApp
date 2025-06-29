import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Image, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
                title: 'Weather',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image style={{ width: 24, height: 24, marginRight: 16 }} source={require('../assets/images/settings.jpg')}/>
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
);

export default AppNavigator;
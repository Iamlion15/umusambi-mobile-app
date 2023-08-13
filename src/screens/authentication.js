import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';


const Stack = createNativeStackNavigator();

const AuthenticationPage = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthenticationPage;

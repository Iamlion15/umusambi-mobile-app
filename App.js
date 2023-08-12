import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/Navigation/DrawerNavs';
import Register from './src/screens/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const token = await AsyncStorage.getItem('UserToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Register" component={Register} />
        )}
        <Stack.Screen name="Homee" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
        
    </NavigationContainer>
  );
};

export default App;

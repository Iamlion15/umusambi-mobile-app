// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PaymentHistoryScreen from '../screens/UserVisitationDetail';
import CustomDrawerContent from './CustomDrawerNavigator';
import UserDetailScreen from '../screens/UserProfileScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreenn from '../screens/LoginScreen';
import LandingPage from '../screens/LandingPage';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} />}
    initialRouteName='welcome'
    >
      <Drawer.Screen name="welcome" component={LandingPage} />
      <Drawer.Screen name="history" component={PaymentHistoryScreen}/>
      <Drawer.Screen name="reg" component={LoginScreenn}/>
      <Drawer.Screen name="user profile" component={UserDetailScreen}/>
      <Drawer.Screen name="map" component={MapScreen}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

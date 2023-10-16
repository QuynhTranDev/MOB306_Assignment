import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/HomeScreen';
import UserScreen from './Screen/UserScreen';
import AddScreen from './Screen/AddScreen';
import useAuth from './hooks/useAuth';
import BlogScreen from './Screen/BlogScreen';
import ManageScreen from './Screen/ManageScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs () {
  return (
    <Tab.Navigator>
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="home" color={color} size={26} />)}} name='Home' component={HomeScreen} />
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Profile', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="account" color={color} size={26} />)}} name='User' component={UserScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const {user} = useAuth();
  console.log(user);
  if(user){
    return (
      <NavigationContainer>
         <Stack.Navigator>
         <Stack.Screen options={{headerShown: false}} name="Tab" component={MyTabs} />
          <Stack.Screen options={{headerShown: false}} name="Add" component={AddScreen} />
          <Stack.Screen options={{headerShown: false}} name="Blog" component={BlogScreen} />
          <Stack.Screen options={{headerShown: false}} name="Manage" component={ManageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else{
    return (
      <NavigationContainer>
         <Stack.Navigator>
         <Stack.Screen options={{headerShown: false}} name="Tab" component={MyTabs} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{headerShown: false}} name="Blog" component={BlogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}




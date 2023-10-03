import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HStack, IconButton, } from '@react-native-material/core';
import { Image, View, Text } from 'react-native';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';

import Start from './app/Start';
import Home from './app/components/Home';
import NotePad from './app/components/NotePad';
import { store, persistedStore } from './app/store/store';  


const Stack = createNativeStackNavigator()
export default function App() { 
   
  const [ fontsLoaded ] = useFonts({
    'My_Font': require('./assets/font/ProductSans-Regular.ttf')
  });
    
  if (!fontsLoaded) {
    return null;
  }
 
   
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null} >
        <NavigationContainer>
        <StatusBar animated style='auto' /> 
          <Stack.Navigator initialRouteName='home' screenOptions={{contentStyle:{backgroundColor: '#fff1'}}}>
            <Stack.Screen name='start' component={Start} options={{ headerStyle: { backgroundColor: 'lightblue', }, headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name='home' component={Home} options={{ headerBackVisible: false, headerShown: false,}} />
            <Stack.Screen name='notepad' component={NotePad} 
              options={{ 
                headerShown: true, 
                headerRight: ()=> (
                <HStack>
                  <IconButton style={{width: 40, height: 40}} icon={props => <Image style={{width: '70%', height: '70%'}} {...props} source={require("./assets/img/pin.png")} />} />
                  <IconButton style={{width: 40, height: 40}} icon={props => <Image style={{width: '70%', height: '70%'}} {...props} source={require("./assets/img/pin.png")} />} />
                  <IconButton style={{width: 40, height: 40}} icon={props => <Image style={{width: '70%', height: '70%'}} {...props} source={require("./assets/img/pin.png")} />} />
                </HStack>
                ), 
                headerTitle: ""
              }} />
          </Stack.Navigator> 
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
 
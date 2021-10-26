/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GalleryScreen from './src/pages/GalleryScreen';
import EditorScreen from './src/pages/EditorScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

const NavigationStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Editor" component={EditorScreen} />
    </Stack.Navigator>
  )
}


export default App;

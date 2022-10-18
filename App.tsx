import React from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ContactScreen from './src/screens/ContactScreen';
import StarRatingProvider from './src/contexts/StarRatingProvider';
import {fetchConfig} from './src/services/firebase';

export type RootStackParamList = {
  Home: undefined;
  Contact: undefined;
};

fetchConfig().catch(console.log);

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <StarRatingProvider navigation={navigationRef}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StarRatingProvider>
  );
};

export default App;

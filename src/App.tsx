import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import AppText from './components/custom/AppText';
import NotesScreen from './screens/NotesScreen';
import MainStack from './stacks/MainStack';

const App = () => {
  const {height, width} = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainStack />
    </NavigationContainer>
  );
};

export default App;

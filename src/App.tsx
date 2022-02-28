import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import MainStack from './stacks/MainStack';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const AppThema = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <NavigationContainer theme={AppThema}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainStack />
    </NavigationContainer>
  );
};

export default App;

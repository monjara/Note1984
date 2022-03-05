import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import MainStack from './stacks/MainStack';
import {store, persistor} from './store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const AppThema = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={AppThema}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import I18n from '../assets/locales/i18n';

import NotesScreen from './screens/NotesScreen';

const App = () => {
  const {height, width} = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          width: width * 0.9,
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: height * 0.09,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text>{I18n.t('edit')}</Text>
          </View>
        </View>
        <NotesScreen />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import I18n from '../assets/locales/i18n';

export interface Folder {
  name: string;
}

const sampleFolders = [
  {name: 'sample1'},
  {name: 'sample2'},
  {name: 'sample3'},
  {name: 'sample4'},
  {name: 'sample5'},
  {name: 'sample6'},
  {name: 'sample7'},
  {name: 'sample8'},
  {name: 'sample9'},
  {name: 'sample10'},
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {height, width} = useWindowDimensions();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const renderFolders: React.FC<
    ListRenderItemInfo<Folder>
  > = listRenderItemInfo => {
    return (
      <View style={{width: width * 0.3}}>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/image/folder.png')}
            style={{
              width: 80,
              height: 80,
            }}
          />
          <Text>{listRenderItemInfo.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
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
            <Text style={{}}>編集</Text>
          </View>
        </View>
        <View
          style={{
            height: height * 0.1,
          }}>
          <Text
            style={{
              fontSize: 32,
            }}>
            {I18n.t('welcome')}
          </Text>
        </View>
        <View
          style={{
            height: height * 0.06,
            borderWidth: 2,
            borderRadius: 5,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              height: height * 0.06,
              fontSize: 10,
            }}
            placeholder="検索"
          />
        </View>
        {/**
        <Text>iCloud</Text>
*/}
        <FlatList
          data={sampleFolders}
          renderItem={renderFolders}
          keyExtractor={item => item.name}
          numColumns={3}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

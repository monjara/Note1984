import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  SectionList,
  SectionListData,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { ScreenProps } from '../stacks/MainStack';
import AppText from '../components/custom/AppText';
import Search from '../components/Search';
import Title from '../components/Title';

const undefinedFolder = {id: 0, name: '', noteCount: 0};

const sampleFolders = [
  {id: 1, name: 'sample1', noteCount: 123},
  {id: 2, name: 'sample1', noteCount: 2},
  {id: 3, name: 'sample1', noteCount: 2},
  {id: 4, name: 'sample1', noteCount: 2},
  {id: 5, name: 'sample1', noteCount: 2},
];

type Folder = {
  id: number;
  name: string;
  noteCount: number;
};

type RenderData = {
  isHead: boolean;
  data: Array<Folder>;
};

const datas: Array<RenderData> = [
  {
    isHead: true,
    data: [undefinedFolder],
  },
  {
    isHead: false,
    data: sampleFolders,
  },
];

const FoldersScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'folder';
  const [headerTitle, setHeaderTitle] = useState('');
  const {height, width} = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => <EditButton />,
    });
  }, [navigation, headerTitle]);

  const handleFolder = (id: number) => {
    navigation.navigate('Notes', {id: id});
  };

  const EditButton = () => {
    return (
      <TouchableOpacity>
        <AppText isI18n={true}>edit</AppText>
      </TouchableOpacity>
    );
  };

  const Item = ({item, index, section}: SectionListData<Folder, any>) => {
    const isEnd = index === sampleFolders.length - 1;

    return section.isHead ? (
      <Search height={height * 0.06} />
    ) : (
      <TouchableOpacity
        onPress={() => handleFolder(item.id)}
        style={{
          alignSelf: 'center',
          width: width * 0.88,
          height: height * 0.07,
          alignItems: 'center',
          flexDirection: 'row',
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: isEnd ? 2 : 0,
          borderTopLeftRadius: index === 0 ? 5 : 0,
          borderTopRightRadius: index === 0 ? 5 : 0,
          borderBottomLeftRadius: isEnd ? 5 : 0,
          borderBottomRightRadius: isEnd ? 5 : 0,
        }}>
        <Image
          source={require('../../assets/image/folder.png')}
          style={{
            width: width * 0.1,
            height: width * 0.1,
            marginHorizontal: width * 0.01,
          }}
        />
        <Text
          style={{
            width: width * 0.6,
            marginLeft: 10,
          }}>
          {item.name}
        </Text>
        <Text style={{marginEnd: 10}}>{item.noteCount}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        alignSelf: 'center',
        width: width * 0.88,
      }}>
      {
        <SectionList
          sections={datas}
          keyExtractor={(item, index) => item + index.toString()}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index, section}) => (
            <Item item={item} index={index} section={section} />
          )}
          renderSectionHeader={({section: {isHead: isHead}}) =>
            isHead ? (
              <Title title={screenTitle} height={height * 0.1} isI18n={true} />
            ) : (
              <></>
            )
          }
          renderSectionFooter={({section: {isHead: isHead}}) => (
            <View
              style={{
                height: isHead ? 12 : 60,
              }}
            />
          )}
        />
      }
    </View>
  );
};

export default FoldersScreen;

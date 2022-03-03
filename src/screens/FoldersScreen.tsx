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

import AppText from '../components/custom/AppText';
import Search from '../components/Search';
import Title from '../components/Title';

const sampleFolders = [
  {name: 'sample1', noteCount: 200},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
  {name: 'sample1', noteCount: 2},
];

interface FoldersScreenProps {
  navigation: any;
}

interface Folder {
  name: string;
  noteCount: number;
}

interface RenderData {
  name: string;
  title: string;
  data: Array<Folder>;
}

const datas: Array<RenderData> = [
  {
    name: 'stickyHeader',
    title: 'folder',
    data: [{name: '', noteCount: 0}],
  },
  {
    name: 'folderList',
    title: '',
    data: sampleFolders,
  },
];

const FoldersScreen: React.VFC<FoldersScreenProps> = ({navigation}) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const {height, width} = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => <EditButton />,
    });
  }, [navigation, headerTitle]);

  const EditButton = () => {
    return (
      <TouchableOpacity>
        <AppText isI18n={true}>edit</AppText>
      </TouchableOpacity>
    );
  };

  const Item = ({item, index, section}: SectionListData<Folder, any>) => {
    const isEnd = index === sampleFolders.length - 1;

    return section.name === 'stickyHeader' ? (
      <Search height={height * 0.06} />
    ) : (
      <TouchableOpacity
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
          renderItem={({item, index, section}) => (
            <Item item={item} index={index} section={section} />
          )}
          renderSectionHeader={({section: {title}}) =>
            title === '' ? (
              <></>
            ) : (
              <Title title={title} height={height * 0.1} isI18n={true} />
            )
          }
          renderSectionFooter={({section: {title}}) => (
            <View
              style={{
                height: title === '' ? 60 : 12,
              }}
            />
          )}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      }
    </View>
  );
};

export default FoldersScreen;

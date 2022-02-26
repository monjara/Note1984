import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Search from '../components/Search';
import Title from '../components/Title';

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

export interface RenderFolder {
  name: string;
}

const FoldersScreen: React.VFC = () => {
  const renderFolders: React.FC<
    ListRenderItemInfo<RenderFolder>
  > = listRenderItemInfo => {
    return (
      <TouchableOpacity
        style={{
          width: width * 0.3,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/image/folder.png')}
          style={{
            width: 80,
            height: 80,
          }}
        />
        <Text>{listRenderItemInfo.item.name}</Text>
      </TouchableOpacity>
    );
  };

  const {height, width} = useWindowDimensions();
  return (
    <>
      <Title title={'folder'} height={height * 0.1} />
      <Search height={height * 0.06} />
      <FlatList
        data={sampleFolders}
        renderItem={renderFolders}
        keyExtractor={item => item.name}
        numColumns={3}
      />
    </>
  );
};

export default FoldersScreen;

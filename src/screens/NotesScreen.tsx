import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Search from '../components/Search';
import Title from '../components/Title';

const sampleNotes = [
  {title: 'sample1', created_at: '2020/01/01'},
  {title: 'sample2', created_at: '2020/01/01'},
  {title: 'sample3', created_at: '2020/01/01'},
  {title: 'sample4', created_at: '2020/01/01'},
  {title: 'sample5', created_at: '2020/01/01'},
  {title: 'sample6', created_at: '2020/01/01'},
  {title: 'sample7', created_at: '2020/01/01'},
  {title: 'sample8', created_at: '2020/01/01'},
  {title: 'sample9', created_at: '2020/01/01'},
  {title: 'sample10', created_at: '2020/01/01'},
];

export interface RenderNote {
  title: string;
  created_at: string;
}

const NotesScreen: React.VFC = () => {
  const renderNotes: React.FC<
    ListRenderItemInfo<RenderNote>
  > = listRenderItemInfo => {
    return (
      <TouchableOpacity
        style={{
          width: width * 0.3,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 80,
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
        <Text
          style={{
            fontFamily: 'JetBrainsMono-Bold',
            fontSize: 16,
          }}>
          {listRenderItemInfo.item.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}>
          {listRenderItemInfo.item.created_at}
        </Text>
      </TouchableOpacity>
    );
  };

  const {height, width} = useWindowDimensions();
  return (
    <>
      <Title title={'notes'} height={height * 0.1} />
      <Search height={height * 0.06} />
      <FlatList
        data={sampleNotes}
        renderItem={renderNotes}
        keyExtractor={item => item.title}
        numColumns={3}
      />
    </>
  );
};

export default NotesScreen;

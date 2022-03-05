import React from 'react';
import {
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
import {ScreenProps} from '../stacks/MainStack';

const undefinedNote = {
  id: undefined,
  folder_id: undefined,
  title: '',
  text: '',
  created_at: undefined,
};

const sampleNotes = [
  {id: 1, folder_id: 1, title: 'sample', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 2, folder_id: 3, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 3, folder_id: 3, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 4, folder_id: 3, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 5, folder_id: 3, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 6, folder_id: 5, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 7, folder_id: 5, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 8, folder_id: 5, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 9, folder_id: 5, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 10,folder_id: 5, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
  {id: 11,folder_id: 5, title: 'asdf', text: 'asdfasdf', created_at: '2020/01/01 12:12:12'},
];

export type Note = {
  id: number | undefined;
  folder_id: number | undefined;
  title: string;
  text: string;
  created_at: string | undefined;
};

type RenderData = {
  isHead: boolean;
  data: Array<Note>;
};

const datas: Array<RenderData> = [
  {
    isHead: true,
    data: [undefinedNote],
  },
  {
    isHead: false,
    data: sampleNotes,
  },
];

const NotesScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'notes';

  const handleNote = (item: Note) => {
    navigation.navigate('Edit', {item});
  };

  const Item = ({item, index, section}: SectionListData<Note, any>) => {
    const {id, folder_id, title, text, created_at} = item;
    const isEnd = index === sampleNotes.length - 1;

    return section.isHead ? (
      <Search height={height * 0.06} />
    ) : (
      <TouchableOpacity
        onPress={() => handleNote({id, folder_id, title, text, created_at})}
        style={{
          alignSelf: 'center',
          width: '100%',
          height: height * 0.09,
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
        <View
          style={{
            marginLeft: 10,
          }}>
          <AppText originalStyle={{fontSize: 20}}>{title}</AppText>
          <View style={{flexDirection: 'row'}}>
            <Text>{created_at}</Text>
            <Text>{text} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        alignSelf: 'center',
        width: width * 0.88,
      }}>
      <SectionList
        sections={datas}
        keyExtractor={(item, index) => item + index.toString()}
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
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default NotesScreen;

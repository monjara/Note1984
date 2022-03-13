import React from 'react';
import {
  Image,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppText from '../components/custom/AppText';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Title from '../components/Title';
import {Note} from '../redux/NotesReducer';
import {ScreenProps} from '../stacks/MainStack';

const undefinedNote = {
  id: undefined,
  folder_id: undefined,
  title: '',
  text: '',
  created_at: undefined,
};

const sampleNotes = [
  {
    id: 1,
    folder_id: 1,
    title: 'sample',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 2,
    folder_id: 3,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 3,
    folder_id: 3,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 4,
    folder_id: 3,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 5,
    folder_id: 3,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 6,
    folder_id: 5,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 7,
    folder_id: 5,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 8,
    folder_id: 5,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 9,
    folder_id: 5,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 10,
    folder_id: 5,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
  {
    id: 11,
    folder_id: 5,
    title: 'asdf',
    text: 'asdfasdf',
    created_at: '2020/01/01 12:12:12',
  },
];

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
  const {height, width} = useWindowDimensions();

  const handleNote = (item: Note) => {
    navigation.navigate('Edit', {item});
  };

  const Item = ({item, index, section}: SectionListData<Note, any>) => {
    const {id, folder_id, title, text, created_at} = item;
    const isEnd = index === sampleNotes.length - 1;
    const topRadius = index === 0 ? 5 : 0;
    const bottomRadius = isEnd ? 5 : 0;
    const radius = {
      borderTopLeftRadius: topRadius,
      borderTopRightRadius: topRadius,
      borderBottomLeftRadius: bottomRadius,
      borderBottomRightRadius: bottomRadius,
    };

    return section.isHead ? (
      <Search height={height * 0.06} />
    ) : (
      <View
        style={[
          styles.sectionItemContainerWrapper,
          {
            borderBottomWidth: isEnd ? 2 : 0,
            ...radius,
          },
        ]}>
        <TouchableOpacity
          onPress={() => handleNote({id, folder_id, title, text, created_at})}
          style={[styles.sectionItemContainer, {...radius}]}>
          <View style={styles.sectionItemDetailArea}>
            <AppText originalStyle={styles.sectionItemTitle}>{title}</AppText>
            <View style={styles.sectionItemDescriptionArea}>
              <Text>{created_at}</Text>
              <Text>{text} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
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
      <Footer justifyContent={'flex-end'}>
        <TouchableOpacity style={{width: width * 0.08, height: width * 0.08}}>
          <Image
            source={require('../../assets/image/add_note.png')}
            style={{width: width * 0.08, height: width * 0.08}}
          />
        </TouchableOpacity>
      </Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    height: '100%',
    backgroundColor: 'gainsboro',
  },
  container: {
    alignSelf: 'center',
    width: '88%',
  },
  sectionItemContainerWrapper: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  sectionItemContainer: {
    alignSelf: 'center',
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionItemDetailArea: {
    marginLeft: 10,
  },
  sectionItemTitle: {
    fontSize: 20,
  },
  sectionItemDescriptionArea: {
    flexDirection: 'row',
  },
});

export default NotesScreen;

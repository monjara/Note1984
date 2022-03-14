import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppText from '../components/custom/AppText';
import Footer from '../components/Footer';
import ScrollContainer from '../components/ScrollContainer';
import Search from '../components/Search';
import {Note} from '../redux/NotesReducer';
import {ScreenProps} from '../stacks/MainStack';

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

const NotesScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'notes';
  const {height} = useWindowDimensions();

  const handleNote = (item: Note) => {
    navigation.navigate('Edit', {item});
  };

  type NoteListProps = {
    notes: Note[];
  };

  const NoteList = ({notes}: NoteListProps) => {
    return (
      <>
        {notes.map((note, index) => (
          <View
            key={index.toString()}
            style={[
              styles.sectionItemContainerWrapper,
              {
                borderTopLeftRadius: index === 0 ? 5 : 0,
                borderTopRightRadius: index === 0 ? 5 : 0,
                borderBottomLeftRadius:
                  index === sampleNotes.length - 1 ? 5 : 0,
                borderBottomRightRadius:
                  index === sampleNotes.length - 1 ? 5 : 0,
                borderBottomWidth: index === sampleNotes.length - 1 ? 2 : 0,
              },
            ]}>
            <TouchableOpacity
              onPress={() => handleNote({...note})}
              style={styles.sectionItemContainer}>
              <View style={styles.sectionItemDetailArea}>
                <AppText originalStyle={styles.sectionItemTitle}>
                  {note.title}
                </AppText>
                <View style={styles.sectionItemDescriptionArea}>
                  <Text>{note.created_at}</Text>
                  <Text>{note.text} </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.containerWrapper}>
      <ScrollContainer screenTitle={screenTitle}>
        <Search height={height * 0.06} />
        <NoteList notes={sampleNotes} />
      </ScrollContainer>
      <Footer justifyContent={'flex-end'}>
        <TouchableOpacity style={styles.footerIcon}>
          <Image
            source={require('../../assets/image/add_note.png')}
            style={styles.footerIcon}
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
  footerIcon: {
    height: 32,
    width: 32,
  },
});

export default NotesScreen;

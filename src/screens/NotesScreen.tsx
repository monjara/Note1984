import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  ScrollView,
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
import {useAppSelector} from '../utils/hooks';
import {useAppDispatch} from '../utils/hooks';

const NotesScreen = ({navigation, route}: ScreenProps) => {
  const {height} = useWindowDimensions();
  const [headerTitle, setHeaderTitle] = useState('');
  const dispatch = useAppDispatch();

  const notes = useAppSelector(state => state.notes);
  console.log('notes: ', notes);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      // headerRight: () => <EditButton />,
    });
  }, [navigation, headerTitle]);

  const handleNote = (note: Note) => {
    navigation.navigate('Edit', {
      id: note.id,
      folderId: note.folderId,
      title: note.title,
      text: note.text,
      created_at: note.created_at,
    });
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
              // eslint-disable-next-line react-native/no-inline-styles
              {
                borderTopLeftRadius: index === 0 ? 5 : 0,
                borderTopRightRadius: index === 0 ? 5 : 0,
                borderBottomLeftRadius: index === notes.length - 1 ? 5 : 0,
                borderBottomRightRadius: index === notes.length - 1 ? 5 : 0,
                borderBottomWidth: index === notes.length - 1 ? 2 : 0,
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
      <ScrollView
        stickyHeaderIndices={[0, 2]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <Title title={route.params.folderName} height={54} isI18n={false} />
        <Search height={height * 0.06} />
        <View style={styles.smallBlank} />
        <NoteList notes={notes} />
        <View style={styles.largeBlank} />
      </ScrollView>
      <Footer justifyContent={'flex-end'}>
        <TouchableOpacity style={styles.footerIcon}>
          <Text>clear</Text>
        </TouchableOpacity>
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
  smallBlank: {
    height: 20,
  },
  largeBlank: {
    height: 60,
  },
  footerIcon: {
    height: 32,
    width: 32,
  },
});

export default NotesScreen;

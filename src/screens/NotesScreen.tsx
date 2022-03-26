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
import {useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';

import AppText from '../components/custom/AppText';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Title from '../components/Title';
import {Note} from '../redux/NotesReducer';
import {
  EditScreenParamList,
  NotesScreenRouteProp,
  ScreenProps,
} from '../stacks/MainStack';
import {useAppSelector} from '../utils/hooks';

type NoteListProps = {
  notes: Note[];
};

const NotesScreen = ({navigation}: ScreenProps) => {
  const {height} = useWindowDimensions();
  const [headerTitle, setHeaderTitle] = useState('');

  const route = useRoute<NotesScreenRouteProp>();
  const folderId = route.params.folderId;
  const folderName = route.params.folderName;

  const notes = useAppSelector(state =>
    state.notes.filter(note => note.folderId === folderId),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      // headerRight: () => <EditButton />,
    });
  }, [navigation, headerTitle]);

  const navigateToEdit = (isEdit: boolean, note?: Note) => {
    const props: EditScreenParamList =
      isEdit && note !== undefined
        ? {
            noteId: note.noteId,
            folderId: note.folderId,
            title: note.title,
            text: note.text,
            isEdit,
          }
        : {
            noteId: uuid.v4().toString(),
            folderId,
            title: '',
            text: '',
            isEdit,
          };

    navigation.navigate('Edit', {...props});
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
              onPress={() => navigateToEdit(true, {...note})}
              style={styles.sectionItemContainer}>
              <View style={styles.sectionItemDetailArea}>
                <View style={styles.sectionItemTitleArea}>
                  <Text numberOfLines={1} style={styles.sectionItemTitle}>
                    {note.title}
                  </Text>
                </View>
                <View style={styles.sectionItemDescriptionArea}>
                  <Text numberOfLines={1}
                  style={styles.sectionItemDescription}
                  >{note.text} </Text>
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
        <Title
          title={folderName}
          height={54}
          isI18n={false}
          style={{
            backgroundColor: 'gainsboro',
          }}
        />
        <Search height={height * 0.06} />
        <View style={styles.smallBlank} />
        <NoteList notes={notes} />
        <View style={styles.largeBlank} />
      </ScrollView>
      <Footer justifyContent={'flex-end'}>
        <TouchableOpacity
          onPress={() => navigateToEdit(false)}
          style={styles.footerIcon}>
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
  sectionItemTitleArea: {
    flexDirection: 'row',
  },
  sectionItemTitle: {
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
  },
  sectionItemDescriptionArea: {
    flexDirection: 'row',
  },
  sectionItemDescription: {
    fontFamily: 'JetBrainsMono-Regular',
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

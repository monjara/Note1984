import React, {useLayoutEffect, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  gestureHandlerRootHOC,
  Swipeable,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import Footer from '../components/Footer';
import Search from '../components/Search';
import Title from '../components/Title';
import {Note, removeNote} from '../redux/NotesReducer';
import {
  EditScreenParamList,
  NotesScreenRouteProp,
  ScreenProps,
} from '../stacks/MainStack';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {reduceNotesCount} from '../redux/FoldersReducer';

type NoteListProps = {
  notes: Note[];
};

const NotesScreen = gestureHandlerRootHOC(({navigation}: ScreenProps) => {
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
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

  const deleteNote = (noteId: string, folderId: string) => {
    dispatch(removeNote({noteId}));
    dispatch(reduceNotesCount({folderId}));
  };

  const NoteList = ({notes}: NoteListProps) => {
    const renderRightActions = (
      _progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation,
      noteId: string,
      folderId: string,
    ) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [0, 0, 0, 1],
        extrapolate: 'clamp',
      });
      return (
        <TouchableHighlight
          onPress={() => deleteNote(noteId, folderId)}
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            height: '97%',
          }}>
          <Animated.Text
            style={{
              transform: [{translateX: trans}],
              color: 'white',
              fontFamily: 'JetBrainsMono-Regular',
              paddingHorizontal: 15,
            }}>
            delete
          </Animated.Text>
        </TouchableHighlight>
      );
    };

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
            <Swipeable
              containerStyle={styles.sectionItemContainer}
              childrenContainerStyle={{flex: 1}}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, note.noteId, note.folderId)
              }>
              <TouchableOpacity
                onPress={() => navigateToEdit(true, {...note})}
                style={styles.sectionItemContainer}>
                <View style={styles.sectionItemDetailArea}>
                  <View style={styles.sectionItemTitleArea}>
                    {note.title !== '' ? (
                      <Text numberOfLines={1} style={styles.sectionItemTitle}>
                        {note.title}
                      </Text>
                    ) : (
                      <Text numberOfLines={1} style={styles.sectionItemNoTitle}>
                        {'no title'}
                      </Text>
                    )}
                  </View>
                  <View style={styles.sectionItemDescriptionArea}>
                    {note.text !== '' ? (
                      <Text
                        numberOfLines={1}
                        style={styles.sectionItemDescription}>
                        {note.text}{' '}
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        style={styles.sectionItemNoDescription}>
                        {'no text'}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
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
});

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
    height: 65,
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
    height: 65,
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
  sectionItemNoTitle: {
    fontSize: 20,
    color: 'gainsboro',
    fontFamily: 'JetBrainsMono-Bold',
  },
  sectionItemDescriptionArea: {
    flexDirection: 'row',
  },
  sectionItemDescription: {
    fontFamily: 'JetBrainsMono-Regular',
    flexDirection: 'row',
  },
  sectionItemNoDescription: {
    fontFamily: 'JetBrainsMono-Regular',
    color: 'gainsboro',
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

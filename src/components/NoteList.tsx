import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Swipeable, TouchableHighlight} from 'react-native-gesture-handler';
import {reduceNotesCount} from '../redux/FoldersReducer';
import {Note, removeNote} from '../redux/NotesReducer';
import {EditScreenParamList} from '../stacks/MainStack';
import {useAppDispatch} from '../utils/hooks';

type NoteListProps = {
  notes: Note[];
  navigation: any;
};

const NoteList = ({notes, navigation}: NoteListProps) => {
  const dispatch = useAppDispatch();

  const deleteNote = (noteId: string, folderId: string) => {
    dispatch(removeNote({noteId}));
    dispatch(reduceNotesCount({folderId}));
  };

  const navigateToEdit = (note: Note) => {
    const props: EditScreenParamList = {
      noteId: note.noteId,
      folderId: note.folderId,
      title: note.title,
      text: note.text,
      isEdit: true,
    };
    navigation.navigate('Edit', {...props});
  };

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
              onPress={() => navigateToEdit({...note})}
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

const styles = StyleSheet.create({
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
});
export default NoteList;

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useAppDispatch} from '../utils/hooks';
import {addNote, editNote, Note} from '../redux/NotesReducer';
import {EditScreenRouteProp} from '../stacks/MainStack';
import AppText from '../components/custom/AppText';

const EditScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const route = useRoute<EditScreenRouteProp>();
  const noteId = route.params.noteId;
  const folderId = route.params.folderId;
  const isEdit = route.params.isEdit;

  const DoneButton = React.memo(() => {
    return (
      <TouchableOpacity onPress={() => handleSaveNote()}>
        <AppText isI18n={true}>Done</AppText>
      </TouchableOpacity>
    );
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DoneButton />,
    });
  }, [navigation, title, text, DoneButton]);

  useEffect(() => {
    if (route.params !== undefined) {
      setTitle(route.params.title);
      setText(route.params.text);
    }
  }, [route.params]);

  const handleSaveNote = useCallback(() => {
    if (title !== undefined && text !== undefined) {
      const noteData: Note = {
        noteId,
        folderId,
        title,
        text,
        createdAt: '',
      };

      isEdit
        ? dispatch(editNote({...noteData}))
        : dispatch(addNote({...noteData}));
    }
  }, [dispatch, text, title]);

  return (
    <>
      <TextInput
        multiline={true}
        value={title}
        placeholder={'title'}
        placeholderTextColor={'silver'}
        onChangeText={txt => setTitle(txt)}
        style={style.titleArea}
      />
      <TextInput
        multiline={true}
        value={text}
        placeholder={'text'}
        placeholderTextColor={'silver'}
        onChangeText={txt => setText(txt)}
        style={style.textArea}
      />
    </>
  );
};

const style = StyleSheet.create({
  titleArea: {
    fontSize: 26,
    fontFamily: 'JetBrainsMono-Bold',
  },
  textArea: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default EditScreen;

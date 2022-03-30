import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useAppDispatch} from '../utils/hooks';
import {addNote, editNote, Note} from '../redux/NotesReducer';
import {EditScreenRouteProp} from '../stacks/MainStack';
import AppText from '../components/custom/AppText';
import {addNotesCount} from '../redux/FoldersReducer';

const EditScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(2000);
  const [isEdit, setIsEdit] = useState(false);

  const route = useRoute<EditScreenRouteProp>();
  const noteId = route.params.noteId;
  const folderId = route.params.folderId;

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
      setIsEdit(route.params.isEdit);
    }
  }, [route.params]);

  const handleSaveNote = useCallback(() => {
    if (title !== undefined && text !== undefined) {
      const noteData: Note = {
        noteId,
        folderId,
        title,
        text,
      };

      if (isEdit) {
        dispatch(editNote({...noteData}));
      } else {
        dispatch(addNote({...noteData}));
        dispatch(addNotesCount({folderId}));
      }
    }
    setIsEdit(true);
    Keyboard.dismiss();
  }, [dispatch, noteId, folderId, text, title, isEdit]);

  return (
    <View style={style.container}>
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
        textAlignVertical={'top'}
        placeholderTextColor={'silver'}
        onChangeText={txt => setText(txt)}
        onContentSizeChange={e => {
          e.nativeEvent.contentSize.height > 2000 &&
            setTextInputHeight(e.nativeEvent.contentSize.height);
        }}
        style={[style.textArea, {height: textInputHeight}]}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
  },
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

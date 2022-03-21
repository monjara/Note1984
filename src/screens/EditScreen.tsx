import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {useAppDispatch} from '../utils/hooks';
import AppText from '../components/custom/AppText';
import {addNote, Note} from '../redux/NotesReducer';
import {StackParamList} from '../stacks/MainStack';

type EditScreenRouteProp = RouteProp<StackParamList, 'Edit'>;

const EditScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<EditScreenRouteProp>();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // const {id} = route.params !== undefined && route.params.id;

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
      dispatch(
        addNote({
          id: 1234,
          folderId: 1234,
          title: title,
          text: text,
          created_at: '',
        }),
      );
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

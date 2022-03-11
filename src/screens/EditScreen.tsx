import React, {useEffect, useLayoutEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import AppText from '../components/custom/AppText';

const EditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const {id, folderId, isEdit} =
    route.params !== undefined && route.params.item;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DoneButton />,
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params !== undefined) {
      setTitle(route.params.item.title);
      setText(route.params.item.text);
    }
  }, [route.params]);

  const handleSave = () => {
  };

  const DoneButton = () => {
    return (
      <TouchableOpacity onPress={handleSave}>
        <AppText isI18n={true}>Done</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TextInput
        value={title}
        placeholder={'title'}
        placeholderTextColor={'silver'}
        onChangeText={title => setTitle(title)}
        style={{
          fontSize: 26,
          fontFamily: 'JetBrainsMono-Bold',
        }}
      />
      <TextInput
        value={text}
        placeholder={'text'}
        placeholderTextColor={'silver'}
        onChangeText={text => setText(text)}
        style={{
          fontSize: 16,
          fontFamily: 'JetBrainsMono-Regular',
        }}
      />
    </>
  );
};
export default EditScreen;

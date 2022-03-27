import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import Footer from '../components/Footer';
import Search from '../components/Search';
import Title from '../components/Title';
import {
  EditScreenParamList,
  NotesScreenRouteProp,
  ScreenProps,
} from '../stacks/MainStack';
import {useAppSelector} from '../utils/hooks';
import NoteList from '../components/NoteList';

const NotesScreen = gestureHandlerRootHOC(({navigation}: ScreenProps) => {
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

  const navigateToEdit = () => {
    const props: EditScreenParamList = {
      noteId: uuid.v4().toString(),
      folderId,
      title: '',
      text: '',
      isEdit: false,
    };
    navigation.navigate('Edit', {...props});
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
        <NoteList notes={notes} navigation={navigation}/>
        <View style={styles.largeBlank} />
      </ScrollView>
      <Footer justifyContent={'flex-end'}>
        <TouchableOpacity onPress={navigateToEdit} style={styles.footerIcon}>
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

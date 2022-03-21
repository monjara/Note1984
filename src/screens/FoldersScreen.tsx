import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {ScreenProps} from '../stacks/MainStack';
import AppText from '../components/custom/AppText';
import Search from '../components/Search';
import Footer from '../components/Footer';
import {addFolder, Folder} from '../redux/FoldersReducer';
import FolderCreateModal from '../components/FolderCreateModal';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import Title from '../components/Title';
import {initialize} from '../redux/InitialReducer';

const initialFolder = {id: 1, name: 'notes', noteCount: 0};

type FolderListProps = {
  folders: Folder[];
};

const FoldersScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'folder';
  const [headerTitle, setHeaderTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const folders = useAppSelector(state => state.folders);
  const initFlg = useAppSelector(state => state.initial.initFlg);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => <EditButton />,
    });
  }, [navigation, headerTitle]);

  useEffect(() => {
    if (initFlg) {
      dispatch(addFolder(initialFolder));
      dispatch(initialize(false));
    }
  }, [initFlg]);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleEditNote = () => {
    navigation.navigate('Edit', {
      id: 1,
      folder_id: 1,
      title: '',
      text: '',
      created_at: '',
    });
  };

  const handleFolder = (id: number, folderName: string) => {
    navigation.navigate('Notes', {id: id, folderName: folderName});
  };

  const EditButton = () => {
    return (
      <TouchableOpacity>
        <AppText isI18n={true}>edit</AppText>
      </TouchableOpacity>
    );
  };

  const FolderList = ({folders}: FolderListProps) => {
    return (
      <>
        {folders.map((folder, index) => (
          <View
            key={index.toString()}
            style={[
              styles.sectionItemContainerWrapper,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: showModal ? 'rgba(0,0,0,0)' : 'white',
                borderTopLeftRadius: index === 0 ? 5 : 0,
                borderTopRightRadius: index === 0 ? 5 : 0,
                borderBottomLeftRadius: index === folders.length - 1 ? 5 : 0,
                borderBottomRightRadius: index === folders.length - 1 ? 5 : 0,
                borderBottomWidth: index === folders.length - 1 ? 2 : 0,
              },
            ]}>
            <TouchableOpacity
              onPress={() => handleFolder(folder.id, folder.name)}
              style={[styles.sectionItemContainer]}>
              <Image
                source={require('../../assets/image/folder.png')}
                style={styles.folderImage}
              />
              <Text style={styles.folderName}>{folder.name}</Text>
              <Text style={styles.noteCount}>{folder.noteCount}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  };

  return (
    <View
      style={[
        styles.containerWrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: showModal ? 'rgba(0,0,0,0.3)' : 'gainsboro',
        },
      ]}>
      <FolderCreateModal
        showModal={showModal}
        handleShowModal={handleShowModal}
      />
      <ScrollView
        stickyHeaderIndices={[0, 2]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <Title
          title={screenTitle}
          height={54}
          isI18n={true}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: showModal ? 'rgba(0,0,0,0)' : 'gainsboro',
          }}
        />
        <Search height={height * 0.06} />
        <View style={styles.smallBlank} />
        <FolderList folders={folders} />
        <View style={styles.largeBlank} />
      </ScrollView>
      <Footer>
        <TouchableOpacity onPress={handleShowModal} style={styles.footerIcon}>
          <Image
            source={require('../../assets/image/add_folder.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={handleEditNote}>
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
    width: '100%',
  },
  container: {
    alignSelf: 'center',
    width: '88%',
  },
  sectionItemContainerWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  sectionItemContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  folderImage: {
    width: 40,
    height: 40,
    marginHorizontal: 4,
  },
  folderName: {
    width: 236,
    marginLeft: 10,
  },
  noteCount: {
    marginEnd: 10,
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

export default FoldersScreen;

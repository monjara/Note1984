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
import uuid from 'react-native-uuid';

import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {initialize} from '../redux/InitialReducer';
import {addFolder, Folder} from '../redux/FoldersReducer';
import {EditScreenParamList, ScreenProps} from '../stacks/MainStack';
import I18n from '../../assets/locales/i18n';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Title from '../components/Title';
import FolderCreateModal from '../components/FolderCreateModal';

const initialFolder = {folderId: '1', name: 'notes', noteCount: 0};

type FolderListProps = {
  folders: Folder[];
};

const FoldersScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'folder';
  const [headerTitle, setHeaderTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [updateFolderName, setUpdateFolderName] = useState('');
  const [updateFolderId, setUpdateFolderId] = useState('');
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const folders = useAppSelector(state => state.folders);
  const initFlg = useAppSelector(state => state.initial.initFlg);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
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

  const handleShowCreateModal = () => {
    setIsCreateModal(true);
    setUpdateFolderName('');
    setUpdateFolderId('');
    handleShowModal();
  };

  const handleShowEditModal = (folderName: string, folderId: string) => {
    setIsCreateModal(false);
    setUpdateFolderName(folderName);
    setUpdateFolderId(folderId);
    handleShowModal();
  };

  const navigateToNotes = (folderId: string, folderName: string) => {
    navigation.navigate('Notes', {
      folderId,
      folderName,
    });
  };

  const navigateToEdit = () => {
    const noteId = uuid.v4().toString();

    const props: EditScreenParamList = {
      noteId,
      folderId: '1',
      title: '',
      text: '',
      isEdit: false,
    };

    navigation.navigate('Edit', {...props});
  };

  const FolderList = ({folders}: FolderListProps) => {
    return (
      <>
        {folders !== undefined &&
          folders.map((folder, index) => (
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
                onPress={() => navigateToNotes(folder.folderId, folder.name)}
                onLongPress={() =>
                  folder.folderId !== '1' &&
                  handleShowEditModal(folder.name, folder.folderId)
                }
                style={[styles.sectionItemContainer]}>
                <Image
                  source={require('../../assets/image/folder.png')}
                  style={styles.folderImage}
                />
                <Text style={styles.folderName}>
                  {folder.folderId === '1' ? I18n.t(folder.name) : folder.name}
                </Text>
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
        isCreate={isCreateModal}
        showModal={showModal}
        handleShowModal={handleShowModal}
        updateFolderName={updateFolderName}
        updateFolderId={updateFolderId}
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
        <TouchableOpacity
          onPress={handleShowCreateModal}
          style={styles.footerIcon}>
          <Image
            source={require('../../assets/image/add_folder.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={navigateToEdit}>
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

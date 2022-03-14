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

import {ScreenProps} from '../stacks/MainStack';
import AppText from '../components/custom/AppText';
import Search from '../components/Search';
import Footer from '../components/Footer';
import {Folder} from '../redux/FoldersReducer';
import FolderModal from '../components/FolderModal';
import {useAppSelector} from '../utils/hooks';
import Title from '../components/Title';

const FoldersScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'folder';
  const [headerTitle, setHeaderTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {height} = useWindowDimensions();

  const folders = useAppSelector<Folder[]>(state => state.folders.list);
  console.log(folders);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => <EditButton />,
    });
  }, [navigation, headerTitle]);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleFolder = (id: number) => {
    navigation.navigate('Notes', {id: id});
  };

  const EditButton = () => {
    return (
      <TouchableOpacity>
        <AppText isI18n={true}>edit</AppText>
      </TouchableOpacity>
    );
  };

  type FolderListProps = {
    folders: Folder[];
  };

  const FolderList = ({folders}: FolderListProps) => {
    return (
      <>
        {folders.map((folder, index) => (
          <View
            key={index.toString()}
            style={[
              styles.sectionItemContainerWrapper,
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
              onPress={() => handleFolder(folder.id)}
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
        {
          backgroundColor: showModal ? 'rgba(0,0,0,0.3)' : 'gainsboro',
        },
      ]}>
      <FolderModal showModal={showModal} handleShowModal={handleShowModal} />
      <ScrollView
        stickyHeaderIndices={[0, 2]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <Title title={screenTitle} height={54} isI18n={true} />
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
        <TouchableOpacity style={styles.footerIcon}>
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

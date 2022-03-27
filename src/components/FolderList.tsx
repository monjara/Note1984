import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Swipeable, TouchableHighlight} from 'react-native-gesture-handler';
import {Folder, removeFolder} from '../redux/FoldersReducer';
import {removeNotesRelatedFolder} from '../redux/NotesReducer';
import {useAppDispatch} from '../utils/hooks';
import I18n from '../../assets/locales/i18n';

type FolderListProps = {
  folders: Folder[];
  navigation: any;
  showModal: boolean;
  handleShowEditModal: Function;
};

const FolderList = ({
  folders,
  navigation,
  showModal,
  handleShowEditModal,
}: FolderListProps) => {
  const dispatch = useAppDispatch();

  const deleteFolder = (folderId: string) => {
    dispatch(removeFolder({folderId}));
    dispatch(removeNotesRelatedFolder({folderId}));
  };

  const navigateToNotes = (folderId: string, folderName: string) => {
    navigation.navigate('Notes', {
      folderId,
      folderName,
    });
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    folderId: string,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableHighlight
        onPress={() => deleteFolder(folderId)}
        style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
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
            {folder.folderId !== '1' ? (
              <Swipeable
                containerStyle={styles.sectionItemContainer}
                childrenContainerStyle={{flex: 1}}
                renderRightActions={(progress, dragX) =>
                  renderRightActions(progress, dragX, folder.folderId)
                }>
                <TouchableOpacity
                  onPress={() => navigateToNotes(folder.folderId, folder.name)}
                  onLongPress={() =>
                    handleShowEditModal(folder.name, folder.folderId)
                  }
                  style={[styles.sectionItemContainer]}>
                  <Image
                    source={require('../../assets/image/folder.png')}
                    style={styles.folderImage}
                  />
                  <Text style={styles.folderName}>
                    {folder.folderId === '1'
                      ? I18n.t(folder.name)
                      : folder.name}
                  </Text>
                  <Text style={styles.noteCount}>{folder.noteCount}</Text>
                </TouchableOpacity>
              </Swipeable>
            ) : (
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
            )}
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default FolderList;

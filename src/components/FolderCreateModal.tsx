import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import I18n from '../../assets/locales/i18n';
import {useAppDispatch} from '../utils/hooks';
import uuid from 'react-native-uuid';

import {addFolder, editFolder} from '../redux/FoldersReducer';
import AppText from './custom/AppText';

type VoidFunction = () => void;

type FolderModalProps = {
  isCreate: boolean;
  showModal: boolean;
  handleShowModal: VoidFunction;
  updateFolderName: string;
  updateFolderId: string;
};

const FolderCreateModal = ({
  isCreate,
  showModal,
  handleShowModal,
  updateFolderName,
  updateFolderId,
}: FolderModalProps) => {
  const dispatch = useAppDispatch();
  const [folderName, setFolderName] = useState(isCreate ? '' : updateFolderName);

  const closeModal = () => {
    if (showModal) {
      handleShowModal();
    }
  };

  const handleSaveFolder = () => {
    if (isCreate) {
      const id = uuid.v4().toString();
      dispatch(
        addFolder({
          folderId: id,
          name: folderName,
          noteCount: 0,
        }),
      );
    } else {
      dispatch(
        editFolder({
          folderId: updateFolderId,
          name: folderName,
        }),
      );
    }
    closeModal();
  };

  return (
    <Modal visible={showModal} transparent={true} style={[styles.background]}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalUpperhalf}>
          {isCreate ? (
            <AppText isBold={true} isI18n={true} originalStyle={styles.text}>
              {'new_folder'}
            </AppText>
          ) : (
            <AppText isBold={true} isI18n={true} originalStyle={styles.text}>
              {'update_folder'}
            </AppText>
          )}
          <AppText isI18n={true}>{'input_folder_name'}</AppText>
          <TextInput
            autoFocus={true}
            placeholder={' ' + I18n.t('name')}
            defaultValue={folderName}
            style={styles.input}
            onChangeText={text => setFolderName(text)}
          />
        </View>
        <View style={styles.modalLowerhalf}>
          <TouchableOpacity onPress={closeModal} style={styles.buttonWrapper}>
            <View style={[styles.button, {borderRightWidth: 1}]}>
              <AppText isI18n={true}>{'cancel'}</AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSaveFolder}
            style={styles.buttonWrapper}>
            <View style={styles.button}>
              <AppText isI18n={true}>{'save'}</AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalWrapper: {
    marginTop: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalUpperhalf: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    width: '70%',
    height: 120,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 25,
    width: '100%',
    fontSize: 14,
    padding: 1,
    paddingLeft: 5,
  },
  modalLowerhalf: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 30,
    borderTopWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonWrapper: {
    width: '35%',
  },
  button: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FolderCreateModal;

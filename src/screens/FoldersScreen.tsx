import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {ScreenProps} from '../stacks/MainStack';
import AppText from '../components/custom/AppText';
import Search from '../components/Search';
import Title from '../components/Title';
import Footer from '../components/Footer';
import {Folder} from '../redux/FoldersReducer';
import FolderModal from '../components/FolderModal';
import {useAppSelector} from '../utils/hooks';

const undefinedFolder = {id: 0, name: '', noteCount: 0};

type RenderData = {
  isHead: boolean;
  data: Array<Folder>;
};

const FoldersScreen = ({navigation}: ScreenProps) => {
  const screenTitle = 'folder';
  const [headerTitle, setHeaderTitle] = useState('');
  const [folder, setFolder] = useState<Array<Folder>>([undefinedFolder]);
  const [showModal, setShowModal] = useState(false);
  const {height} = useWindowDimensions();

  const folders = useAppSelector(state => state.folders.list);

  const datas: Array<RenderData> = [
    {
      isHead: true,
      data: [undefinedFolder],
    },
    {
      isHead: false,
      data: folders,
    },
  ];

  useEffect(() => {
    setFolder([...folders]);
  }, [folders]);

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

  const Item = ({item, index, section}: SectionListData<Folder, any>) => {
    const isEnd = index === folder.length - 1;
    const topRadius = index === 0 ? 5 : 0;
    const bottomRadius = isEnd ? 5 : 0;
    const radius = {
      borderTopLeftRadius: topRadius,
      borderTopRightRadius: topRadius,
      borderBottomLeftRadius: bottomRadius,
      borderBottomRightRadius: bottomRadius,
    };

    return section.isHead ? (
      <Search height={height * 0.06} />
    ) : (
      <View
        style={[
          styles.sectionItemContainerWrapper,
          {
            borderBottomWidth: isEnd ? 2 : 0,
            ...radius,
          },
        ]}>
        <TouchableOpacity
          onPress={() => handleFolder(item.id)}
          style={[
            styles.sectionItemContainer,
            {
              backgroundColor: showModal ? 'rgba(0,0,0,0)' : 'white',
              ...radius,
            },
          ]}>
          <Image
            source={require('../../assets/image/folder.png')}
            style={styles.folderImage}
          />
          <Text style={styles.folderName}>{item.name}</Text>
          <Text style={styles.noteCount}>{item.noteCount}</Text>
        </TouchableOpacity>
      </View>
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
      <View style={styles.container}>
        <SectionList
          sections={datas}
          keyExtractor={(item, index) => item + index.toString()}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index, section}) => (
            <Item item={item} index={index} section={section} />
          )}
          renderSectionHeader={({section: {isHead: isHead}}) =>
            isHead ? (
              <Title title={screenTitle} height={height * 0.1} isI18n={true} />
            ) : (
              <></>
            )
          }
          renderSectionFooter={({section: {isHead: isHead}}) => (
            <View
              style={{
                height: isHead ? 12 : 60,
              }}
            />
          )}
        />
      </View>
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
    height: '99%',
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
  footerIcon: {
    height: 32,
    width: 32,
  },
});

export default FoldersScreen;

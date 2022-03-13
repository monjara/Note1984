import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  SectionList,
  SectionListData,
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
  const {height, width} = useWindowDimensions();

  const folders = useAppSelector(state => state.folders.list);
  console.log(JSON.stringify(folders));

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

    return section.isHead ? (
      <Search height={height * 0.06} />
    ) : (
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          width: width * 0.88,
          height: height * 0.07,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: isEnd ? 2 : 0,
          borderTopLeftRadius: index === 0 ? 5 : 0,
          borderTopRightRadius: index === 0 ? 5 : 0,
          borderBottomLeftRadius: isEnd ? 5 : 0,
          borderBottomRightRadius: isEnd ? 5 : 0,
        }}>
        <TouchableOpacity
          onPress={() => handleFolder(item.id)}
          style={{
            width: '100%',
            height: '99%',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: showModal ? 'rgba(0,0,0,0)' : 'white',
            borderTopLeftRadius: index === 0 ? 5 : 0,
            borderTopRightRadius: index === 0 ? 5 : 0,
            borderBottomLeftRadius: isEnd ? 5 : 0,
            borderBottomRightRadius: isEnd ? 5 : 0,
          }}>
          <Image
            source={require('../../assets/image/folder.png')}
            style={{
              width: width * 0.1,
              height: width * 0.1,
              marginHorizontal: width * 0.01,
            }}
          />
          <Text
            style={{
              width: width * 0.6,
              marginLeft: 10,
            }}>
            {item.name}
          </Text>
          <Text style={{marginEnd: 10}}>{item.noteCount}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: showModal ? 'rgba(0,0,0,0.3)' : 'gainsboro',
      }}>
      <FolderModal showModal={showModal} handleShowModal={handleShowModal} />
      <View
        style={{
          alignSelf: 'center',
          width: width * 0.88,
        }}>
        {
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
                <Title
                  title={screenTitle}
                  height={height * 0.1}
                  isI18n={true}
                />
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
        }
      </View>
      <Footer>
        <TouchableOpacity
          onPress={handleShowModal}
          style={{width: width * 0.08, height: width * 0.08}}>
          <Image
            source={require('../../assets/image/add_folder.png')}
            style={{width: width * 0.08, height: width * 0.08}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{width: width * 0.08, height: width * 0.08}}>
          <Image
            source={require('../../assets/image/add_note.png')}
            style={{width: width * 0.08, height: width * 0.08}}
          />
        </TouchableOpacity>
      </Footer>
    </View>
  );
};

export default FoldersScreen;

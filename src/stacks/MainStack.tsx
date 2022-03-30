import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import FoldersScreen from '../screens/FoldersScreen';
import NotesScreen from '../screens/NotesScreen';
import EditScreen from '../screens/EditScreen';

export interface ScreenProps {
  navigation: any;
  route: any;
}

export type NotesScreenParamList = {
  folderId: string;
  folderName: string;
};

export type EditScreenParamList = {
  noteId: string;
  folderId: string;
  title: string;
  text: string;
  isEdit: boolean;
};

export type StackParamList = {
  Folders: {};
  Notes: NotesScreenParamList;
  Edit: EditScreenParamList;
};

export type NotesScreenRouteProp = RouteProp<StackParamList, 'Notes'>;
export type EditScreenRouteProp = RouteProp<StackParamList, 'Edit'>;

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'gainsboro',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackVisible: false,
      }}>
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

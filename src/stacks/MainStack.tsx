import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FoldersScreen from '../screens/FoldersScreen';
import NotesScreen from '../screens/NotesScreen';
import EditScreen from '../screens/EditScreen';

export interface ScreenProps {
  navigation: any;
  route: any;
}

export type StackParamList = {
  Folders: {};
  Notes: {id: number};
  Edit: {
    id: number;
    folderId: number;
    title: string;
    text: string;
    created_at: string | undefined;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'gainsboro',
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

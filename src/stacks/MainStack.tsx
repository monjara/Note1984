import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FoldersScreen from '../screens/FoldersScreen';
import NotesScreen from '../screens/NotesScreen';
import EditScreen from '../screens/EditScreen';

export interface ScreenProps {
  navigation: any;
}

type MainStackParamList = {
  Folders: {};
  Notes: {id: number};
  Edit: {
    id: number;
    title: string;
    text: string;
    created_at: string | undefined;
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

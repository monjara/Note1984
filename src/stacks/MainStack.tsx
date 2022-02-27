import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import FoldersScreen from '../screens/FoldersScreen';
import NotesScreen from '../screens/NotesScreen';

const Stack = createNativeStackNavigator();

const MainStack: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

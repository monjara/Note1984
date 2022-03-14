import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Title from './Title';

type ScrollContainerProps = {
  screenTitle: string;
  children: React.ReactNode[];
};

const ScrollContainer = ({
  screenTitle,
  children: [search, list],
}: ScrollContainerProps) => {
  return (
    <ScrollView
      stickyHeaderIndices={[0, 2]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <Title title={screenTitle} height={54} isI18n={true} />
      {search}
      <View style={styles.smallBlank} />
      {list}
      <View style={styles.largeBlank} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '88%',
  },
  smallBlank: {
    height: 20,
  },
  largeBlank: {
    height: 60,
  },
});

export default ScrollContainer;

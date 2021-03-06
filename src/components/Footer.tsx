import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

interface FooterProps {
  children: ReactNode;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}

const Footer = ({children, justifyContent = 'space-between'}: FooterProps) => {
  const footerHeight = useHeaderHeight() - 10;
  return (
    <View style={[styles.containerWrapper, {height: footerHeight}]}>
      <View style={styles.container}>
        <View
          style={[styles.contentAreaWrapper, {justifyContent: justifyContent}]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    borderTopWidth: 2,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  contentAreaWrapper: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Footer;

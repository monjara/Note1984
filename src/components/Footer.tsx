import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

interface FooterProps {
  children: ReactNode;
}

const Footer = ({children}: FooterProps) => {
  const footerHeight = useHeaderHeight() - 10;
  return (
    <View style={[styles.container, {height: footerHeight}]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Footer;

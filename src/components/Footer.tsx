import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

interface FooterProps {
  children: ReactNode;
}

const Footer = ({children}: FooterProps) => {
  return <View style={styles.container}>{children}</View>;
};

const headerHight = useHeaderHeight();
const styles = StyleSheet.create({
  container: {
    height: headerHight,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Footer;

import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

import I18n from '../../../assets/locales/i18n';

interface CustomTextProps {
  children: ReactNode;
  isBold?: boolean;
  isI18n?: boolean;
  originalStyle?: object;
}

type AppTextProps = CustomTextProps & TextProps;

const AppText: React.VFC<AppTextProps> = ({
  isBold = true,
  isI18n = true,
  originalStyle = {},
  ...props
}) => {
  return (
    <Text
      style={[isBold ? styles.boldText : styles.regularText, originalStyle]}>
      {isI18n ? I18n.t(props.children) : props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  regularText: {
    fontFamily: 'JetBrainsMono-Regular',
  },
  boldText: {
    fontFamily: 'JetBrainsMono-Bold',
  },
});

export default AppText;

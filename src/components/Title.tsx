import React from 'react';
import {View} from 'react-native';
import AppText from './custom/AppText';

type TitleProps = {
  title: string;
  height: number;
  fontSize?: number;
  isI18n?: boolean;
  style?: any;
};

const Title: React.VFC<TitleProps> = ({
  fontSize = 32,
  isI18n = false,
  ...titleProps
}) => {
  return (
    <View
      style={[
        {
          height: titleProps.height,
        },
        titleProps.style,
      ]}>
      <AppText
        isBold={false}
        isI18n={isI18n}
        originalStyle={{
          fontSize: fontSize,
        }}>
        {titleProps.title}
      </AppText>
    </View>
  );
};

export default Title;

import React from 'react';
import {View} from 'react-native';
import AppText from './custom/AppText';

type TitleProps = {
  title: string;
  height: number;
  fontSize?: number;
};

const Title: React.VFC<TitleProps> = ({fontSize = 32, ...titleProps}) => {
  return (
    <View
      style={{
        height: titleProps.height,
      }}>
      <AppText
        isBold={false}
        originalStyle={{
          fontSize: fontSize,
        }}>
        {titleProps.title}
      </AppText>
    </View>
  );
};

export default Title;

import React from 'react';
import {Text, View} from 'react-native';
import I18n from '../../assets/locales/i18n';

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
      <Text
        style={{
          fontSize: fontSize,
        }}>
        {I18n.t(titleProps.title)}
      </Text>
    </View>
  );
};

export default Title;

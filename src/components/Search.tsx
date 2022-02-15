import React from 'react';
import {View, TextInput } from 'react-native';
import I18n from '../../assets/locales/i18n';

type Props = {
  height: number;
  fontSize?: number;
  borderWidth?: number;
  borderRadius?: number;
};

const Search: React.VFC<Props> = ({
  height,
  fontSize = 10,
  borderWidth = 2,
  borderRadius = 5,
}) => {
  return (
    <View
      style={{
        height: height,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <TextInput
        style={{
          height: height,
          fontSize: fontSize,
        }}
        placeholder={I18n.t('search')}
      />
    </View>
  );
};

export default Search;

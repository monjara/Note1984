import React from 'react';
import {TextInput} from 'react-native';
import I18n from '../../assets/locales/i18n';

type Props = {
  height: number;
  fontSize?: number;
  borderWidth?: number;
  borderRadius?: number;
};

const Search: React.VFC<Props> = ({
  height,
  fontSize = 14,
  borderWidth = 2,
  borderRadius = 5,
}) => {
  return (
    <TextInput
      style={{
        height: height,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        fontSize: fontSize,
        backgroundColor: 'white',
      }}
      placeholder={I18n.t('search')}
    />
  );
};

export default Search;

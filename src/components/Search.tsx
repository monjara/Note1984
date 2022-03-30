import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import I18n from '../../assets/locales/i18n';

type SearchProps = {
  height: number;
};

const Search = ({height}: SearchProps) => {
  return (
    <TextInput
      style={[styles.textInput, {height: height}]}
      placeholder={I18n.t('search')}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: 'white',
  },
});

export default Search;

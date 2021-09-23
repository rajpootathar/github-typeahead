import React from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {helpers} from '~common';
const {wp, hp} = helpers;
export const DropDown = props => {
  const {data, flatListProps} = props;
  return (
    <View style={[styles.container]}>
      <View style={[styles.inputContainer]}>
        <TextInput style={styles.input} {...props} />
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        {...flatListProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    height: hp(6),
    paddingLeft: wp(4),
    fontSize: hp(2.75),
    color: '#686868',
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: wp(5),
    borderBottomWidth: hp(0.3),
    borderColor: '#b9b9b9',
  },
  list: {
    margin: hp(3.5),
    marginVertical: hp(1.5),
    height: hp(85),
    paddingHorizontal: wp(1.5),
  },
});

export default DropDown;

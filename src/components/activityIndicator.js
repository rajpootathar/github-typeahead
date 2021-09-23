import React from 'react';
import {ActivityIndicator, View, Modal, Text} from 'react-native';
import {helpers} from '~common';
const {hp} = helpers;
export const Activity = props => {
  const {loading, text} = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={loading}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={[styles.container]}>
        <View style={[styles.loaderBox]}>
          <ActivityIndicator size="large" color={'#000000'} />
          {!!text && <Text>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  loaderBox: {
    backgroundColor: '#ffffff',
    padding: hp(3),
    borderRadius: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
};

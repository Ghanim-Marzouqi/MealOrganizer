import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

import Colors from '../../config/Colors';

const HeaderTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Almarai-Bold',
    color: Colors.white,
  },
});

export default HeaderTitle;

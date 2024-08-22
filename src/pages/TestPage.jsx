/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 测试
 *
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

function TestPage(props) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <View style={styles.page}>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
export default TestPage;

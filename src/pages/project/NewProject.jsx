/**
 * Author: Meng
 * Date: 2022-09-27
 * Desc:
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, CompatButton} from '../../components';
import {StateComponent, DataWidget} from '../../libs/hooks_state/index'
import ProjectStore from './ProjectStore'


let store = null
const Project = () => {
  store = new ProjectStore();
  return <StateComponent store={store} children={renderVIew}/>  
};

function renderVIew() {

  return (
    <View style={styles.page}>
      <Header />
      <DataWidget data={store.curDate} child={dateView}/>
      {dateView()}
    </View>
  );
}

function dateView(date) {
  return (
    <CompatButton onPress={store.onChangeDate}>
      <Text style={styles.date}>{date}</Text>
    </CompatButton>
  );
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  itemText: {
    lineHeight: 48,
  },
  date: {
    color: '#ff0099',
  },
});

export default Project;

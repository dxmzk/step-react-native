/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { CompatButton } from '../../components';
import { StateComponent, DataWidget} from '../../libs/hooks_state/index'
import MyStore from './MyStore';

export default class My extends StateComponent {
  constructor(props) {
    super(props);
    this._store = new MyStore()
    this.state = {
      date: Date.now(),
    };
  }

  onChangeDate = () => {
    this.setState({date: Date.now()})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>个人中心😯</Text>
        <DataWidget data={this._store.curDate} child={this.dateView}/>
        {this.dateView()}
      </View>
    );
  }

  dateView = (date) => {
    // const date = this.state.date;
    return <CompatButton onPress={this._store.onchange}>
      <Text style={styles.date}>{date}</Text>
    </CompatButton>
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {

    color: '#ff0099'
  }
})

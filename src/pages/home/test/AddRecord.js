/**
 * Author: Meng
 * Date: 2023-12-19
 * Modify: 2023-12-19
 * Desc: 
 */
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { Header } from '../../../components/index';
import ChooseUser from "./ChooseUser";

export default class AddRecord extends React.PureComponent {

  chooseRef = null;

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  componentDidMount() {
    // 获取默认值
  }

  onChangeInput = (inputText) => {
    console.log(inputText)
    this.setState({ inputText })
  }

  render() {
    const { inputText } = this.state;
    return (
      <View style={styles.page}>
        <Header title="知之学吧" />
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline
            maxLength={300}
            value={inputText}
            textAlignVertical='top'
            placeholderTextColor='#979797'
            placeholder="请填写复盘小结以及下一步计划"
            onChangeText={this.onChangeInput} />
          <Text style={styles.inputCount}>{inputText.length}/300</Text>
        </View>
        <View style={styles.upload}>

        </View>

        <TouchableOpacity onPress={() => {
          this.chooseRef.show()
        }}>
          <Text style={styles.linkBtn}>@关联人</Text>
        </TouchableOpacity>
        

        <View style={styles.footer}>
          <Text style={styles.commitBtn}>提交</Text>
        </View>

        <ChooseUser ref={view => this.chooseRef=view}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  inputBox: {
    minHeight: 158,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#f3f3f3',
  },
  input: {
    color: '#232323',
    flex: 1,
  },
  inputCount: {
    color: '#979797',
    fontSize: 12,
    textAlign: 'right'
  },
  upload: {
    width: 72,
    height: 72,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    marginVertical: 16,
  },
  linkBtn: {
    width: 75,
    color: '#3478F6',
    fontSize: 14,
    lineHeight: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: '#EFF4FD',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 8
  },
  commitBtn: {
    height: 40,
    lineHeight: 40,
    borderRadius: 4,
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#3478F6'
  }
});

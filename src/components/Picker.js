/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';

// interface Props {
//   key?: string;
//   testID?: string;
//   // style?: object;
//   width?: number; // 宽度
//   row?: number; // 宽度的百分比（列数）
//   // column?: number; // 行数
//   // height?: number; // 高度
//   value?: any; // 默认值
//   data?: any[];
//   onChange?: (index: number, e: any) => void;
//   scrollStyle?: object;
//   onPress?: any;
//   selectTextStyle?: object;
// }

const { width } = Dimensions.get('window');

const Picker = (props) => {
  // let column = Math.round((props.height || 294) / 42); // 纠正高度
  let column = 7; // 纠正高度
  // if (props.column) {
  //   column = column > 7 ? 7 : column < 3 ? 3 : column;
  // }
  // column += column % 2 === 0 ? 1 : 0;
  const centerNum = (column - 1) / 2; // 设置奇数位
  const vh = 42 * (centerNum * 2 + 1); // 设置高度
  const vw = props.width || Math.round(width / (props.row || 3)); // 设置宽度
  const datas = []; // 重新组装数据
  const list = props.data || []; // 真实数据
  for (let i = 0; i < column; i++) {
    if (i === centerNum) {
      datas.push(...list);
    } else {
      datas.push(null);
    }
  }
  // 记录位置
  let initIndex = 3;
  const [position, setPosition] = useState(initIndex);
  const [isScroll, setScroll] = useState(false);

  function onScroll(e) {
    if (!isScroll) {
      setScroll(true);
    }
    const y = e.nativeEvent.contentOffset.y + centerNum * 42;
    // 一下判断避免过度渲染
    const nextIndex = Math.round(y / 42);
    if (nextIndex != position) {
      // initIndex = nextIndex
      setPosition(nextIndex);
    }
  }

  function onScrollEnd() {
    // console.log('34567890====>');
    // setPosition(initIndex);
    if (props.onChange && props.data) {
      const i = position - centerNum;
      props.onChange(i, props.data[i]);
    }
  }

  function itemView() {
    return datas.map((e, index) => {
      const isd = e != null;
      return (
        <View
          key={`k${index}`}
          style={[index === position ? itemStyle : itemStyle2]}>
          <Text
            onPress={index === position ? props.onPress : null}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              textStyle,
              index === position ? props.selectTextStyle : { color: '#232323' },
            ]}>{`${isd ? e : ''}`}</Text>
        </View>
      );
    });
  }

  function scrollTo(view) {
    if (props.value == null) {
      return;
    }
    const value = props.value;
    if (!isScroll && value) {
      let vind = 0;
      datas.forEach((e, index) => {
        if (value === e) {
          vind = index - initIndex;
        }
      });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        view?.scrollTo({ x: 0, y: vind * 42, animated: true });
      }, 100);
      // setPosition(posit);
    }
  }

  return (
    <View
      key={props.key}
      style={{
        ...scrollStyle,
        width: vw,
        height: vh,
        maxHeight: vh,
        ...props.scrollStyle,
      }}>
      <ScrollView
        style={{ width: '100%' }}
        // onLayout={() => scrollTo(scrollView)}
        ref={scrollTo}
        bounces={false}
        snapToInterval={42}
        // pagingEnabled={true}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onScrollEnd}
        showsVerticalScrollIndicator={false}>
        {itemView()}
      </ScrollView>
      <View style={lineStyle} pointerEvents="none" />
    </View>
  );
};

const scrollStyle = {
  width: 128,
  height: 294,
  // maxHeight: 294,
  backgroundColor: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
};
const lineStyle = {
  width: '94%',
  height: 40,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  borderTopColor: '#eee',
  position: 'absolute',
};
const itemStyle = {
  height: 42,
  alignItems: 'center',
  justifyContent: 'center',
};
const itemStyle2 = {
  height: 42,
  opacity: 0.6,
  transform: [{ scale: 0.87 }],
  alignItems: 'center',
  justifyContent: 'center',
};
const textStyle = {
  color: '#232323',
  width: '100%',
  fontSize: 17,
  textAlign: 'center',
  fontWeight: '600',
};

export default Picker;

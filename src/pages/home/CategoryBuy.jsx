/**
 * Author: Meng
 * Date: 2023-10-10
 * Modify: 2023-10-10
 * Desc: 品类购买情况
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// import RetailImages from '../../../Assets/Retail/index';
import {CompatButton} from '../../components/index';

const {width} = Dimensions.get('window');
const boxWidth = width - 64 - 84;

function CategoryBuy(props) {
  const itemList = [
    {name: '深的', ranking: 1, value: 182},
    {name: '阿三开的卡', ranking: 2, value: 342},
    {name: '阿四大队撒', ranking: 3, value: 872},
  ];
  const [pressItem, setPressItem] = useState(null);
  const [aixList, setAixList] = useState([0, 20, 40, 60, 80, 100]);
  const [tagValue, setTagValue] = useState({tag: 1, value: 1});
  const timer = useRef(0);
  const maxNum = useRef(1000);
  const defTitle = props.title || '品类购买情况';

  useEffect(() => {}, []);

  function gotoDiagnose() {}

  // 点击显示数据
  function onPressUser(item, index) {
    if (timer.current > 0) {
      clearTimeout(timer.current);
    }
    item.top = (index / itemList.length) * 100;
    setPressItem(item);
    timer.current = setTimeout(() => {
      clearTimeout(timer.current);
      setPressItem(null);
    }, 3000);
  }

  // 行项目
  function rankView(item, index) {
    let value = item.value || 0;
    if (value > 0) {
      value = Math.round((value * 100) / maxNum.current) || 1;
    }
    return (
      <TouchableOpacity
        key={item.name + index}
        style={styles.item}
        activeOpacity={0.9}
        onPress={() => onPressUser(item, index)}>
        <View style={styles.nameBox}>
          {item.ranking > 2 ? <Text style={styles.lowTag}>低</Text> : <></>}
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>

        <View style={styles.lineWidth}>
          <View style={styles.tagBg} />
          <View style={{...styles.lineBg, width: `${value}%`}} />
        </View>
      </TouchableOpacity>
    );
  }

  function aixView(num, index) {
    return (
      <Text key={num} style={styles.aixStr}>
        {num}
      </Text>
    );
  }

  function yLineView(num, index) {
    return <View key={index} style={styles.yLineView} />;
  }

  function PressItemView() {
    return (
      <View style={styles.press}>
        <Text style={styles.pressStr}>{pressItem.name}</Text>
        <Text style={styles.pressStr}>个人: {pressItem.value}</Text>
        <Text style={styles.pressStr}>目标: 600</Text>
        <Text style={styles.pressStr}>完成度: 30%</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{defTitle}</Text>
        <CompatButton style={styles.selectBox} onPress={gotoDiagnose}>
          <Text style={styles.select}>诊断详情</Text>
          {/* <Image style={styles.nextIc} source={RetailImages.right_arrow} /> */}
        </CompatButton>
      </View>

      <View style={styles.chart}>
        {/* 指引线 */}
        <View style={styles.yLine}>
          <View style={styles.nameBox} />
          {aixList.map(yLineView)}
          <View style={styles.yLineRight} />
        </View>

        {itemList.map(rankView)}

        {/* 坐标轴 */}
        <View style={styles.row}>
          <View style={styles.nameBox} />
          {aixList.map(aixView)}
        </View>

        {pressItem ? <PressItemView /> : <></>}
      </View>

      <View style={styles.diagnose}>
        <Text style={styles.diagnoseTitle}>诊断建议：</Text>
        <Text style={styles.diagnoseDesc}>
          <Text style={styles.diagnoseAlert}>装饰建材、卫浴</Text>
          ，在品类购买完成度中偏低，需重点关注
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    borderRadius: 12,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  row: {
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
    marginTop: 6,
  },
  title: {
    flex: 1,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
  },
  chart: {
    marginTop: 10,
  },
  item: {
    zIndex: 1,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectBox: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    marginLeft: 12,
  },
  select: {
    fontSize: 14,
    color: '#676767',
  },
  nextIc: {
    width: 16,
    height: 16,
  },
  nameBox: {
    width: 84,
    maxWidth: 84,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: '#f3f3f3',
  },
  lowTag: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginRight: 2,
    backgroundColor: '#FFEEED',

    color: '#F2453A',
    fontSize: 10,
  },
  itemName: {
    color: '#323232',
    fontSize: 12,
    maxWidth: 60,
  },
  lineWidth: {
    // width: 200,
    width: boxWidth,
    maxWidth: boxWidth,
    backgroundColor: '#F3F3F3',
  },
  tagBg: {
    width: boxWidth * 0.6,
    height: 10,
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#3478F640',
  },
  lineBg: {
    width: '3%',
    height: 10,
    backgroundColor: '#3478F6',
  },
  aixStr: {
    flex: 1,
    color: '#232323',
    fontSize: 12,
    textAlign: 'left',
  },
  yLine: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingBottom: 30,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#ff660060'
  },
  yLineView: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#f3f3f3',
    // backgroundColor: '#f3f3f3'
  },
  yLineRight: {
    width: 1,
    height: '100%',
    backgroundColor: '#f3f3f3',
  },
  press: {
    left: 120,
    zIndex: 9,
    minWidth: 78,
    minHeight: 72,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: '#000000B0',
  },
  pressStr: {
    color: 'white',
    fontSize: 10,
    lineHeight: 16,
  },
  diagnose: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#FFF7E8',
  },
  diagnoseTitle: {
    color: '#232323',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 20,
  },
  diagnoseDesc: {
    color: '#323232',
    fontSize: 12,
    lineHeight: 20,
  },
  diagnoseAlert: {
    borderLeftColor: 2,
    borderBottomColor: '#ff0066',
    // backgroundColor: '#ff0066'
  },
});

export default CategoryBuy;

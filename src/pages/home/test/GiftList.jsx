/**
 * Author: Meng
 * Date: 2023-10-24
 * Modify: 2023-10-24
 * Desc:
 */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function GiftList(props) {
  const [discount, setDiscount] = useState({
    use: false,
    amount: 20,
    useNum: 2,
    num: 0,
  });
  const [goodsList, setGoodsList] = useState([
    {
      id: 0,
      title: '这个标题会很长1很长2很长3很长4很长5很长6',
      select: false,
      num: 1,
      price: 23.4,
    },
    {id: 1, title: '这个标题很长1很2', select: false, num: 9, price: 20},
    {id: 2, title: '很长1很长', select: false, num: 5, price: 3.4},
    {id: 3, title: '这会很长1很长2', select: false, num: 8, price: 3},
    {id: 4, title: '这题会很长1长2', select: false, num: 7, price: 10.2},
    {id: 5, title: '这个题很长1很长2', select: false, num: 3, price: 9.99},
    {id: 6, title: '这个标题长1长2', select: false, num: 2, price: 2.29},
  ]);

  useEffect(() => {}, []);

  function onCheckItem(item) {
    const list = goodsList.filter(e => e.select);
    if (list.length < discount.useNum || (list.length == discount.useNum && item.select)) {
      item.select = !item.select;
      setGoodsList([].concat(goodsList));
      let use = false;
      let num = 0;
      let totalAmount = 0;
      goodsList.forEach(e => {
        if (e.select) {
          totalAmount += e.price;
          num += 1;
          use = totalAmount >= discount.amount;
        }
      });
      setDiscount({...discount, use, num});
    }
  }

  function goodsView({item}) {
    return (
      <View key={item.id} style={styles.itemView}>
        <TouchableOpacity
          style={styles.checkBox}
          activeOpacity={0.7}
          onPress={() => onCheckItem(item)}>
          <Image style={item.select ? styles.checkIc2 : styles.checkIc} />
        </TouchableOpacity>
        <Image style={styles.itemImg} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.itemNum}>x{item.num}</Text>
          <View style={styles.itemRow}>
            <Text style={styles.priceBox}>
              <Text style={styles.itemUnit}>¥</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </Text>
            <Text style={styles.priceBox2}>
              <Text>¥</Text>
              <Text style={styles.itemPrice2}>23.34</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <View style={styles.closeIc} />
            <Text style={styles.title}>圣诞快乐</Text>
            <View style={styles.closeIc} />
          </View>
          <Text style={styles.hintBox}>
            <Text>{discount.use ? '已满' : '未满足'}</Text>
            <Text style={styles.amount}>{discount.amount.toFixed(2)}</Text>
            <Text>元，可选赠品</Text>
            <Text style={styles.amount}>
              {discount.use ? discount.useNum : 0}
            </Text>
            <Text>种，已选</Text>
            <Text style={styles.amount}>{discount.num}</Text>
            <Text>种</Text>
          </Text>
          <View style={styles.alertBox}>
            <Text style={styles.amount}>
              满{discount.amount.toFixed(2)}元可领
            </Text>
          </View>
          <FlatList
            style={styles.flat}
            data={goodsList}
            renderItem={goodsView}
            ItemSeparatorComponent={<View style={styles.listLine} />}
          />
          <View style={styles.alertInfoBox}>
            <View style={styles.alertIc} />
            <Text style={styles.alertInfo}>
              如果在支付时，交易金额或者赠品活动有变化，则以实际赠品订单为准。
            </Text>
          </View>
          <View style={styles.btnBox}>
            <Text style={styles.btnStr}>确 定</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    top: 0,
    left: 0,
    zIndex: 97,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: '#00000060',
  },
  content: {
    // height: '70%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
  titleBox: {
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 0.5,
  },
  title: {
    color: '#232323',
    fontSize: 16,
    fontWeight: '700',
  },
  closeIc: {
    width: 23,
    height: 23,
    backgroundColor: '#ff8800',
  },
  hintBox: {
    color: '#232323',
    fontSize: 14,
    lineHeight: 16,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  amount: {
    color: '#FF6600',
    fontWeight: '700',
  },
  alertBox: {
    height: 32,
    borderRadius: 4,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3EB',
  },
  flat: {
    maxHeight: 350,
    marginHorizontal: 16,
  },
  itemView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 16,
  },
  listLine: {
    height: 0.5,
    backgroundColor: '#f3f3f3',
  },
  itemImg: {
    width: 72,
    height: 72,
    marginRight: 12,
    borderRadius: 4,
    backgroundColor: '#f3f3f3',
  },
  itemInfo: {
    flex: 1,
  },
  checkBox: {
    paddingVertical: 24,
    paddingRight: 16,
  },
  checkIc: {
    width: 16,
    height: 16,
    backgroundColor: '#f3f3f3',
  },
  checkIc2: {
    width: 16,
    height: 16,
    backgroundColor: '#FF6600',
  },
  itemTitle: {
    color: '#232323',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  itemNum: {
    color: '#979797',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
  },
  priceBox: {
    color: '#FF6600',
    fontSize: 18,
    lineHeight: 20,
  },
  itemUnit: {
    fontSize: 12,
  },
  itemPrice: {
    color: '#FF6600',
    fontWeight: '700',
  },
  priceBox2: {
    color: '#C3C3C3',
    fontSize: 12,
    lineHeight: 20,
    marginLeft: 16,
  },
  itemPrice2: {
    fontSize: 14,
    fontWeight: '700',
  },
  alertInfoBox: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopColor: '#f3f3f3',
    borderTopWidth: 1,
  },
  alertIc: {
    width: 16,
    height: 16,
    backgroundColor: '#f3f3f3',
  },
  alertInfo: {
    color: '#ff6600',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 4,
  },
  btnBox: {
    height: 40,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6600',
  },
  btnStr: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

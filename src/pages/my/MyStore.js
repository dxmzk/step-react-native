/**
 * Author: Meng
 * Date: 2023-
 * Desc: 
 */
import { Store, Datagram } from '../../libs/hooks_state/index'

export default class MyStore extends Store {

  curDate = new Datagram(Date.now());

  onchange = () => {
    console.log('=====>my')
    this.curDate.next(Date.now())
  }
}
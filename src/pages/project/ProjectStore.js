

/**
 * Author: Meng
 * Date: 2023-
 * Desc: 
 */
import { Store, Datagram } from "../../libs/hooks_state/index"

export default class ProjectStore extends Store {

  curDate = new Datagram(Date.now());

  onCreate(props) {
    console.log('===========> create: ProjectStore')
  }

  onChangeDate = () => {
    console.log('===========>: onChangeDate')
    this.curDate.next(Date.now());
  }
}
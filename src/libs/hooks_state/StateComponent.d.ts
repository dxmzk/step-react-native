/**
 * Author: Meng
 * Date: 2023-
 * Desc: 
 */

import React from "react";
import Store from "./Store";

interface StateComponentProps {
  store: Store;
  children: React.ReactNode[] | React.ReactNode;
}

declare class StateComponentBase extends React.PureComponent<StateComponentProps> {}

declare const StateComponent: React.ReactElement<StateComponentProps> & typeof StateComponentBase;

export default StateComponent;
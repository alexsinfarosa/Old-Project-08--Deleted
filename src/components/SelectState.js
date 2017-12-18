import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

import { ColMb } from "styles";

@inject("store")
@observer
export default class SelectState extends Component {
  render() {
    const {
      states,
      state,
      setState,
      isBlockBeingEdited
    } = this.props.store.app;

    const optionList = states.map(el => {
      return (
        <Select.Option key={el.id} value={el.name}>
          {el.name}
        </Select.Option>
      );
    });
    return (
      <ColMb style={{ marginBottom: isBlockBeingEdited ? 16 : 32 }}>
        {isBlockBeingEdited && "State:"}
        <Select
          style={{ width: "100%" }}
          value={state.name}
          placeholder={`Select state`}
          onChange={name => setState(name)}
        >
          {optionList}
        </Select>
      </ColMb>
    );
  }
}

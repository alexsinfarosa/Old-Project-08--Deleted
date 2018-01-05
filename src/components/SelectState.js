import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

import { ColMb } from "styles";

@inject("statesStore")
@observer
export default class SelectState extends Component {
  render() {
    const { states, state, setState } = this.props.statesStore;

    const optionList = states.map(state => {
      console.log(state);
      return (
        <Select.Option key={state.id} value={state.postalCode}>
          {state.name}
        </Select.Option>
      );
    });
    return (
      <ColMb style={{ marginBottom: isBlockBeingEdited ? 16 : 32 }}>
        {true && "State:"}
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

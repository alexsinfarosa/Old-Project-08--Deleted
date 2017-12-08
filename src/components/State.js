import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class State extends Component {
  render() {
    const { states, state, setState, isEditingBlock } = this.props.store.app;

    const optionList = states.map(el => {
      return (
        <Select.Option key={el.id} value={el.name}>
          {el.name}
        </Select.Option>
      );
    });
    return (
      <MBCol>
        {isEditingBlock && "State:"}
        <Select
          style={{ width: "100%" }}
          value={state.name}
          placeholder={`Select state`}
          onChange={name => setState(name)}
        >
          {optionList}
        </Select>
      </MBCol>
    );
  }
}

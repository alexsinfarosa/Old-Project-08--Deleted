import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";

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
      <Col style={{ marginBottom: isEditingBlock ? 16 : 32 }}>
        {isEditingBlock && "State:"}
        <Select
          style={{ width: "100%" }}
          value={state.name}
          placeholder={`Select state`}
          onChange={name => setState(name)}
        >
          {optionList}
        </Select>
      </Col>
    );
  }
}

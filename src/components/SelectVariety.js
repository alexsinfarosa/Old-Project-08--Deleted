import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

import { ColMb } from "styles";

@inject("store")
@observer
export default class SelectVariety extends Component {
  render() {
    const {
      subjects,
      subject,
      setSubject,
      isBlockBeingEdited
    } = this.props.store.app;

    const optionList = subjects.map(el => {
      return (
        <Select.Option key={el.id} value={el.name}>
          {el.name}
        </Select.Option>
      );
    });
    return (
      <ColMb style={{ marginBottom: isBlockBeingEdited ? 16 : 32 }}>
        {isBlockBeingEdited && "Apple variety:"}
        <Select
          style={{ width: "100%" }}
          value={subject.name}
          placeholder={`Select apple variety`}
          onChange={name => setSubject(name)}
        >
          {optionList}
        </Select>
      </ColMb>
    );
  }
}

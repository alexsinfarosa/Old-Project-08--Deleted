import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class Variety extends Component {
  render() {
    const {
      subjects,
      subject,
      setSubject,
      isEditingBlock
    } = this.props.store.app;

    const optionList = subjects.map(el => {
      return (
        <Select.Option key={el.id} value={el.name}>
          {el.name}
        </Select.Option>
      );
    });
    return (
      <MBCol id={isEditingBlock ? "edit" : null}>
        <Select
          style={{ width: "100%" }}
          value={subject.name}
          placeholder={`Select apple variety`}
          onChange={name => setSubject(name)}
        >
          {optionList}
        </Select>
      </MBCol>
    );
  }
}

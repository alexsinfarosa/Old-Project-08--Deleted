import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";

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
      <Col style={{ marginBottom: isEditingBlock ? 16 : 32 }}>
        {isEditingBlock && "Apple variety:"}
        <Select
          style={{ width: "100%" }}
          value={subject.name}
          placeholder={`Select apple variety`}
          onChange={name => setSubject(name)}
        >
          {optionList}
        </Select>
      </Col>
    );
  }
}

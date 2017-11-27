import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";
import { toJS } from "mobx";

@inject("store")
@observer
class DropDown extends Component {
  render() {
    const { isEditing } = this.props.store.app;
    const { list, object, setOption } = this.props;
    console.log(toJS(object));
    const optionList = list.map((el, i) => {
      return (
        <Select.Option key={i} value={el.name}>
          {el.name}
        </Select.Option>
      );
    });

    return (
      <Col
        style={{
          background: isEditing ? "#FDF7D0" : null,
          margin: "16px 0"
        }}
      >
        <p style={{ lineHeight: "1.5" }}>{object.subject}:</p>
        <Select
          name={`${object.subject}`}
          size="large"
          autoFocus
          value={object.name}
          placeholder={`Select ${object.placeholder}`}
          style={{ width: "100%" }}
          onChange={option => {
            setOption(option);
          }}
        >
          {optionList}
        </Select>
      </Col>
    );
  }
}

export default DropDown;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";
// import { toJS } from "mobx";

@inject("store")
@observer
class DropDown extends Component {
  render() {
    const { isEditing } = this.props.store.app;
    const { list, object, setOption, label } = this.props;

    const isStation = label === "Station";
    const optionList = list.map(el => {
      return (
        <Select.Option key={el.id} value={isStation ? el.id : el.name}>
          {el.name}
        </Select.Option>
      );
    });

    const NumOfStations = () => {
      if (isStation) {
        return <small> ({list.length})</small>;
      }
      return null;
    };

    return (
      <Col
        style={{
          background: isEditing ? "#FDF7D0" : null,
          margin: "16px 0"
        }}
      >
        <p style={{ lineHeight: "1.5" }}>
          {label}
          {<NumOfStations />}:
        </p>
        <Select
          name={label}
          size="large"
          autoFocus
          value={object.name}
          placeholder={`Select ${label}`}
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

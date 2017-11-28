import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";
// import { toJS } from "mobx";

@inject("store")
@observer
class DropDown extends Component {
  render() {
    const { isEditing } = this.props.store.app;
    const { list, object, setOption } = this.props;

    const isStation = object.subject === "Station";
    const optionList = list.map(el => {
      return (
        <Select.Option key={el.id} value={isStation ? el.id : el.name}>
          {el.name}
        </Select.Option>
      );
    });

    const NumOfStations = () => {
      if (isStation) {
        return <small>({list.length})</small>;
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
          {object.subject} {<NumOfStations />}:
        </p>
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

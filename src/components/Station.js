import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";

@inject("store")
@observer
export default class Station extends Component {
  render() {
    const {
      currentStateStations,
      station,
      setStation,
      isEditingBlock
    } = this.props.store.app;

    const optionList = currentStateStations.map(el => {
      return (
        <Select.Option key={el.id} value={el.id}>
          {el.name}
        </Select.Option>
      );
    });
    return (
      <Col style={{ marginBottom: isEditingBlock ? 16 : 32 }}>
        {isEditingBlock && "Station:"}

        <Select
          style={{ width: "100%" }}
          value={station.name}
          placeholder={`Select station (${currentStateStations.length})`}
          onChange={id => setStation(id)}
        >
          {optionList}
        </Select>
      </Col>
    );
  }
}

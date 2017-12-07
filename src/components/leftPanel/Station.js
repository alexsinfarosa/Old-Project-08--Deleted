import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

// styled components
import { MBCol } from "styles";

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
      <MBCol id={isEditingBlock ? "edit" : null}>
        <Select
          style={{ width: "100%" }}
          value={station.name}
          placeholder={`Select station (${currentStateStations.length})`}
          onChange={id => setStation(id)}
        >
          {optionList}
        </Select>
      </MBCol>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Select } from "antd";

import { Box } from "rebass";

@inject("store")
@observer
export default class SelectStation extends Component {
  render() {
    const {
      currentStateStations,
      station,
      setStation,
      isBlockBeingEdited
    } = this.props.store.app;

    const optionList = currentStateStations.map(el => {
      return (
        <Select.Option key={el.id} value={el.id}>
          {el.name}
        </Select.Option>
      );
    });
    return (
      <Box mb={[1, 2]}>
        {isBlockBeingEdited && "Station:"}

        <Select
          style={{ width: "100%" }}
          value={station.name}
          placeholder={`Select station (${currentStateStations.length})`}
          onChange={id => setStation(id)}
        >
          {optionList}
        </Select>
      </Box>
    );
  }
}

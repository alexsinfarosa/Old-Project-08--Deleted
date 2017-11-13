import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";
import { Select } from "antd";

@inject("store")
@observer
export default class Station extends Component {
  handleChange = value => {
    const { setStation, closeSidebar } = this.props.store.app;
    setStation(value);
    closeSidebar();
  };
  render() {
    const { currentStateStations, station, isEditing } = this.props.store.app;

    const stationList = currentStateStations.map(station => (
      <Select.Option
        key={`${station.id} ${station.network}`}
        value={station.name}
      >
        {station.name}
      </Select.Option>
    ));

    return (
      <Box mb={3}>
        <label>Station:</label>
        <Select
          name="station"
          size="large"
          value={station.name}
          placeholder={`Select Station (${currentStateStations.length})`}
          style={{
            width: "100%",
            border: isEditing ? "1px solid red" : null,
            borderRadius: "5px"
          }}
          onChange={this.handleChange}
        >
          {stationList}
        </Select>
      </Box>
    );
  }
}

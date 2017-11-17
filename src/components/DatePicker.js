import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";

import { DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

@inject("store")
@observer
export default class Datepicker extends Component {
  onChange = (date, dateString) => {
    const { closeSidebar } = this.props.store.app;
    this.props.setDate(date);
    closeSidebar();
  };

  // onOk = value => {
  //   const { closeSidebar, loadGridData } = this.props.store.app;
  //   console.log(value);
  //   this.props.setDate(value);
  //   loadGridData();
  //   closeSidebar();
  // };

  disabledStartDate = current => {
    return current && current.valueOf() > Date.now();
  };

  render() {
    const { label, value } = this.props;
    const { isEditing } = this.props.store.app;
    const date = moment(value);
    return (
      <Box
        mb={3}
        style={{
          background: isEditing ? "#FDF7D0" : null,
          borderRadius: isEditing ? "5px" : null
        }}
      >
        <label>{label}:</label>
        <AntdDatePicker
          showTime
          style={{ width: "100%" }}
          value={value ? date : null}
          size="large"
          allowClear={false}
          format="MMM DD YYYY H:00"
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => this.onChange(date, dateString)}
          // onOk={v => this.onOk(v)}
        />
      </Box>
    );
  }
}

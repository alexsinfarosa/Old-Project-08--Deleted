import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";

import { DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

@inject("store")
@observer
export default class Datepicker extends Component {
  onChange = (date, dateString) => {
    const { closeSidebar, loadGridData } = this.props.store.app;
    this.props.setDate(dateString);
    loadGridData();
    closeSidebar();
  };

  onOk = value => {
    const { closeSidebar, loadGridData } = this.props.store.app;
    this.props.setDate(value._i);
    loadGridData();
    closeSidebar();
  };

  disabledStartDate = current => {
    return current && current.valueOf() > Date.now();
  };

  render() {
    const { label, value } = this.props;
    const date = moment(value);
    return (
      <Box mb={3}>
        <label>{label}:</label>
        <AntdDatePicker
          showTime
          style={{ width: "100%" }}
          value={value ? date : null}
          size="large"
          allowClear={false}
          format="MMM DD YYYY HH:mm"
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => this.onChange(date, dateString)}
          onOk={value => this.onOk(value)}
        />
      </Box>
    );
  }
}

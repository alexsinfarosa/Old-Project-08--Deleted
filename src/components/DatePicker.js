import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";

import { DatePicker as AntdDatePicker } from "antd";
import moment from "moment";
// import format from "date-fns/format";

@inject("store")
@observer
export default class Datepicker extends Component {
  onChange = (date, dateString) => {
    const {
      setEndDate,
      setIsMap,
      closeSidebar,
      loadGridData
    } = this.props.store.app;
    setEndDate(dateString);
    loadGridData();
    setIsMap(false);
    closeSidebar();
  };

  disabledStartDate = startValue => {
    if (moment(new Date()).isAfter(startValue)) {
      return false;
    }
    return true;
  };

  render() {
    const { endDate } = this.props.store.app;
    return (
      <Box mb={3}>
        <label>Date:</label>
        <AntdDatePicker
          style={{ width: 200 }}
          size="large"
          allowClear={false}
          value={moment(endDate)}
          format="MMM DD YYYY"
          disabledDate={this.disabledStartDate}
          showToday={false} // this is antd bug, check.
          onChange={(date, dateString) => this.onChange(date, dateString)}
        />
      </Box>
    );
  }
}

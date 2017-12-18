import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils";

import { Box } from "rebass";

@inject("store")
@observer
export default class SelectDatePicker extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  roundDate = (date, duration, method) => {
    return moment(Math[method](+date / +duration) * +duration);
  };

  render() {
    const { isBlockBeingEdited } = this.props.store.app;
    const { type, date, setDate } = this.props;
    return (
      <Box mb={[1, 2]}>
        {isBlockBeingEdited && type}
        <AntdDatePicker
          showTime={{ format: "HH:00" }}
          style={{ width: "100%" }}
          value={date ? moment(date) : undefined}
          allowClear={false}
          format="MMM Do YYYY, HH:00"
          placeholder={`Select date and time`}
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => {
            setDate(roundDate(date, moment.duration(60, "minutes"), "floor"));
          }}
        />
      </Box>
    );
  }
}

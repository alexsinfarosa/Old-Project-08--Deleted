import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils";

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
      <div>
        {isBlockBeingEdited && type}
        <AntdDatePicker
          showTime={{ format: "HH:00" }}
          style={{ width: "100%", marginBottom: 16 }}
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
      </div>
    );
  }
}

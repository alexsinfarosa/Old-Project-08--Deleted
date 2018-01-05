import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils/utils";

@inject("store")
@observer
export default class SelectEndDate extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  roundDate = (date, duration, method) => {
    return moment(Math[method](+date / +duration) * +duration);
  };

  render() {
    const { setEndDate, isBlockBeingEdited, endDate } = this.props.store.app;

    return (
      <div>
        {isBlockBeingEdited && "Model end date:"}
        <DatePicker
          showTime={{ format: "HH:00" }}
          style={{ width: "100%", marginBottom: 16 }}
          value={moment(endDate)}
          allowClear={false}
          format="MMM Do YYYY, HH:00"
          placeholder={`Select date and time`}
          disabledDate={this.disabledStartDate}
          onChange={(date, dateString) => {
            setEndDate(
              roundDate(date, moment.duration(60, "minutes"), "floor")
            );
          }}
        />
      </div>
    );
  }
}

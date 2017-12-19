import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils";

@inject("store")
@observer
export default class SelectStartDate extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  roundDate = (date, duration, method) => {
    return moment(Math[method](+date / +duration) * +duration);
  };

  render() {
    const {
      setDate,
      isStartDateModalOpen,
      date,
      updateBlock,
      hideStartDateModal
    } = this.props.store.app;

    return (
      <DatePicker
        open={isStartDateModalOpen}
        showTime={{ format: "HH:00" }}
        // style={{ width: "30%" }}
        value={moment(date)}
        allowClear={false}
        format="MMM Do YYYY, HH:00"
        placeholder={`Select date and time`}
        disabledDate={this.disabledStartDate}
        showToday={true}
        onChange={(date, dateString) => {
          setDate(roundDate(date, moment.duration(60, "minutes"), "floor"));
        }}
        onOk={() => {
          updateBlock();
          hideStartDateModal();
        }}
      />
    );
  }
}

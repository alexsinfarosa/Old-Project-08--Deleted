import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Col, DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils";

@inject("store")
@observer
export default class DatePicker extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  roundDate = (date, duration, method) => {
    return moment(Math[method](+date / +duration) * +duration);
  };

  render() {
    const { updateBlock, isEditingBlock } = this.props.store.app;
    const { type, date, setDate } = this.props;

    return (
      <Col style={{ marginBottom: type === "start" ? 0 : "32px" }}>
        {isEditingBlock && type.charAt(0).toUpperCase() + type.slice(1)}
        <AntdDatePicker
          showTime
          style={{ width: type === "start" ? 210 : "100%" }}
          value={date ? moment(date) : undefined}
          allowClear={false}
          format="MMM D YYYY, HH:mm"
          placeholder={`Select ${type} date and time`}
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => {
            setDate(roundDate(date, moment.duration(60, "minutes"), "floor"));
          }}
        />
      </Col>
    );
  }
}

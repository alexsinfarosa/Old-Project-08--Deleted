import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Col, DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

@inject("store")
@observer
export default class Datepicker extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  render() {
    const { isEditingBlock } = this.props.store.app;
    const { label, value, setDate } = this.props;

    return (
      <Col
        style={{
          background: isEditingBlock ? "#FDF7D0" : null,
          borderRadius: isEditingBlock ? "6px" : null,
          margin: "16px 0"
        }}
      >
        <p style={{ lineHeight: "1.5" }}>{label}:</p>
        <AntdDatePicker
          showTime
          style={{ width: "100%" }}
          value={value ? moment(value) : null}
          size="large"
          allowClear={false}
          format="MMM DD YYYY H:00"
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => {
            // console.log(date, dateString);
            setDate(date);
          }}
        />
      </Col>
    );
  }
}

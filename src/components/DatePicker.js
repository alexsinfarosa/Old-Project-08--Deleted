import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Col, DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

@inject("store")
@observer
export default class Datepicker extends Component {
  disabledStartDate = current => {
    return current && current.valueOf() > Date.now();
  };

  render() {
    const { isEditing, closeSidebar } = this.props.store.app;
    const { label, value, setDate } = this.props;

    return (
      <Col
        style={{
          background: isEditing ? "#FDF7D0" : null,
          borderRadius: isEditing ? "6px" : null,
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
            setDate(date);
            closeSidebar();
          }}
        />
      </Col>
    );
  }
}

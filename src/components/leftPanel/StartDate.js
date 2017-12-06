import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Col, DatePicker } from "antd";
import moment from "moment";

@inject("store")
@observer
export default class StartDate extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  render() {
    const { date, setDate } = this.props.store.app;

    return (
      <Col>
        <DatePicker
          showTime
          style={{ width: 180 }}
          value={date ? moment(date) : undefined}
          allowClear={false}
          format="MMM D YYYY, HH:mm"
          placeholder="Select date and time"
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => setDate(date)}
        />
      </Col>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker as AntdDatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils";

// styled components
import { MBCol } from "styles";

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
    const { isEditingBlock } = this.props.store.app;
    const { type, date, setDate } = this.props;

    return (
      <MBCol>
        {isEditingBlock && type.charAt(0).toUpperCase() + type.slice(1)}
        <AntdDatePicker
          showTime
          style={{ width: "100%" }}
          value={date ? moment(date) : undefined}
          allowClear={false}
          format="MMM D YYYY, HH:mm"
          placeholder={`Select date and time`}
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => {
            setDate(roundDate(date, moment.duration(60, "minutes"), "floor"));
          }}
        />
      </MBCol>
    );
  }
}

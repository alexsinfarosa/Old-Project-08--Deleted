import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker } from "antd";
import moment from "moment";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class StartDate extends Component {
  disabledStartDate = current => {
    // const { date } = this.props;
    // Try Date.now(date)
    return current && current.valueOf() > Date.now();
  };

  render() {
    const { isEditingBlock, date, setDate } = this.props.store.app;

    return (
      <MBCol>
        <DatePicker
          showTime
          style={{ width: "100%" }}
          value={date}
          allowClear={false}
          format="MMM D YYYY, HH:mm"
          placeholder="Select date and time"
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => setDate(date)}
        />
      </MBCol>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { DatePicker } from "antd";
import moment from "moment";

// utils
import { roundDate } from "utils";

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

  roundDate = (date, duration, method) => {
    return moment(Math[method](+date / +duration) * +duration);
  };

  onOk = () => {
    const {
      isStartDateModal,
      addDateToBlock,
      hideStartDateModal
    } = this.props.store.app;

    if (isStartDateModal) {
      addDateToBlock();
      hideStartDateModal();
    }
  };

  render() {
    const {
      setDate,
      block,
      isEditingBlock,
      isStartDateModal,
      date
    } = this.props.store.app;

    return (
      <MBCol>
        {isEditingBlock && "Model Start Date:"}
        <DatePicker
          open={isStartDateModal}
          showTime
          style={{ width: "100%" }}
          value={block.date ? moment(block.date) : moment(date)}
          allowClear={false}
          format="MMM D YYYY, HH:mm"
          placeholder={`Select date and time`}
          disabledDate={this.disabledStartDate}
          showToday={true}
          onChange={(date, dateString) => {
            setDate(roundDate(date, moment.duration(60, "minutes"), "floor"));
          }}
          onOk={this.onOk}
        />
      </MBCol>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import format from "date-fns/format";
// import subDays from "date-fns/sub_days";
// import addDays from "date-fns/add_days";
import { Table } from "antd";

@inject("store")
@observer
export default class GrowthTable extends Component {
  render() {
    const { block } = this.props;

    //columns for the model
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Air Temp (˚F)",
        dataIndex: "temp",
        key: "temp"
      },
      {
        title: "Hourly Growth (mm)",
        dataIndex: "hrGrowth",
        key: "hrGrowth"
      },
      {
        title: "Accumulated Growth (mm)",
        dataIndex: "cumulativeHrGrowth",
        key: "cumulativeHrGrowth",
        render: date => Number(date).toFixed(4)
      }
    ];

    // const stripeTable = i => {
    //   if (i % 2 === 1) return "stripe";
    // };

    return (
      <Table
        dataSource={block.gridData.slice()}
        columns={columns}
        pagination={false}
        rowKey={block => block.date}
      />
    );
  }
}

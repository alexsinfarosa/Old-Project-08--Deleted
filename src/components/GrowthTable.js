import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table } from "antd";

@inject("store")
@observer
export default class GrowthTable extends Component {
  render() {
    const { block } = this.props;
    const { isLoading } = this.props.store.app;

    //columns for the model
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "25%"
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

    return (
      <Table
        size="middle"
        dataSource={block.gridData.slice()}
        columns={columns}
        pagination={false}
        rowKey={block => block.date}
        loading={block.gridData.slice().length === 0}
        scroll={{ y: "35vh" }}
        bordered={false}
      />
    );
  }
}

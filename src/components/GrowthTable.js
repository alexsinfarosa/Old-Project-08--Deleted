import React, { Component } from "react";
import { inject, observer } from "mobx-react";
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
        key: "date",
        width: "20%"
      },
      {
        title: "Air Temp (˚F)",
        dataIndex: "temp",
        key: "temp",
        width: "20%"
      },
      {
        title: "Growth (mm)",
        width: "40%",
        children: [
          {
            title: "Hourly",
            dataIndex: "hrGrowth",
            key: "hrGrowth",
            width: "20%",
            render: d => Number(d).toFixed(2)
          },
          {
            title: "Accumulated",
            dataIndex: "cumulativeHrGrowth",
            key: "cumulativeHrGrowth",
            width: "20%",
            render: d => Number(d).toFixed(2)
          }
        ]
      },
      {
        title: "% of Target",
        dataIndex: "percentage",
        key: "percentage",
        width: "20%",
        render: perc => Number(perc).toFixed(2)
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
        bordered={true}
      />
    );
  }
}

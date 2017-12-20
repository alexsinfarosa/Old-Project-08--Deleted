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
    // const { areRequiredFieldsSet } = this.props.store.app;
    const { record } = this.props;

    //columns for the model
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      }
    ];

    // const stripeTable = i => {
    //   if (i % 2 === 1) return "stripe";
    // };

    return (
      <Table
        dataSource={record.data.slice()}
        columns={columns}
        pagination={false}
        rowKey={record => record[0]}
      />
    );
  }
}

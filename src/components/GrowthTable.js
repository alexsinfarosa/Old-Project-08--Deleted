import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import format from "date-fns/format";
// import subDays from "date-fns/sub_days";
// import addDays from "date-fns/add_days";
import { Flex, Box } from "rebass";
import { Table } from "antd";

import "index.css";

@inject("store")
@observer
export default class GrowthTable extends Component {
  render() {
    // const { areRequiredFieldsSet } = this.props.store.app;
    const { record } = this.props;
    console.log(record);

    //columns for the model
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: 250
      }
    ];

    // const stripeTable = i => {
    //   if (i % 2 === 1) return "stripe";
    // };

    return (
      <Flex
        column
        bg="white"
        p={1}
        mb={[1, 2, 3]}
        style={{ borderRadius: "5px" }}
      >
        <Box>
          <Table
            dataSource={record.data.slice()}
            columns={columns}
            pagination={false}
            rowKey={record => record[0]}
          />
        </Box>
      </Flex>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

import format from "date-fns/format";

// styled components
import { Block, MRow } from "styles";

// custom components
// import GrowthGraph from "components/GrowthGraph";
// import GrowthTable from "components/GrowthTable";

// antd
import { Row, Table, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class UserData extends Component {
  state = {
    record: {}
  };

  render() {
    const {
      getBlock,
      editBlock,
      deleteBlock,
      isEditing,
      isLoading
    } = this.props.store.app;

    // columns ----------------------------------------------------------
    const columns = [
      {
        title: "Variety",
        dataIndex: "variety",
        key: "variety"
      },
      {
        title: "Avg. Style Length",
        dataIndex: "avgStyleLength",
        key: "avgStyleLength",
        render: text => <span>{`${text}`}</span>
      },
      {
        title: "Start Date",
        dataIndex: "date",
        key: "date",
        render: (text, record) => (
          <span>{format(text, "MMM DD YYYY HH:00")}</span>
        )
      },
      {
        title: "Spray Dates",
        dataIndex: "firstSpray",
        key: "firstSpray",
        render: (text, record) =>
          text ? (
            <Steps direction="vertical" size="small">
              <Step
                title="1st"
                description={format(text, "MMM DD YYYY HH:00")}
              />
              <Step
                title="2nd"
                description={format(text, "MMM DD YYYY HH:00")}
              />
              <Step
                title="3rd"
                description={format(text, "MMM DD YYYY HH:00")}
              />
            </Steps>
          ) : null
      },
      // {
      //   title: "2nd Spray Date",
      //   dataIndex: "secondSpray",
      //   key: "secondSpray",
      //   render: (text, record) =>
      //     text ? <span>{format(text, "MMM DD YYYY HH:00")}</span> : null
      // },
      // {
      //   title: "3rd Spray Date",
      //   dataIndex: "thirdSpray",
      //   key: "thirdSpray",
      //   render: (text, record) =>
      //     text ? <span>{format(text, "MMM DD YYYY HH:00")}</span> : null
      // },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record, index) => (
          <span>
            <a onClick={() => deleteBlock(record, index)}>Delete</a>
            <span className="ant-divider" />
            <a
              onClick={() => {
                editBlock(record, index);
                this.setState({ record });
              }}
            >
              Edit
            </a>
          </span>
        )
      }
    ];
    //  end columns ------------------------------------------------------

    const isRowSelected = record => {
      if (record.isEditing && isEditing) return "selected";
    };

    return (
      <Block>
        <Row>
          <MRow type="flex" justify="center">
            <h2>
              Block Info:{" "}
              <i>
                {getBlock.name} for {getBlock.station}, {getBlock.state}
              </i>
            </h2>
          </MRow>

          <MRow>
            <Table
              loading={isLoading}
              rowClassName={record => isRowSelected(record)}
              expandIconColumnIndex={0}
              expandIconAsCell={false}
              size="middle"
              pagination={false}
              rowKey={record => record.id}
              dataSource={[getBlock]}
              columns={columns}
              // expandedRowRender={record => <GrowthTable record={record} />}
              scroll={{ x: 900 }}
            />
          </MRow>
        </Row>
      </Block>
    );
  }
}

export default UserData;

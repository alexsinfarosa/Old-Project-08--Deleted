import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

import format from "date-fns/format";

// styled components
import { Block, MRow } from "styles";

// antd
import { Row, Table, Steps, Popconfirm, message } from "antd";
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

    const confirm = (record, index) => {
      message.success(`Block ${record.name} has been deleted`);
      deleteBlock(record, index);
    };

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
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              key={index}
              onConfirm={() => confirm(record, index)}
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>

            <span className="ant-divider" />
            <a
              onClick={() => {
                editBlock(record, index);
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
          <MRow>
            <h3>
              {getBlock.station.name}, {getBlock.state}
            </h3>
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
              scroll={{ x: 800 }}
            />
          </MRow>
        </Row>
      </Block>
    );
  }
}

export default UserData;

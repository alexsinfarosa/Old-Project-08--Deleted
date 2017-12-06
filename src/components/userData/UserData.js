import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import format from "date-fns/format";

// styled components
import { Block, MBRow } from "styles";

import StyleLengthsModal from "components/userData/StyleLengthsModal";
import StartDate from "components/leftPanel/StartDate";

// antd
import { Row, Col, Table, Steps, Popconfirm, message } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class UserData extends Component {
  render() {
    const { editBlock, deleteBlock, isLoading, block } = this.props.store.app;

    console.log(toJS(block));

    const confirm = (record, index) => {
      message.success(`${record.name} block has been deleted!`);
      deleteBlock(record, index);
    };

    // to set the number on the STEP component
    const { firstSpray, secondSpray, thirdSpray } = block;
    const first = format(firstSpray, "x");
    const second = format(secondSpray, "x");
    const third = format(thirdSpray, "x");
    const dates = [first, second, third];
    const max = Math.max(...dates);
    let current = 0;
    current = dates.findIndex(date => date === max.toString());

    // columns ----------------------------------------------------------
    const columns = [
      {
        title: "Variety",
        dataIndex: "variety.name",
        key: "variety"
      },
      {
        title: "Avg. Style Length",
        dataIndex: "avgStyleLength",
        key: "avgStyleLength",
        render: text => <StyleLengthsModal text={text.toPrecision(4)} />
      },
      {
        title: "Spray Dates",
        dataIndex: "firstSpray",
        key: "firstSpray",
        render: (text, record) =>
          text ? (
            <Steps direction="vertical" size="small" current={current}>
              <Step
                title="1st"
                description={
                  record.firstSpray
                    ? format(record.firstSpray, "MMM DD YYYY HH:00")
                    : null
                }
              />
              <Step
                title="2nd"
                description={
                  record.secondSpray
                    ? format(record.secondSpray, "MMM DD YYYY HH:00")
                    : null
                }
              />
              <Step
                title="3rd"
                description={
                  record.thirdSpray
                    ? format(record.thirdSpray, "MMM DD YYYY HH:00")
                    : null
                }
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
                editBlock(record);
              }}
            >
              Edit
            </a>
          </span>
        )
      }
    ];
    //  end columns ------------------------------------------------------

    return (
      <Block>
        <Row>
          <MBRow type="flex" justify="space-between">
            <Col>
              <h3>
                {block.station.name}, {block.state.postalCode}
              </h3>
            </Col>
            <Col style={{ display: "flex", alignItems: "baseline" }}>
              <p style={{ marginRight: 5 }}>Model Start Date: </p>
              <StartDate />
            </Col>
          </MBRow>

          <MBRow>
            <Table
              loading={isLoading}
              rowClassName={record => (record.isEditing ? "selected" : null)}
              expandIconColumnIndex={0}
              expandIconAsCell={false}
              size="middle"
              pagination={false}
              rowKey={record => record.id}
              dataSource={[block]}
              columns={columns}
              scroll={{ x: 800 }}
            />
          </MBRow>
        </Row>
      </Block>
    );
  }
}

export default UserData;

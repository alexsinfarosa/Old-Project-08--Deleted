import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import format from "date-fns/format";
import max from "date-fns/max";

// styled components
import { Block, MRow } from "styles";

import StyleLengthsModal from "components/StyleLengthsModal";

// antd
import { Row, Col, Table, Steps, Popconfirm, message, Button } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class UserData extends Component {
  render() {
    const {
      editBlock,
      deleteBlock,
      isLoading,
      showModal,
      selectedBlock
    } = this.props.store.app;

    const confirm = (record, index) => {
      message.success(`Block ${record.name} has been deleted`);
      deleteBlock(record, index);
    };

    // to set the number on the STEP component
    const { firstSpray, secondSpray, thirdSpray } = selectedBlock;
    const first = format(firstSpray, "x");
    const second = format(secondSpray, "x");
    const third = format(thirdSpray, "x");
    const dates = [first, second, third];
    const max = Math.max(...dates);
    const current = dates.findIndex(date => date === max.toString());

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
          <MRow type="flex" justify="space-between">
            <Col>
              <h3>
                {selectedBlock.station.name}, {selectedBlock.state.postalCode}
              </h3>
            </Col>
            <Col>
              <Button onClick={() => showModal()}>Style Length</Button>
            </Col>
          </MRow>

          <MRow>
            <Table
              loading={isLoading}
              rowClassName={record => (record.isEditing ? "selected" : null)}
              expandIconColumnIndex={0}
              expandIconAsCell={false}
              size="middle"
              pagination={false}
              rowKey={record => record.id}
              dataSource={[selectedBlock]}
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

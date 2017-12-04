import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

import format from "date-fns/format";

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

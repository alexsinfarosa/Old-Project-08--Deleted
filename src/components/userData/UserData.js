import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import format from "date-fns/format";

// styled components
import { Block, MBRow } from "styles";

// import StartDate from "components/StartDate";

// antd
import { Row, Col, Table, Steps, Button } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class UserData extends Component {
  render() {
    const {
      isLoading,
      block,
      showStyleLengthModal,
      showStartDateModal,
      isStartDateModalOpen
    } = this.props.store.app;
    console.log(toJS(block));

    // to set the number on the STEP component
    const { firstSpray, secondSpray, thirdSpray } = block;
    const dates = [firstSpray, secondSpray, thirdSpray]
      .map(date => (date === undefined ? 0 : date))
      .map(date => format(date, "x"));
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
        render: text => <span>{text ? text.toPrecision(4) : text}</span>
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
                    ? format(record.firstSpray, "MMM Do YYYY HH:00")
                    : null
                }
              />
              <Step
                title="2nd"
                description={
                  record.secondSpray
                    ? format(record.secondSpray, "MMM Do YYYY HH:00")
                    : null
                }
              />
              <Step
                title="3rd"
                description={
                  record.thirdSpray
                    ? format(record.thirdSpray, "MMM Do YYYY HH:00")
                    : null
                }
              />
            </Steps>
          ) : null
      }
    ];
    //  end columns ------------------------------------------------------

    return (
      <Block>
        <Row>
          <MBRow
            type="flex"
            justify="space-between"
            align="middle"
            style={{ height: 34 }}
          >
            <Col>
              <div style={{ fontSize: "1.1rem" }}>
                <b>
                  {block.station.name}, {block.state.postalCode}
                </b>
              </div>
            </Col>
            <Col>
              {!block.avgStyleLength && (
                <Button icon="calculator" onClick={showStyleLengthModal}>
                  Set Style Length
                </Button>
              )}
            </Col>
            <Col>
              {block.date ? (
                <div>
                  <b>Model Start Date:</b>{" "}
                  {format(block.date, "MMM Do YYYY, HH:00")}
                </div>
              ) : (
                <Button icon="calendar" onClick={showStartDateModal}>
                  Set Start Date
                </Button>
              )}
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

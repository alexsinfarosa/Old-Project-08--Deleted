import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import format from "date-fns/format";

// styled components
import { Block, MBRow } from "styles";

// import StartDate from "components/StartDate";

// antd
import { Row, Col, Table, Steps, Button, Badge } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class SingleBlock extends Component {
  render() {
    const {
      isLoading,
      block,
      showStyleLengthModal,
      showStartDateModal
    } = this.props.store.app;

    // console.log(toJS(block));

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
            <Steps
              direction="vertical"
              size="small"
              current={record.currentIndex - 1}
            >
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
                <Badge dot>
                  <Button icon="calculator" onClick={showStyleLengthModal}>
                    Set Style Length
                  </Button>
                </Badge>
              )}
            </Col>
            <Col>
              {block.date ? (
                <div>
                  <b>Model Start Date:</b>{" "}
                  {format(block.date, "MMM Do YYYY, HH:00")}
                </div>
              ) : (
                <Badge dot>
                  <Button icon="calendar" onClick={showStartDateModal}>
                    Set Start Date
                  </Button>
                </Badge>
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

export default SingleBlock;

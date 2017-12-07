import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import format from "date-fns/format";

// styled components
import { Block, MBRow } from "styles";

import StartDate from "components/leftPanel/StartDate";

// antd
import { Row, Col, Table, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class UserData extends Component {
  render() {
    const { isLoading, block } = this.props.store.app;

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
        render: text => <span>{text.toPrecision(4)}</span>
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

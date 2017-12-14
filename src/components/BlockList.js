import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import format from "date-fns/format";

import {
  Row,
  Col,
  List,
  Card,
  Steps,
  Icon,
  Progress,
  Divider,
  Popconfirm,
  Tooltip
} from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class BlockList extends Component {
  render() {
    const {
      blocks,
      setBlock,
      setAreBlocksDisplayed,
      editBlock,
      deleteBlock
    } = this.props.store.app;

    const StepTitle = props => <small>{props.children}</small>;
    const CardTitle = block => (
      <Row type="flex" justify="space-between" align="middle">
        <Col span={6}>
          <small>
            {block.station.name}, {block.state.postalCode}
          </small>
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <a
            onClick={() => {
              setAreBlocksDisplayed(false);
              setBlock(block.id);
            }}
          >
            <small>{block.name} </small>
          </a>
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <small>{block.variety.name}</small>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Tooltip title="Edit block">
            <a>
              <Icon
                type="edit"
                style={{ marginRight: 4 }}
                onClick={() => editBlock(block.id)}
              />
            </a>
          </Tooltip>

          <Divider type="vertical" />
          <Popconfirm
            placement="left"
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteBlock(block.id)}
          >
            <Tooltip title="Delete block">
              <a>
                <Icon type="delete" />
              </a>
            </Tooltip>
          </Popconfirm>
        </Col>
      </Row>
    );

    return (
      <Row>
        <Col>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              xxl: 2
            }}
            dataSource={blocks}
            renderItem={block => (
              <List.Item
                key={block.id}
                style={{ background: "#E2EBE6", borderRadius: 4 }}
              >
                <List.Item.Meta
                  avatar={
                    <Progress
                      type="circle"
                      // gapPosition="top"
                      percent={30}
                      width={60}
                      showInfo={true}
                      strokeWidth={10}
                      style={{ fill: "red" }}
                    />
                  }
                />
                <Card
                  title={<CardTitle {...block} />}
                  // onClick={() => {
                  //   setBlock(block.id);
                  //   setAreBlocksDisplayed(false);
                  // }}
                  bodyStyle={{ marginTop: 16 }}
                >
                  <Steps
                    progressDot
                    current={block.date ? block.currentIndex : null}
                  >
                    <Step
                      title={<StepTitle>Start</StepTitle>}
                      description={
                        block.date ? (
                          <small>{format(block.date, "MM/DD/YY HH:00")}</small>
                        ) : null
                      }
                    />
                    <Step
                      title={<StepTitle>1st Spray</StepTitle>}
                      description={
                        block.firstSpray ? (
                          <small>
                            {format(block.firstSpray, "MM/DD/YY HH:00")}
                          </small>
                        ) : null
                      }
                    />
                    <Step
                      title={<StepTitle>2nd Spray</StepTitle>}
                      description={
                        block.secondSpray ? (
                          <small>
                            {format(block.secondSpray, "MM/DD/YY HH:00")}
                          </small>
                        ) : null
                      }
                    />
                    <Step
                      title={<StepTitle>3rd Spray</StepTitle>}
                      description={
                        block.thirdSpray ? (
                          <small>
                            {format(block.thirdSpray, "MM/DD/YY HH:00")}
                          </small>
                        ) : null
                      }
                    />
                    <Step
                      title={<StepTitle>End</StepTitle>}
                      description={
                        block.endDate ? (
                          <small>
                            {format(block.endDate, "MM/DD/YY HH:00")}
                          </small>
                        ) : null
                      }
                    />
                  </Steps>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
}

export default BlockList;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import format from "date-fns/format";

import { Section } from "styles";

// antd
import {
  Row,
  Col,
  Tooltip,
  Icon,
  Divider,
  Popconfirm,
  Steps,
  Button,
  Progress
} from "antd";
const Step = Steps.Step;

@inject("store")
@observer
export default class Block extends Component {
  render() {
    const {
      showBlockModal,
      editBlock,
      deleteBlock,
      showStartDateModal,
      showStyleLengthModal,
      setRadioValue
    } = this.props.store.app;

    const { breakpoints, block } = this.props;
    // console.log(block);

    const StepTitle = props => <small>{props.children}</small>;

    return (
      <Section
        style={{
          border: "1px solid #eee",
          borderRadius: 4,
          padding: 8
        }}
      >
        <Col
          style={{
            background: "#4EA27D",
            color: "#fff",
            padding: 16,
            borderRadius: 4
          }}
        >
          <Row type="flex" justify="space-between">
            <Col>{block.name}</Col>
            <Col>{block.variety.name}</Col>
            {!breakpoints.xs && (
              <Col>
                {block.station.name}, {block.state.postalCode}
              </Col>
            )}
            <Col>
              <Row type="flex" justify="space-between">
                <Col>
                  <Tooltip title="Edit block">
                    <a style={{ color: "white" }}>
                      <Icon
                        type="edit"
                        style={{ marginRight: 4 }}
                        onClick={() => {
                          showBlockModal();
                          editBlock(block.id);
                        }}
                      />
                    </a>
                  </Tooltip>
                </Col>
                <Col>
                  <Divider type="vertical" />
                </Col>
                <Col>
                  <Popconfirm
                    placement="left"
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteBlock(block.id)}
                  >
                    <Tooltip title="Delete block">
                      <a style={{ color: "white" }}>
                        <Icon type="delete" />
                      </a>
                    </Tooltip>
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col>
          {!block.date && !block.avgStyleLength ? (
            <Row type="flex" justify="space-around" align="center">
              <Button
                type="default"
                style={{ width: "40%" }}
                onClick={() => {
                  editBlock(block.id);
                  showStartDateModal();
                }}
              >
                Set Start Date
              </Button>
              <Button
                type="default"
                style={{ width: "40%" }}
                onClick={() => {
                  setRadioValue(null);
                  showStyleLengthModal();
                }}
              >
                Set Style Length
              </Button>
            </Row>
          ) : (
            <Row style={{ background: "orange" }}>
              <Col xs={12} sm={24} md={24} lg={24}>
                <Steps
                  size="small"
                  direction={breakpoints.xs ? "vertical" : "horizontal"}
                  progressDot={true}
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
                        <small>{format(block.endDate, "MM/DD/YY HH:00")}</small>
                      ) : null
                    }
                  />
                </Steps>
              </Col>

              <Col xs={12} sm={24} md={24} lg={24}>
                <Row type="flex" style={{ background: "pink" }}>
                  <Col xs={12} sm={8} md={8} lg={8} style={{ padding: 5 }}>
                    <Row
                      style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                      }}
                    >
                      <Col>
                        <Progress type="circle" percent={30} width={80} />
                      </Col>
                      <Col style={{ marginTop: 3 }}>
                        <small>Emergence</small>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={0} sm={8} md={8} lg={8} style={{ padding: 5 }}>
                    <Row
                      type="flex"
                      justify="center"
                      align="middle"
                      style={{ height: "100%" }}
                    >
                      <Col>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Qui neque dolor illo laboriosam esse optio, sed nihil
                        aspernatur dignissimos aperiam libero sequi excepturi
                        cumque quia iste reiciendis? Corrupti, suscipit facere!
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} sm={8} md={8} lg={8} style={{ padding: 5 }}>
                    <Row
                      style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                      }}
                    >
                      <Col>Avg. Style Length: {block.avgStyleLength}</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Col>
      </Section>
    );
  }
}

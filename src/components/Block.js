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
  Button
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
      showStyleLengthModal
    } = this.props.store.app;

    const { breakpoints, block } = this.props;
    // console.log(block);

    const StepTitle = props => <small>{props.children}</small>;

    return (
      <Section
        style={{
          border: "1px solid #eee",
          borderRadius: 10
          // marginBottom: 16
        }}
      >
        <Col style={{ background: "#4EA27D", color: "#fff", padding: 8 }}>
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

        <Col style={{ padding: "32px 8px" }}>
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
                onClick={() => showStyleLengthModal(block.id)}
              >
                Set Style Length
              </Button>
            </Row>
          ) : (
            <div>
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
            </div>
          )}
        </Col>
      </Section>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import format from "date-fns/format";

// antd
import { Col, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class BlockSteps extends Component {
  render() {
    const { breakpoints, block } = this.props;

    const StepTitle = props => <small>{props.children}</small>;

    return (
      <Col xs={8} sm={24} md={24} lg={24}>
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
                <small>{format(block.firstSpray, "MM/DD/YY HH:00")}</small>
              ) : null
            }
          />
          <Step
            title={<StepTitle>2nd Spray</StepTitle>}
            description={
              block.secondSpray ? (
                <small>{format(block.secondSpray, "MM/DD/YY HH:00")}</small>
              ) : null
            }
          />
          <Step
            title={<StepTitle>3rd Spray</StepTitle>}
            description={
              block.thirdSpray ? (
                <small>{format(block.thirdSpray, "MM/DD/YY HH:00")}</small>
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
    );
  }
}

export default BlockSteps;

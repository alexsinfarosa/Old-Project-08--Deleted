import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import format from "date-fns/format";

// import { StepIcon } from "styles";

// antd
import { Col, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class BlockSteps extends Component {
  render() {
    const { breakpoints, block } = this.props;

    const StepTitle = props => <small>{props.children}</small>;

    const StepIcon = props => {
      return (
        <svg className="button" expanded="true" height="24px" width="24px">
          <circle cx="50%" cy="50%" r="7px" fill="#4EA27D" />
          <circle
            className={props.status === "finish" ? "pulse" : ""}
            cx="50%"
            cy="50%"
            r="8px"
            fill="#E8E8E8"
          />
        </svg>
      );
    };

    const StepDate = block.dateRange.map(date => (
      <Step
        key={date.date}
        status={date.status}
        icon={<StepIcon status={date.status} />}
        title={<StepTitle date={date}>{date.name}</StepTitle>}
        description={
          block.date ? (
            <small>{format(date.date, "MM/DD/YY HH:00")}</small>
          ) : null
        }
      />
    ));

    return (
      <Col xs={8} sm={24} md={24} lg={24}>
        <Steps
          size="small"
          direction={breakpoints.xs ? "vertical" : "horizontal"}
          // progressDot={true}
          // current={block.date ? block.currentIndex : null}
          // status={dateRange[block.currentIndex]}
        >
          {StepDate}
        </Steps>
      </Col>
    );
  }
}

export default BlockSteps;

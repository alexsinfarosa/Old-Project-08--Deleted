import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class Instructions extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        <Col>
          <Steps direction="vertical">
            <Step
              title="Block"
              description="Create a block using the + button."
            />
            <Step title="Style Length" description="Measures 25-50 " />
            <Step title="Waiting" description="This is a description." />
          </Steps>
        </Col>
      </Row>
    );
  }
}

export default Instructions;

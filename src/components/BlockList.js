import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import format from "date-fns/format";

import { Row, Col, List, Card, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
class BlockLists extends Component {
  render() {
    const { blocks, setBlock, setIsUserData } = this.props.store.app;

    const StepTitle = props => <small>{props.children}</small>;
    const CardTitle = block => (
      <Row type="flex" justify="space-between" align="middle">
        <Col span={8}>
          <small>
            {block.station.name}, {block.state.postalCode}
          </small>
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <small>{block.name} </small>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <small>{block.variety.name}</small>
        </Col>
      </Row>
    );

    return (
      <Row>
        <Col>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={blocks}
            renderItem={block => (
              <List.Item
                key={block.id}
                style={{ background: "#4EA27D", borderRadius: 4 }}
              >
                <Card
                  hoverable={true}
                  title={<CardTitle {...block} />}
                  onClick={() => {
                    setIsUserData(false);
                    setBlock(block.id);
                  }}
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
                      title={<StepTitle>End Date</StepTitle>}
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

export default BlockLists;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import format from "date-fns/format";

import { Flex, Box } from "rebass";

// antd
import { Tooltip, Icon, Divider, Popconfirm, Steps } from "antd";
const Step = Steps.Step;

@inject("store")
@observer
export default class Block extends Component {
  render() {
    const { editBlock, deleteBlock } = this.props.store.app;
    const { breakpoints, block } = this.props;

    const StepTitle = props => <small>{props.children}</small>;

    return (
      <Flex
        column
        mb={[1, 2, 3]}
        bg="#fff"
        style={{ border: "1px solid #D9D9D9", borderRadius: 4 }}
      >
        <Box
          p={1}
          mb={[1, 2, 3]}
          style={{ background: "#4EA27D", color: "#fff" }}
        >
          <Flex justify="space-between">
            <Box>{block.name}</Box>
            <Box>{block.variety.name}</Box>
            <Box>
              {block.station.name}, {block.state.postalCode}
            </Box>
            <Box>
              <Flex>
                <Box>
                  <Tooltip title="Edit block">
                    <a style={{ color: "white" }}>
                      <Icon
                        type="edit"
                        style={{ marginRight: 4 }}
                        onClick={() => editBlock(block.id)}
                      />
                    </a>
                  </Tooltip>
                </Box>
                <Box>
                  <Divider type="vertical" />
                </Box>
                <Box>
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
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box py={1} mb={[1, 2, 3]}>
          <Steps
            size="small"
            direction={breakpoints.xs ? "vertical" : "horizontal"}
            // progressDot={breakpoints.xs ? null : true}
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
        </Box>
        <br />
      </Flex>
    );
  }
}

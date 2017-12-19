import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import SelectBlocks from "components/SelectBlocks";

import { ToolBarWrapper, Col } from "styles";
import { Row, Tooltip, Button, Badge } from "antd";

@inject("store")
@observer
class ToolBar extends Component {
  render() {
    const {
      filteredBlocks,
      blocks,
      displayAllBlocks,
      showBlockModal,
      isMap,
      toggleMap,
      resetFields
    } = this.props.store.app;

    const { breakpoints } = this.props;

    return (
      <ToolBarWrapper>
        <Col>
          <Row type="flex">
            <Tooltip title="New block">
              <Button
                type="primary"
                ghost
                icon="plus"
                style={{ marginRight: 16 }}
                onClick={() => {
                  resetFields();
                  showBlockModal();
                }}
              >
                {breakpoints.xs ? null : "Block"}
              </Button>
            </Tooltip>

            <Tooltip title="Display all blocks">
              <Button
                ghost={filteredBlocks.length > 1 ? false : true}
                type="primary"
                icon={breakpoints.xs ? "table" : null}
                onClick={() => displayAllBlocks()}
              >
                {breakpoints.xs ? null : "Blocks"}
                {!breakpoints.xs && (
                  <Badge
                    overflowCount={99}
                    count={blocks.length}
                    style={{
                      marginLeft: 8,
                      marginBottom: 2,
                      background: "#fff",
                      color: "#616161",
                      boxShadow: "0 0 0 1px #d9d9d9 inset"
                    }}
                  />
                )}
              </Button>
            </Tooltip>
          </Row>
        </Col>

        <Col style={{ flex: "2 2 200px" }}>
          <SelectBlocks />
        </Col>

        {!breakpoints.xs && (
          <Col right>
            <Tooltip title="Toggle Map">
              <Button
                type="primary"
                ghost={isMap ? false : true}
                icon="environment-o"
                onClick={toggleMap}
              >
                Map
              </Button>
            </Tooltip>
          </Col>
        )}
      </ToolBarWrapper>
    );
  }
}

export default ToolBar;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import SelectBlocks from "components/SelectBlocks";

import { Flex, Box } from "rebass";
import { ToolBarWrapper } from "styles";

import { Tooltip, Button, Badge } from "antd";
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
      toggleMap
    } = this.props.store.app;

    const { breakpoints } = this.props;

    return (
      <ToolBarWrapper wrap justify="space-between" mb={[2, 3, 4]}>
        <Box order={[2, 1]} w={[1, 1 / 3, 1 / 3, 1 / 3]} py={[1]}>
          <Flex>
            <Box>
              <Tooltip title="New block">
                <Button
                  type="primary"
                  ghost
                  style={{
                    marginRight: 16
                  }}
                  icon="plus"
                  onClick={() => showBlockModal()}
                >
                  {breakpoints.xs ? null : "Block"}
                </Button>
              </Tooltip>
            </Box>

            <Box>
              <Tooltip title="Display all blocks">
                <Button
                  ghost={filteredBlocks.length > 1 ? false : true}
                  type="primary"
                  icon={breakpoints.xs ? "table" : null}
                  onClick={() => displayAllBlocks()}
                >
                  {breakpoints.xs ? null : "All Blocks"}
                  {!breakpoints.xs && (
                    <Badge
                      overflowCount={999}
                      count={blocks.length}
                      style={{
                        marginLeft: 5,
                        background: "#fff",
                        color: "#616161",
                        boxShadow: "0 0 0 1px #d9d9d9 inset"
                      }}
                    />
                  )}
                </Button>
              </Tooltip>
            </Box>
          </Flex>
        </Box>

        <Box
          order={[1, 2]}
          w={[1, 1 / 3]}
          py={[2, 1]}
          //   style={{ background: "orange" }}
        >
          <SelectBlocks />
        </Box>

        {!breakpoints.xs && (
          <Box
            order={[3, 3]}
            w={[1, 1 / 3]}
            py={[2, 1]}
            style={{ textAlign: "right" }}
          >
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
          </Box>
        )}
      </ToolBarWrapper>
    );
  }
}

export default ToolBar;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Flex, Box } from "rebass";

@inject("store")
@observer
class ToggleButtons extends Component {
  // toggles USMap component
  toggleMap = () => {
    this.props.store.app.toggleMap();
    this.props.store.app.closeSidebar();
  };

  // toggles PCETable component
  toggleBlocks = () => {
    this.props.store.app.toggleBlocks();
    this.props.store.app.closeSidebar();
  };

  render() {
    const { isMap, isBlocks } = this.props.store.app;

    return (
      <Flex column w={1}>
        <Box w={1}>
          <Flex my={2} justify="space-between">
            <Box w={1 / 2} pr={1}>
              <Button
                style={{ width: "100%" }}
                type={isMap ? "primary" : ""}
                size="large"
                icon="environment-o"
                onClick={this.toggleMap}
              >
                Map
              </Button>
            </Box>
            <Box w={1 / 2} pl={1}>
              <Button
                style={{ width: "100%" }}
                type={isBlocks ? "primary" : ""}
                size="large"
                icon="layout"
                onClick={this.toggleBlocks}
              >
                Blocks
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default ToggleButtons;

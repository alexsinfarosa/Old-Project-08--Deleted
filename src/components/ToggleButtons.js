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
  };

  // toggles PCETable component
  toggleTable = () => {
    this.props.store.app.toggleTable();
  };

  // toggles PCETable component
  toggleGraph = () => {
    this.props.store.app.toggleGraph();
  };

  render() {
    const { isMap, isTable, isGraph } = this.props.store.app;
    return (
      <div>
        <Flex my={3} w={200} justify="space-between">
          <Box>
            <Button
              type={isMap ? "primary" : ""}
              size="large"
              icon="environment-o"
              onClick={this.toggleMap}
            >
              Map
            </Button>
          </Box>
          <Box>
            <Button
              type={isTable ? "primary" : ""}
              size="large"
              icon="layout"
              onClick={this.toggleTable}
            >
              Table
            </Button>
          </Box>
        </Flex>
        <Flex my={3} w={200} justify="space-between">
          <Box>
            <Button
              type={isGraph ? "primary" : ""}
              size="large"
              icon="line-chart"
              onClick={this.toggleGraph}
            >
              Graph
            </Button>
          </Box>
        </Flex>
      </div>
    );
  }
}

export default ToggleButtons;

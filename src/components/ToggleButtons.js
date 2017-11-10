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
  toggleTable = () => {
    this.props.store.app.toggleTable();
    this.props.store.app.closeSidebar();
  };

  // toggles PCETable component
  toggleGraph = () => {
    this.props.store.app.toggleGraph();
    this.props.store.app.closeSidebar();
  };

  // toggles PCETable component
  toggleUserTable = () => {
    this.props.store.app.toggleUserTable();
    this.props.store.app.closeSidebar();
  };

  render() {
    const {
      isGraph,
      isUserTable,
      viewMap,
      viewTable,
      areRequiredFieldsSet
    } = this.props.store.app;

    return (
      <Flex column w={1}>
        <Box w={1}>
          <Flex my={2} justify="space-between">
            <Box w={1 / 2} pr={1}>
              <Button
                style={{ width: "100%" }}
                type={viewMap ? "primary" : ""}
                size="large"
                icon="environment-o"
                onClick={this.toggleMap}
                disabled={areRequiredFieldsSet ? false : true}
              >
                Map
              </Button>
            </Box>
            <Box w={1 / 2} pl={1}>
              <Button
                style={{ width: "100%" }}
                type={viewTable ? "primary" : ""}
                size="large"
                icon="layout"
                onClick={this.toggleTable}
                disabled={areRequiredFieldsSet ? false : true}
              >
                Table
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box w={1}>
          <Flex my={2} justify="space-between">
            <Box w={1 / 2} pr={1}>
              <Button
                style={{ width: "100%" }}
                type={isGraph ? "primary" : ""}
                size="large"
                icon="line-chart"
                onClick={this.toggleGraph}
                disabled={areRequiredFieldsSet ? false : true}
              >
                Graph
              </Button>
            </Box>
            <Box w={1 / 2} pl={1}>
              <Button
                style={{ width: "100%" }}
                type={isUserTable ? "primary" : ""}
                size="large"
                icon="user"
                onClick={this.toggleUserTable}
                disabled={areRequiredFieldsSet ? false : true}
              >
                User
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default ToggleButtons;

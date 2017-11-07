import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Flex, Box } from "rebass";

@inject("store")
@observer
class MapTableButtons extends Component {
  // toggles USMap component
  toggleMap = () => {
    this.props.store.app.toggleMap();
  };

  // toggles PCETable component
  toggleTable = () => {
    this.props.store.app.toggleTable();
  };

  render() {
    const { isMap, isTable } = this.props.store.app;
    return (
      <Flex mt={3} w={200} justify="space-between">
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
    );
  }
}

export default MapTableButtons;

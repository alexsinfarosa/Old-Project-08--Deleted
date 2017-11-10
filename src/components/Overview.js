import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";

@inject("store")
@observer
export default class Overview extends Component {
  render() {
    const { avgStyleLength, blockName } = this.props.store.app;

    return (
      <Flex
        column
        bg="white"
        p={1}
        mb={[1, 2, 3]}
        style={{ borderRadius: "5px" }}
      >
        <Box>{avgStyleLength}</Box>
        <Box>{blockName}</Box>
      </Flex>
    );
  }
}

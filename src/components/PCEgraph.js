import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";

@inject("store")
@observer
class PCEgraph extends Component {
  render() {
    const { station, state } = this.props.store.app;
    return (
      <Flex column>
        <Box mb={3} f={[1, 2, 3]}>
          Percent Cumulative Emergence (PCE) for {station.name}, {state.name}
        </Box>
        <Box mb={3}>Graph</Box>
      </Flex>
    );
  }
}

export default PCEgraph;

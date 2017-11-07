import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";
import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
  VictoryTheme
} from "victory";

@inject("store")
@observer
class PCEgraph extends Component {
  state = {};
  handleZoom = domain => {
    this.setState({ selectedDomain: domain });
  };
  render() {
    const { station, state, graphData } = this.props.store.app;
    return (
      <Flex column>
        <Box f={[1, 2, 3]}>
          Percent Cumulative Emergence (PCE) for {station.name}, {state.name}
        </Box>
        <Box mb={3}>
          <VictoryChart
            padding={{ top: 30, left: 32, right: 16, bottom: 30 }}
            theme={VictoryTheme.material}
            width={650}
            height={350}
            responsive={true}
            scale={{ x: "time" }}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom}
              />
            }
          >
            <VictoryLine
              style={{
                data: { stroke: "#e41a1c", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Large crabgrass"
            />
            <VictoryLine
              style={{
                data: { stroke: "#377eb8", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Giant foxtail"
            />
            <VictoryLine
              style={{
                data: { stroke: "#4daf4a", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Yellow foxtail"
            />
            <VictoryLine
              style={{
                data: { stroke: "#984ea3", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Common lambsquarters"
            />
            <VictoryLine
              style={{
                data: { stroke: "#ff7f00", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Eastern black nightshade"
            />
            <VictoryLine
              style={{
                data: { stroke: "#ffff33", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Smooth pigweed"
            />
            <VictoryLine
              style={{
                data: { stroke: "#a65628", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Common ragweed"
            />
            <VictoryLine
              style={{
                data: { stroke: "#f781bf", strokeWidth: "1px" }
              }}
              data={graphData}
              x="date"
              y="Velvetleaf"
            />
          </VictoryChart>
        </Box>
      </Flex>
    );
  }
}

export default PCEgraph;

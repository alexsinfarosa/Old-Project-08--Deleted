import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Flex, Box } from "rebass";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush
} from "recharts";

@inject("store")
@observer
export default class PCEgraph extends Component {
  render() {
    const { station, state, graphData } = this.props.store.app;
    return (
      <Flex column flex="1 1 auto">
        <Box f={[1, 2, 3]}>
          Percent Cumulative Emergence (PCE) for {station.name}, {state.name}
        </Box>

        <Box mb={3} style={{ width: "100%", height: "35vh" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={graphData}
              margin={{ top: 30, right: 0, left: -23, bottom: 30 }}
            >
              <XAxis
                dataKey="date"
                domain={["dataMin", "dataMax"]}
                minTickGap={30}
                tickSize={10}
              />
              <YAxis unit="%" type="number" domain={["dataMin", "dataMax"]} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <Brush tickFormatter={x => graphData[x].date} height={30} />

              <Tooltip />
              <Line dataKey="Large crabgrass" stroke="#ff7f00" dot={false} />
              <Line dataKey="Giant foxtail" stroke="#fdbf6f" dot={false} />
              <Line dataKey="Yellow foxtail" stroke="#e31a1c" dot={false} />
              <Line
                dataKey="Common lambsquarters"
                stroke="#fb9a99"
                dot={false}
              />
              <Line
                dataKey="Eastern black nightshade"
                stroke="#33a02c"
                dot={false}
              />
              <Line dataKey="Smooth pigweed" stroke="#b2df8a" dot={false} />
              <Line dataKey="Common ragweed" stroke="#1f78b4" dot={false} />
              <Line dataKey="Velvetleaf" stroke="#a6cee3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    );
  }
}

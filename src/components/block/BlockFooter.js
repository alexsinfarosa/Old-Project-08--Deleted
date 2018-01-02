import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { BFooter } from "styles";
import GrowthTable from "components/GrowthTable";

// antd
import { Tabs, Icon } from "antd";
const TabPane = Tabs.TabPane;

@inject("store")
@observer
export default class BlockFooter extends Component {
  render() {
    const { block } = this.props;
    const { setGridData } = this.props.store.app;
    return (
      <BFooter>
        <Tabs
          defaultActiveKey="0"
          tabBarStyle={{ textAlign: "center" }}
          type="card"
          onChange={() => setGridData(block.id)}
        >
          <TabPane
            tab={
              <span>
                <Icon type="table" />Growth Table
              </span>
            }
            key="1"
          >
            <GrowthTable block={block} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="dot-chart" />Growth Graph
              </span>
            }
            key="2"
          >
            Growth Graph
          </TabPane>
        </Tabs>
      </BFooter>
    );
  }
}

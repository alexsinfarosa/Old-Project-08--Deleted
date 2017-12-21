import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {} from "antd";

import Block from "components/block/Block";
import GrowthTable from "components/GrowthTable";

@inject("store")
@observer
export default class BlockList extends Component {
  render() {
    const { breakpoints, filteredBlocks } = this.props.store.app;

    const blockList = filteredBlocks.map(block => {
      return (
        <div key={block.id}>
          <Block block={block} breakpoints={breakpoints} />
          <GrowthTable block={block} />
        </div>
      );
    });
    return <div>{blockList}</div>;
  }
}

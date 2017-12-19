import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {} from "antd";

import Block from "components/block/Block";

@inject("store")
@observer
export default class BlockList extends Component {
  render() {
    const { breakpoints, filteredBlocks } = this.props.store.app;

    const blockList = filteredBlocks.map(block => {
      return <Block key={block.id} block={block} breakpoints={breakpoints} />;
    });
    return <div>{blockList}</div>;
  }
}

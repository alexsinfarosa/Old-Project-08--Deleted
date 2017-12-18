import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Input } from "antd";

import { ColMb } from "styles";

@inject("store")
@observer
export default class SelectBlockName extends Component {
  render() {
    const {
      blockName,
      setBlockName,
      isBlockBeingEdited
    } = this.props.store.app;

    return (
      <ColMb style={{ marginBottom: isBlockBeingEdited ? 16 : 32 }}>
        {isBlockBeingEdited && "Name:"}
        <Input
          style={{ width: "100%" }}
          placeholder="Insert block name"
          onChange={e => setBlockName(e.target.value)}
          onBlur={() =>
            setBlockName(
              blockName.charAt(0).toUpperCase() + blockName.slice(1).trim()
            )
          }
          value={blockName}
        />
      </ColMb>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Input } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class BlockName extends Component {
  render() {
    const { blockName, isEditingBlock, setBlockName } = this.props.store.app;

    return (
      <MBCol>
        <Input
          style={{ width: "100%" }}
          id={isEditingBlock ? "edit" : null}
          placeholder="Insert block name"
          onChange={e => setBlockName(e.target.value)}
          onBlur={() =>
            setBlockName(
              blockName.charAt(0).toUpperCase() + blockName.slice(1).trim()
            )
          }
          value={blockName}
        />
      </MBCol>
    );
  }
}

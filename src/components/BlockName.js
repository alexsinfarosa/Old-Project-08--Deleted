import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Input } from "antd";

@inject("store")
@observer
export default class BlockName extends Component {
  render() {
    const { blockName, setBlockName, isEditingBlock } = this.props.store.app;

    return (
      <Col style={{ marginBottom: isEditingBlock ? 16 : 32 }}>
        {isEditingBlock && "Name:"}
        <Input
          style={{ width: "100%" }}
          // id={isEditingBlock ? "edit" : null}
          placeholder="Insert block name"
          onChange={e => setBlockName(e.target.value)}
          onBlur={() =>
            setBlockName(
              blockName.charAt(0).toUpperCase() + blockName.slice(1).trim()
            )
          }
          value={blockName}
        />
      </Col>
    );
  }
}

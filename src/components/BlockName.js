import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Input } from "antd";

@inject("store")
@observer
export default class BlockName extends Component {
  render() {
    const { blockName, isEditingBlock, setBlockName } = this.props.store.app;

    return (
      <Col
        style={{
          background: isEditingBlock ? "#FDF7D0" : null,
          margin: "16px 0"
        }}
      >
        <p style={{ lineHeight: "1.5" }}>Block Name:</p>
        <Input
          size="large"
          style={{ width: "100%" }}
          placeholder="Insert Block Name"
          onChange={e => setBlockName(e.target.value)}
          onBlur={() =>
            setBlockName(
              blockName.charAt(0).toUpperCase() + blockName.slice(1).trim()
            )}
          value={blockName}
        />
      </Col>
    );
  }
}

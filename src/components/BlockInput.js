import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";
import { Input } from "antd";

@inject("store")
@observer
class BlockInput extends Component {
  onChange = e => {
    const value = e.target.value;
    this.props.store.app.setBlockName(value);
  };

  onBlur = value => {
    const { blockName } = this.props.store.app;
    this.props.store.app.setBlockName(blockName.trim());
  };

  render() {
    const { blockName } = this.props.store.app;
    return (
      <Box mb={3}>
        <label>Block Name:</label>
        <Input
          size="large"
          style={{ width: "100%" }}
          placeholder="Block Name"
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={blockName}
        />
      </Box>
    );
  }
}

export default BlockInput;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Box } from "rebass";

@inject("store")
@observer
class UpdateNewButton extends Component {
  render() {
    const {
      areRequiredFieldsSet,
      addBlock,
      isEditing,
      updateBlock
    } = this.props.store.app;

    return (
      <Box my={4}>
        <Button
          type="default"
          style={{ width: "100%" }}
          size="large"
          icon="new"
          onClick={() => (isEditing ? updateBlock() : addBlock())}
          disabled={areRequiredFieldsSet ? false : true}
        >
          {isEditing ? "Upload Block" : "New Block"}
        </Button>
      </Box>
    );
  }
}
export default UpdateNewButton;

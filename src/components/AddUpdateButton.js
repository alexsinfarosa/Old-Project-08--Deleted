import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Box } from "rebass";

@inject("store")
@observer
class AddUpdateButton extends Component {
  render() {
    const {
      areRequiredFieldsSet,
      addBlock,
      updateBlock,
      isEditing
    } = this.props.store.app;

    return (
      <Box my={4}>
        <Button
          type="default"
          style={{ width: "100%", background: isEditing ? "#FDF7D0" : null }}
          size="large"
          onClick={() => (isEditing ? updateBlock() : addBlock())}
          disabled={areRequiredFieldsSet ? false : true}
        >
          {isEditing ? "Update Block" : "New Block"}
        </Button>
      </Box>
    );
  }
}
export default AddUpdateButton;

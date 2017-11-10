import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Box } from "rebass";

@inject("store")
@observer
class UpdateNewButton extends Component {
  render() {
    const { areRequiredFieldsSet, addBlock, blocks } = this.props.store.app;
    console.log(blocks.slice());
    return (
      <Box my={4}>
        <Button
          type="default"
          style={{ width: "100%" }}
          size="large"
          icon="new"
          onClick={() => addBlock()}
          disabled={areRequiredFieldsSet ? false : true}
        >
          Add New Block
        </Button>
      </Box>
    );
  }
}

export default UpdateNewButton;

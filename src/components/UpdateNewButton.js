import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Box } from "rebass";

@inject("store")
@observer
class UpdateNewButton extends Component {
  addNewBlock = () => {
    this.props.store.app.closeSidebar();
  };
  render() {
    const { areRequiredFieldsSet } = this.props.store.app;
    return (
      <Box my={4}>
        <Button
          type="primary"
          style={{ width: "100%" }}
          size="large"
          icon="new"
          onClick={this.addNewBlock}
          disabled={areRequiredFieldsSet ? false : true}
        >
          Add New Block
        </Button>
      </Box>
    );
  }
}

export default UpdateNewButton;

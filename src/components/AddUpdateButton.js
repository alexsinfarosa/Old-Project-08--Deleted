import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Button } from "antd";
import { Flex, Box } from "rebass";

@inject("store")
@observer
class AddUpdateButton extends Component {
  render() {
    const {
      areRequiredFieldsSet,
      addBlock,
      updateBlock,
      cancelBlock,
      isEditing
    } = this.props.store.app;

    return (
      <Flex my={3}>
        {!isEditing ? (
          <Box w={1}>
            <Button
              type="default"
              style={{
                width: "100%"
              }}
              size="large"
              onClick={() => addBlock()}
              disabled={areRequiredFieldsSet ? false : true}
            >
              New Block
            </Button>
          </Box>
        ) : (
          <Box w={1}>
            <Flex justify="space-between">
              <Box w={1 / 2} pr={1}>
                <Button
                  style={{ width: "100%", background: "#FDF7D0" }}
                  size="large"
                  onClick={() => cancelBlock()}
                >
                  Cancel
                </Button>
              </Box>
              <Box w={1 / 2} pl={1}>
                <Button
                  style={{ width: "100%", background: "#FDF7D0" }}
                  size="large"
                  onClick={() => updateBlock()}
                >
                  Update
                </Button>
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
    );
  }
}
export default AddUpdateButton;

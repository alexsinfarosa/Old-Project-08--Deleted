import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Button, message } from "antd";

@inject("store")
@observer
class AddUpdateButton extends Component {
  render() {
    const {
      areRequiredFieldsSet,
      addBlock,
      updateBlock,
      cancelBlock,
      isEditingBlock,
      selectedBlock
    } = this.props.store.app;

    return (
      <Col style={{ margin: "32px 0" }}>
        {!isEditingBlock ? (
          <Row>
            <Col>
              <Button
                type="default"
                style={{ width: "100%" }}
                size="large"
                onClick={() => {
                  addBlock();
                  message.success("New block has been created!");
                }}
                disabled={areRequiredFieldsSet ? false : true}
              >
                New Block
              </Button>
            </Col>
          </Row>
        ) : (
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <Button
                style={{ width: "100%", background: "#FDF7D0" }}
                size="large"
                onClick={() => cancelBlock()}
              >
                Cancel
              </Button>
            </Col>
            <Col span={11}>
              <Button
                style={{ width: "100%", background: "#FDF7D0" }}
                size="large"
                onClick={() => {
                  updateBlock();
                  message.success(
                    `Block ${selectedBlock.name} has been updated!`
                  );
                }}
              >
                Update
              </Button>
            </Col>
          </Row>
        )}
      </Col>
    );
  }
}
export default AddUpdateButton;

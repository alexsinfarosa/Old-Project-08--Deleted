import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Row, Button, message } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class NewUpdateBlockButton extends Component {
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
      <MBCol>
        {!isEditingBlock ? (
          <Row>
            <Col>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  addBlock();
                  message.success("New block has been created!");
                }}
                disabled={areRequiredFieldsSet ? false : true}
              >
                {areRequiredFieldsSet
                  ? "CREATE BLOCK"
                  : "Fill up all fields above"}
              </Button>
            </Col>
          </Row>
        ) : (
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <Button
                style={{ width: "100%", background: "#FDF7D0" }}
                onClick={() => cancelBlock()}
              >
                CANCEL
              </Button>
            </Col>
            <Col span={11}>
              <Button
                style={{ width: "100%", background: "#FDF7D0" }}
                onClick={() => {
                  updateBlock();
                  message.success(
                    `Block ${selectedBlock.name} has been updated!`
                  );
                }}
              >
                UPDATE
              </Button>
            </Col>
          </Row>
        )}
      </MBCol>
    );
  }
}

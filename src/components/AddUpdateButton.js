import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Button } from "antd";

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
      <Col style={{ margin: "32px 0" }}>
        {!isEditing ? (
          <Row>
            <Col>
              <Button
                type="default"
                style={{ width: "100%" }}
                size="large"
                onClick={() => addBlock()}
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
                onClick={() => updateBlock()}
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

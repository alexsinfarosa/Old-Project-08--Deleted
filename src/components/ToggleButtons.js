import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Row, Col, Button } from "antd";

@inject("store")
@observer
class ToggleButtons extends Component {
  // toggles USMap component
  toggleMap = () => {
    this.props.store.app.toggleMap();
    this.props.store.app.closeSidebar();
  };

  // toggles PCETable component
  toggleBlocks = () => {
    this.props.store.app.toggleBlocks();
    this.props.store.app.closeSidebar();
  };

  render() {
    const { isMap, isBlocks } = this.props.store.app;

    return (
      <Col style={{ margin: "32px 0" }}>
        <Row type="flex" justify="space-between">
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isMap ? "primary" : ""}
              size="large"
              icon="environment-o"
              onClick={this.toggleMap}
            >
              Map
            </Button>
          </Col>
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isBlocks ? "primary" : ""}
              size="large"
              icon="layout"
              onClick={this.toggleBlocks}
            >
              Blocks
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ToggleButtons;

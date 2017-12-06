import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Row, Col, Button } from "antd";

//  styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class MapBlocksButtons extends Component {
  render() {
    const { isMap, isUserData } = this.props.store.app;

    return (
      <MBCol>
        <Row type="flex" justify="space-between">
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isMap ? "primary" : ""}
              icon="environment-o"
              onClick={this.props.store.app.toggleMap}
            >
              Map
            </Button>
          </Col>
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isUserData ? "primary" : ""}
              icon="layout"
              onClick={this.props.store.app.toggleUserData}
            >
              Blocks
            </Button>
          </Col>
        </Row>
      </MBCol>
    );
  }
}

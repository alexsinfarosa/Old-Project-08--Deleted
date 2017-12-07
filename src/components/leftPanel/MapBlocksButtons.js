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
    const {
      isMap,
      isUserData,
      toggleMap,
      toggleUserData
    } = this.props.store.app;

    return (
      <MBCol>
        <Row type="flex" justify="space-between">
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isMap ? "primary" : ""}
              icon="environment-o"
              onClick={toggleMap}
            >
              Map
            </Button>
          </Col>
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isUserData ? "primary" : ""}
              icon="layout"
              onClick={toggleUserData}
            >
              Blocks
            </Button>
          </Col>
        </Row>
      </MBCol>
    );
  }
}

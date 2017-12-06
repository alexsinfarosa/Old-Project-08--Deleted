import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Row, Col, Button } from "antd";

//  styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class MapBlocksButtons extends Component {
  // toggles USMap component
  toggleMap = () => {
    this.props.store.app.toggleMap();
  };

  // toggles user data component
  toggleUserData = () => {
    this.props.store.app.toggleUserData();
  };

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
              onClick={this.toggleMap}
            >
              Map
            </Button>
          </Col>
          <Col span={11}>
            <Button
              style={{ width: "100%" }}
              type={isUserData ? "primary" : ""}
              icon="layout"
              onClick={this.toggleUserData}
            >
              Blocks
            </Button>
          </Col>
        </Row>
      </MBCol>
    );
  }
}

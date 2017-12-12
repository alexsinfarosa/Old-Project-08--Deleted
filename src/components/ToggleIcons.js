import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Row, Col, Icon, Button, Tooltip } from "antd";

//  styled components
import { MBCol } from "styles";

@inject("store")
@observer
export default class ToggleIcons extends Component {
  render() {
    const {
      isMap,
      isUserData,
      toggleMap,
      toggleUserData
    } = this.props.store.app;

    return (
      <Col>
        <Row type="flex" justify="center">
          <Col>
            <Tooltip title="Toggle Map">
              <Button
                type="default"
                ghost={isMap ? false : true}
                style={{
                  fontSize: "0.9rem",
                  color: "inherit",
                  marginRight: 16,
                  border: "none",
                  background: "none"
                }}
                icon="environment-o"
                onClick={toggleMap}
              >
                MAP
              </Button>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Toggle User Blocks">
              <Button
                ghost={isUserData ? false : true}
                style={{
                  fontSize: "0.9rem",
                  color: "inherit",
                  border: "none",
                  background: "none"
                }}
                type="default"
                icon="layout"
                onClick={toggleUserData}
              >
                BlOCKS
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </Col>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Row, Col, Button, Tooltip } from "antd";

//  styled components
// import { MBCol } from "styles";

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
      <Col span={8}>
        <Row
          type="flex"
          justify="end"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col>
            <Tooltip title="Toggle Map">
              <Button
                type="primary"
                ghost={isMap ? false : true}
                style={{
                  marginRight: 16
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
                type="primary"
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

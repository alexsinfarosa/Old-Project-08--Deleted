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
    const { isMap, toggleMap } = this.props.store.app;

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
                icon="environment-o"
                onClick={toggleMap}
              >
                Map
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </Col>
    );
  }
}

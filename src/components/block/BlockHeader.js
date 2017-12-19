import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { BHeader } from "styles";

// antd
import { Row, Col, Tooltip, Icon, Popconfirm, Divider, Button } from "antd";

@inject("store")
@observer
export default class BlockHeader extends Component {
  render() {
    const {
      showBlockModal,
      editBlock,
      deleteBlock,
      selectBlock
    } = this.props.store.app;
    const { breakpoints, block } = this.props;

    return (
      <BHeader>
        <Row type="flex" justify="space-between">
          <Col>
            <a
              onClick={() => selectBlock(block.id)}
              style={{ color: "white", borderBottom: "1px solid white" }}
            >
              {block.name}
            </a>
          </Col>
          <Col>{block.variety.name}</Col>
          {!breakpoints.xs && (
            <Col>
              {block.station.name}, {block.state.postalCode}
            </Col>
          )}
          <Col>
            <Row type="flex" justify="space-between">
              <Col>
                <Tooltip title="Edit block">
                  <a style={{ color: "white" }}>
                    <Icon
                      type="edit"
                      style={{ marginRight: 4 }}
                      onClick={() => {
                        showBlockModal();
                        editBlock(block.id);
                      }}
                    />
                  </a>
                </Tooltip>
              </Col>
              <Col>
                <Divider type="vertical" />
              </Col>
              <Col>
                <Popconfirm
                  placement="left"
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteBlock(block.id)}
                >
                  <Tooltip title="Delete block">
                    <a style={{ color: "white" }}>
                      <Icon type="delete" />
                    </a>
                  </Tooltip>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Row>
      </BHeader>
    );
  }
}

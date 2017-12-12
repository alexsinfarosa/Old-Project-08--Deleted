import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Button, Popconfirm, Tooltip } from "antd";

@inject("store")
@observer
class Navigation extends Component {
  render() {
    const {
      showNewBlockModal,
      editBlock,
      deleteBlock,
      block
    } = this.props.store.app;

    const isBlock = d => {
      return Object.keys(block).length !== 0;
    };

    return (
      <Col>
        <Row type="flex" justify="center" align="middle">
          <Col>
            {isBlock() && (
              <Tooltip title="Edit block">
                <Button
                  type="primary"
                  ghost
                  style={{
                    fontSize: "0.9rem",
                    color: "inherit",
                    marginRight: 16,
                    border: "none",
                    background: "none"
                  }}
                  icon="edit"
                  onClick={editBlock}
                >
                  EDIT
                </Button>
              </Tooltip>
            )}
            <Tooltip title="Add block">
              <Button
                type="primary"
                ghost
                style={{
                  fontSize: "0.9rem",
                  color: "inherit",
                  marginRight: 16,
                  border: "none",
                  background: "none"
                }}
                icon="plus"
                onClick={() => showNewBlockModal()}
              >
                {isBlock() ? "ADD" : "Block"}
              </Button>
            </Tooltip>

            {isBlock() && (
              <Popconfirm
                onConfirm={deleteBlock}
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete block">
                  <Button
                    type="primary"
                    ghost
                    icon="delete"
                    style={{
                      fontSize: "0.9rem",
                      color: "inherit",

                      border: "none",
                      background: "none"
                    }}
                  >
                    DELETE
                  </Button>
                </Tooltip>
              </Popconfirm>
            )}
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Navigation;

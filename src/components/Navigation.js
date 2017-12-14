import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Button, Tooltip, Badge } from "antd";

@inject("store")
@observer
class Navigation extends Component {
  render() {
    const {
      showNewBlockModal,
      blocks,
      areBlocksDisplayed,
      toggleAreBlocksDisplayed
    } = this.props.store.app;

    return (
      <Col span={8}>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{ height: "100%" }}
        >
          <Col>
            <Tooltip title="New block">
              <Button
                type="primary"
                ghost
                style={{
                  marginRight: 16
                }}
                icon="plus"
                onClick={() => showNewBlockModal()}
              >
                Block
              </Button>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Display all blocks">
              <Button
                ghost={!areBlocksDisplayed ? true : false}
                type="primary"
                onClick={() => {
                  this.props.store.app.block = {};
                  toggleAreBlocksDisplayed();
                }}
              >
                <Row type="flex" justify="center" align="middle">
                  All Blocks
                  <Badge
                    overflowCount={999}
                    count={blocks.length}
                    style={{
                      marginLeft: 5,
                      background: "#fff",
                      color: "#616161",
                      boxShadow: "0 0 0 1px #d9d9d9 inset"
                    }}
                  />
                </Row>
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </Col>

      // {isBlock() && (
      //   <Tooltip title="Edit block">
      //     <Button
      //       type="primary"
      //       ghost
      //       style={{
      //         marginRight: 16
      //       }}
      //       icon="edit"
      //       onClick={editBlock}
      //     >
      //       EDIT
      //     </Button>
      //   </Tooltip>
      // )}

      // {isBlock() && (
      //   <Popconfirm
      //     placement="right"
      //     onConfirm={deleteBlock}
      //     title="Are you sure？"
      //     okText="Yes"
      //     cancelText="No"
      //   >
      //     <Tooltip title="Delete block">
      //       <Button type="primary" ghost icon="delete">
      //         DELETE
      //       </Button>
      //     </Tooltip>
      //   </Popconfirm>
      // )}
    );
  }
}

export default Navigation;

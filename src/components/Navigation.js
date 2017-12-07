import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Button, Popconfirm, message } from "antd";

@inject("store")
@observer
class Navigation extends Component {
  render() {
    const {
      breakpoints,
      isMap,
      isBlockSelected,
      isUserData,
      showNewBlockModal,
      deleteBlock,
      block
    } = this.props.store.app;

    const isBlock = d => {
      return Object.keys(block).length !== 0;
    };

    return (
      <div
        style={{
          width: 400,
          display: "flex",
          justifyContent: isBlock() ? "space-between" : "center"
        }}
      >
        {isBlock() && (
          <Button ghost icon="edit" onClick={showNewBlockModal}>
            Edit Block
          </Button>
        )}

        <Button ghost icon="plus" onClick={showNewBlockModal}>
          New Block
        </Button>

        {isBlock() && (
          <Popconfirm
            onConfirm={() => {
              message.success(`${block.name} block has been deleted!`);
              deleteBlock();
            }}
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
          >
            <Button ghost icon="delete">
              Delete Block
            </Button>
          </Popconfirm>
        )}
      </div>
    );
  }
}

export default Navigation;

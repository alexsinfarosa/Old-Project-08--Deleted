import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Popconfirm } from "antd";

@inject("store")
@observer
class Navigation extends Component {
  render() {
    const {
      showNewBlockModal,
      editBlock,
      deleteBlock,
      block,
      resetFields
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
          <Button ghost icon="edit" onClick={editBlock}>
            Edit Block
          </Button>
        )}

        <Button
          ghost
          icon="plus"
          onClick={() => {
            resetFields();
            this.props.store.app.block = {};
            showNewBlockModal();
          }}
        >
          New Block
        </Button>

        {isBlock() && (
          <Popconfirm
            onConfirm={deleteBlock}
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

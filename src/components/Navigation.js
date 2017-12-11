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
          display: "flex",
          justifyContent: "center"
        }}
      >
        {isBlock() && (
          <Button
            style={{ marginRight: 16 }}
            ghost
            icon="edit"
            onClick={editBlock}
          >
            EDIT
          </Button>
        )}

        <Button
          style={{ marginRight: 16 }}
          ghost
          icon="plus"
          onClick={() => {
            resetFields();
            this.props.store.app.block = {};
            showNewBlockModal();
          }}
        >
          ADD
        </Button>

        {isBlock() && (
          <Popconfirm
            onConfirm={deleteBlock}
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
          >
            <Button ghost icon="delete">
              DELETE
            </Button>
          </Popconfirm>
        )}
      </div>
    );
  }
}

export default Navigation;

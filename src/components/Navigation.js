import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Popconfirm, Tooltip } from "antd";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        {isBlock() && (
          <Tooltip title="Edit block">
            <Button
              style={{ marginRight: 16 }}
              ghost
              icon="edit"
              onClick={editBlock}
            >
              EDIT
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Add block">
          <Button
            style={{ marginRight: 16 }}
            ghost
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
              <Button ghost icon="delete">
                DELETE
              </Button>
            </Tooltip>
          </Popconfirm>
        )}
      </div>
    );
  }
}

export default Navigation;

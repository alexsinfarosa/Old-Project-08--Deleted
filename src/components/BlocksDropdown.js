import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Select } from "antd";
// import { toJS } from "mobx";

@inject("store")
@observer
class BlocksDropdown extends Component {
  render() {
    const { blocks, getBlock, setSelectedBlock } = this.props.store.app;

    const optionList = blocks.map((el, i) => {
      return (
        <Select.Option key={el.id} value={el.name}>
          {el.name}
        </Select.Option>
      );
    });

    return (
      <Col
        style={{
          margin: "0 0 48px 0"
        }}
      >
        <h2>{`Block List (${blocks.length}):`}</h2>
        <Select
          name="blocks"
          size="large"
          autoFocus
          value={getBlock ? getBlock.name : undefined}
          placeholder="Select Block"
          style={{ width: "100%" }}
          onChange={option => {
            setSelectedBlock(option);
          }}
        >
          {optionList}
        </Select>
      </Col>
    );
  }
}

export default BlocksDropdown;

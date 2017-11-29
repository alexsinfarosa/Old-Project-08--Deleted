import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Select, Badge } from "antd";
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
        <Row type="flex" align="middle">
          <Col>
            <h2>Block List</h2>
          </Col>
          <Col>
            <Badge
              count={blocks.length}
              style={{
                marginLeft: 2,
                background: "#fff",
                color: "#616161",
                boxShadow: "0 0 0 1px #d9d9d9 inset"
              }}
            />
          </Col>
        </Row>

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

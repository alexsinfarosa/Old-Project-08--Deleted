import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Select, Badge } from "antd";
// import { toJS } from "mobx";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
class BlocksDropdown extends Component {
  render() {
    const { blocks, block, setBlock } = this.props.store.app;

    const optionList = blocks.map((el, i) => {
      return (
        <Select.Option key={el.id} value={el.id}>
          {el.name}
        </Select.Option>
      );
    });

    return (
      <MBCol>
        <Row type="flex" align="middle">
          <h2>Blocks</h2>
          <Badge
            count={blocks.length}
            style={{
              marginLeft: 6,
              marginBottom: 9,
              background: "#fff",
              color: "#616161",
              boxShadow: "0 0 0 1px #d9d9d9 inset"
            }}
          />
        </Row>

        <Select
          name="blocks"
          size="large"
          autoFocus
          value={block ? block.name : undefined}
          placeholder="Select Block"
          style={{ width: "100%" }}
          onChange={id => setBlock(id)}
        >
          {optionList}
        </Select>
      </MBCol>
    );
  }
}

export default BlocksDropdown;

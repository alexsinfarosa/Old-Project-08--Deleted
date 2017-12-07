import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Tooltip, InputNumber, Button } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
class StyleLength extends Component {
  render() {
    const { styleLength, setStyleLength, block } = this.props.store.app;

    return (
      <MBCol style={{ display: "flex" }}>
        <Tooltip
          trigger={["focus"]}
          title={"Range: 6mm to 12mm"}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          <InputNumber
            style={{ width: "100%", fontSize: 13 }}
            onChange={setStyleLength}
            placeholder={`Insert avg. style length`}
            min={6}
            max={12}
            step={0.01}
            precision={4}
            value={styleLength}
            disabled={block.isEdit}
          />
        </Tooltip>

        <Tooltip
          trigger={["hover"]}
          title={"Calculate Average Style Length"}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          <Button icon="calculator" style={{ fontSize: 20, marginLeft: 1 }} />
        </Tooltip>
      </MBCol>
    );
  }
}

export default StyleLength;

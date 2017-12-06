import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Tooltip, InputNumber } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
class StyleLength extends Component {
  render() {
    const {
      styleLength,
      setStyleLength,
      isEditingBlock
    } = this.props.store.app;

    return (
      <MBCol>
        <Tooltip
          trigger={["focus"]}
          title={"Range: 6mm to 12mm"}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          <InputNumber
            id={isEditingBlock ? "edit" : null}
            style={{ width: "100%", fontSize: 12 }}
            onChange={setStyleLength}
            placeholder={`Insert average style length (mm)`}
            min={6}
            max={12}
            step={0.01}
            precision={4}
            value={styleLength}
          />
        </Tooltip>
      </MBCol>
    );
  }
}

export default StyleLength;

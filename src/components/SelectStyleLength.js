import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Tooltip, InputNumber } from "antd";

@inject("store")
@observer
export default class SelectStyleLength extends Component {
  render() {
    const {
      isBlockBeingEdited,
      styleLength,
      setStyleLength,
      radioValue
    } = this.props.store.app;

    return (
      <Tooltip
        trigger={["focus"]}
        title={"Range: 1mm to 20mm"}
        placement="topLeft"
        style={{ fontSize: "14px" }}
      >
        {isBlockBeingEdited && "Average style length:"}
        <InputNumber
          style={{ width: "100%", marginBottom: 16 }}
          onChange={setStyleLength}
          placeholder={
            radioValue === "avg"
              ? `Insert average style length (mm)`
              : `Insert style length (mm)`
          }
          min={1}
          max={20}
          step={0.01}
          precision={3}
          value={styleLength}
        />
      </Tooltip>
    );
  }
}

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Tooltip, InputNumber, Button } from "antd";

// styled components
import { MBCol } from "styles";

@inject("store")
@observer
class StyleLength extends Component {
  render() {
    const {
      styleLength,
      setStyleLength,
      addStyleLength,
      isEditingBlock
    } = this.props.store.app;

    const { radioValue } = this.props;

    return (
      <MBCol>
        <Tooltip
          trigger={["focus"]}
          title={"Range: 6mm to 12mm"}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          {isEditingBlock && "Average Style Length:"}
          <InputNumber
            style={{ width: "100%" }}
            // id={isEditingBlock ? "edit" : null}
            onChange={setStyleLength}
            placeholder={
              radioValue === "avg"
                ? `Insert average style length (mm)`
                : `Insert style length (mm)`
            }
            min={6}
            max={12}
            step={0.01}
            precision={3}
            value={styleLength}
            disabled={isEditingBlock}
          />
        </Tooltip>

        {radioValue === "calculate" &&
          !isEditingBlock && (
            <Button disabled={!styleLength} onClick={addStyleLength}>
              Add
            </Button>
          )}
      </MBCol>
    );
  }
}

export default StyleLength;

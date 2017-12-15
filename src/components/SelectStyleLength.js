import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Tooltip, InputNumber, Button } from "antd";

import { Flex, Box } from "rebass";

@inject("store")
@observer
export default class SelectStyleLength extends Component {
  render() {
    const {
      isBlockBeingEdited,
      styleLength,
      setStyleLength,
      addOneStyleLength,
      isStyleLengthEdited,
      updateOneStyleLength,
      radioValue
    } = this.props.store.app;

    return (
      <Box mb={[1, 2]}>
        <Tooltip
          trigger={["focus"]}
          title={"Range: 1mm to 20mm"}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          {isBlockBeingEdited && "Average style length:"}
          <InputNumber
            style={{ width: "100%" }}
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

        {radioValue === "calculate" && (
          <Button
            style={{ width: "100%" }}
            disabled={!styleLength}
            onClick={
              isStyleLengthEdited ? updateOneStyleLength : addOneStyleLength
            }
          >
            {isStyleLengthEdited ? "UPDATE" : "ADD"}
          </Button>
        )}
      </Box>
    );
  }
}

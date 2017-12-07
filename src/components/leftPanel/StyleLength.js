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
      block,
      showModal,
      addStyleLength,
      isBlockSelected
    } = this.props.store.app;

    const { modal } = this.props;

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
            placeholder={
              modal
                ? `Insert style length`
                : isBlockSelected
                  ? `${block.avgStyleLength.toPrecision(4)} mm`
                  : `Insert avg. style length`
            }
            min={6}
            max={12}
            step={0.01}
            precision={3}
            value={styleLength}
            disabled={
              isBlockSelected || block.isEdit || this.props.multipleStyleLengths
            }
          />
        </Tooltip>

        {modal && (
          <Button disabled={!styleLength} onClick={addStyleLength}>
            Add Style Length
          </Button>
        )}

        {!modal && (
          <Tooltip
            trigger={["hover"]}
            title={"Calculate Average Style Length"}
            placement="topLeft"
            style={{ fontSize: "14px" }}
          >
            <Button
              icon="calculator"
              style={{ fontSize: 20 }}
              onClick={showModal}
              disabled={isBlockSelected || styleLength}
            />
          </Tooltip>
        )}
      </MBCol>
    );
  }
}

export default StyleLength;

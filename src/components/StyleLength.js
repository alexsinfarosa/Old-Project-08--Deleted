import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Tooltip, InputNumber, Button } from "antd";

@inject("store")
@observer
class StyleLength extends Component {
  render() {
    const {
      styleLength,
      setStyleLength,
      addStyleLength,
      isEditingBlock,
      block
    } = this.props.store.app;

    const { radioValue } = this.props;

    return (
      <Row type="flex" style={{ marginBottom: 32 }} justify="space-between">
        <Col span={radioValue === "avg" || isEditingBlock ? 24 : 20}>
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
              disabled={block.isEdit}
            />
          </Tooltip>
        </Col>

        {radioValue === "calculate" &&
          !isEditingBlock && (
            <Col span={4}>
              <Button
                style={{ width: "100%" }}
                disabled={!styleLength}
                onClick={addStyleLength}
              >
                Add
              </Button>
            </Col>
          )}
      </Row>
    );
  }
}

export default StyleLength;

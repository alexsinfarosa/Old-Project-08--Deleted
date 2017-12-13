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
      addOneStyleLength,
      isEditingBlock,
      block,
      isStyleLengthEdited,
      updateOneStyleLength,
      radioValue
    } = this.props.store.app;

    return (
      <Row type="flex" style={{ marginBottom: 16 }} justify="space-between">
        <Col span={radioValue === "avg" || isEditingBlock ? 24 : 20}>
          <Tooltip
            trigger={["focus"]}
            title={"Range: 1mm to 20mm"}
            placement="topLeft"
            style={{ fontSize: "14px" }}
          >
            {isEditingBlock && "Average style length:"}
            <InputNumber
              style={{ width: "100%" }}
              // id={isEditingBlock ? "edit" : null}
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
              disabled={block.isEdit}
            />
          </Tooltip>
        </Col>

        {radioValue === "calculate" && (
          <Col span={4}>
            <Button
              style={{ width: "100%" }}
              disabled={!styleLength}
              onClick={
                isStyleLengthEdited ? updateOneStyleLength : addOneStyleLength
              }
            >
              {isStyleLengthEdited ? "UPDATE" : "ADD"}
            </Button>
          </Col>
        )}
      </Row>
    );
  }
}

export default StyleLength;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Tooltip, InputNumber } from "antd";

@inject("store")
@observer
class AvgStyleLength extends Component {
  formatNumber = value => {
    value += "";
    const list = value.split(".");
    const prefix = list[0].charAt(0) === "-" ? "-" : "";
    let num = prefix ? list[0].slice(1) : list[0];
    let result = "";
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) result = num + result;
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
  };

  onChange = value => {
    this.props.store.app.setAvgStyleLength(value);
  };

  render() {
    const { avgStyleLength, isEditing } = this.props.store.app;

    const title = avgStyleLength ? (
      <span style={{ minWidth: "32px", minHeight: "37px" }}>
        {avgStyleLength !== "-" ? this.formatNumber(avgStyleLength) : "-"}
      </span>
    ) : (
      "Range: 6mm to 12mm"
    );

    return (
      <Col
        style={{ background: isEditing ? "#FDF7D0" : null, margin: "16px 0" }}
      >
        <p style={{ lineHeight: "1.5" }}>Avg. Style Length:</p>
        <Tooltip
          trigger={["focus"]}
          title={title}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          <InputNumber
            size="large"
            style={{
              width: "100%"
            }}
            onChange={this.onChange}
            placeholder="Insert Avg. Style Length"
            min={6}
            max={12}
            step={0.1}
            precision={2}
            value={avgStyleLength}
          />
        </Tooltip>
      </Col>
    );
  }
}

export default AvgStyleLength;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";
import { Tooltip, Input } from "antd";

@inject("store")
@observer
class AvgStyleLength extends Component {
  state = { value: "" };

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

  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      this.props.store.app.setAvgStyleLength(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { avgStyleLength } = this.props.store.app;
    if (
      avgStyleLength.charAt(avgStyleLength.length - 1) === "." ||
      avgStyleLength === "-"
    ) {
      this.onChange(avgStyleLength.slice(0, -1));
    }
  };

  render() {
    const { avgStyleLength } = this.props.store.app;

    const title = avgStyleLength ? (
      <span style={{ minWidth: "32px", minHeight: "37px" }}>
        {avgStyleLength !== "-" ? this.formatNumber(avgStyleLength) : "-"}
      </span>
    ) : (
      "Range: 6mm to 12mm"
    );

    return (
      <Box mb={3}>
        <label>Average Style Length:</label>
        <Tooltip
          trigger={["focus"]}
          title={title}
          placement="topLeft"
          style={{ fontSize: "14px" }}
        >
          <Input
            size="large"
            style={{ width: "100%" }}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder="Input a number"
            maxLength="4"
            value={avgStyleLength}
            addonAfter="millimiters"
          />
        </Tooltip>
      </Box>
    );
  }
}

export default AvgStyleLength;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import getYear from "date-fns/get_year";
// import { toJS } from "mobx";

import { Select } from "antd";
const { Option, OptGroup } = Select;

@inject("store")
@observer
export default class SelectBlocks extends Component {
  render() {
    const {
      blocks,
      selectBlock,
      filteredBlocks,
      setGridData
    } = this.props.store.app;

    // Categorize blocks based on the year
    const setYears = new Set(blocks.map(block => getYear(block.date)));
    const arrYears = Array.from(setYears);

    const optionList = arrYears.map((y, i) => {
      const year = y.toString();
      return (
        <OptGroup key={i} label={year === "NaN" ? "Date not set" : year}>
          {blocks.map((block, j) => {
            const blockYear = getYear(block.date).toString();
            if (year === blockYear) {
              return (
                <Option key={block.id} value={block.id}>
                  {block.name}
                </Option>
              );
            }
            return null;
          })}
        </OptGroup>
      );
    });

    return (
      <Select
        autoFocus
        value={filteredBlocks.length === 1 ? filteredBlocks[0].name : undefined}
        placeholder={`Select Block`}
        style={{ width: "100%" }}
        onChange={id => selectBlock(id)}
      >
        {optionList}
      </Select>
    );
  }
}

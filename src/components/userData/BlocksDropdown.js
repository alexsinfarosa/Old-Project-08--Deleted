import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import getYear from "date-fns/get_year";
// import { toJS } from "mobx";

import { Row, Col, Select, Badge } from "antd";
const { Option, OptGroup } = Select;

@inject("store")
@observer
class BlocksDropdown extends Component {
  render() {
    const { blocks, block, setBlock } = this.props.store.app;

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
      <Col span={8}>
        <Row type="flex" align="middle">
          <Col span={22}>
            <Select
              size="large"
              autoFocus
              value={block ? block.name : undefined}
              placeholder={`Select Block`}
              style={{ width: "100%" }}
              onChange={id => setBlock(id)}
            >
              {optionList}
            </Select>
          </Col>
          <Col span={2}>
            <Badge
              overflowCount={999}
              count={blocks.length}
              style={{
                marginLeft: 6,
                fontSize: "0.9rem",
                background: "#fff",
                color: "#616161",
                boxShadow: "0 0 0 1px #d9d9d9 inset"
              }}
            />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default BlocksDropdown;

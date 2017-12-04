import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Select, Badge } from "antd";
// import { toJS } from "mobx";

@inject("store")
@observer
class DropDown extends Component {
  render() {
    const { isEditingBlock } = this.props.store.app;
    const { list, object, setOption, label } = this.props;

    const isStation = label === "Station";
    const optionList = list.map(el => {
      return (
        <Select.Option key={el.id} value={isStation ? el.id : el.name}>
          {el.name}
        </Select.Option>
      );
    });

    const Label = () => {
      return (
        <Row type="flex" align="middle" style={{ height: 16 }}>
          <Col>{label}:</Col>
          {isStation && (
            <Col>
              <Badge
                count={list.length}
                overflowCount={999}
                style={{
                  fontSize: 9,
                  marginLeft: 2,
                  background: "#fff",
                  color: "#616161",
                  boxShadow: "0 0 0 1px #D9D9D9 inset"
                }}
              />
            </Col>
          )}
        </Row>
      );
    };

    return (
      <Col
        style={{
          background: isEditingBlock ? "#FDF7D0" : null,
          margin: "16px 0"
        }}
      >
        <Label />
        <Select
          name={label}
          size="large"
          autoFocus
          value={object.name}
          placeholder={`Select ${label}`}
          style={{ width: "100%" }}
          onChange={option => {
            setOption(option);
          }}
        >
          {optionList}
        </Select>
      </Col>
    );
  }
}

export default DropDown;

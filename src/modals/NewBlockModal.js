import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Col, Modal, Divider, Radio, Table } from "antd";

import BlockName from "components/BlockName";
import Variety from "components/Variety";
import StyleLength from "components/StyleLength";
import State from "components/State";
import Station from "components/Station";

import SprayDate from "components/SprayDate";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject("store")
@observer
class NewBlockModal extends Component {
  state = {
    value: "avg"
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const {
      areRequiredFieldsSet,
      isNewBlockModal,
      hideNewBlockModal,
      styleLengths,
      isLoading,
      removeStyleLength,
      addBlock,
      updateBlock,
      block,
      isEditingBlock,
      firstSprayDate,
      secondSprayDate,
      thirdSprayDate,
      setFirstSprayDate,
      setSecondSprayDate,
      setThirdSprayDate,
      editStyleLength
    } = this.props.store.app;

    const columns = [
      {
        title: "#",
        dataIndex: "idx",
        key: "idx",
        width: "20%",
        sorter: (a, b) => a.idx - b.idx
        // sortOrder: "descend"
      },
      {
        title: "Style Length",
        dataIndex: "styleLength",
        key: "styleLength",
        width: "30%",
        render: (text, record) => <span>{text.toPrecision(4)} mm</span>
      },
      {
        title: "Actions",
        dataIndex: "actions",
        width: "20%",
        render: (text, record, index) => (
          <div>
            <span>
              <a onClick={() => removeStyleLength(record, index)}>Delete</a>
            </span>
            <Divider type="vertical" />
            <span>
              <a onClick={() => editStyleLength(record, index)}>Edit</a>
            </span>
          </div>
        )
      }
    ];

    return (
      <Row type="flex" align="middle">
        <Modal
          width={450}
          closable={false}
          maskClosable={false}
          title={isEditingBlock ? `Edit Selected Block` : `New Block`}
          visible={isNewBlockModal}
          okText={
            areRequiredFieldsSet
              ? isEditingBlock ? "UPDATE BLOCK" : "CREATE BLOCK"
              : "Fill up all fields"
          }
          onOk={
            areRequiredFieldsSet
              ? isEditingBlock ? updateBlock : addBlock
              : null
          }
          onCancel={hideNewBlockModal}
        >
          <Col>
            <BlockName />
            <Variety />
            <State />
            <Station />
            {!block.isEdit && (
              <RadioGroup
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 32
                }}
                onChange={this.onChange}
                defaultValue="avg"
              >
                <RadioButton
                  checked={this.state.value === "avg"}
                  disabled={styleLengths.length > 1}
                  value="avg"
                >
                  Average style length
                </RadioButton>
                <RadioButton
                  checked={this.state.value === "calculate"}
                  value="calculate"
                >
                  Calculate average
                </RadioButton>
              </RadioGroup>
            )}
            <StyleLength radioValue={this.state.value} />

            {this.state.value === "calculate" &&
              !block.isEdit && (
                <Table
                  rowClassName={record => (record.isEdit ? "selected" : null)}
                  rowKey={record => record.idx}
                  loading={isLoading}
                  dataSource={styleLengths.slice()}
                  columns={columns}
                  size="middle"
                  pagination={false}
                  scroll={{ y: 400, x: "100%" }}
                />
              )}

            {block.isEdit && (
              <div>
                <SprayDate
                  type="first spray"
                  date={firstSprayDate}
                  setDate={setFirstSprayDate}
                />
                <SprayDate
                  type="second spray"
                  date={secondSprayDate}
                  setDate={setSecondSprayDate}
                />
                <SprayDate
                  type="third spray"
                  date={thirdSprayDate}
                  setDate={setThirdSprayDate}
                />
              </div>
            )}
          </Col>
        </Modal>
      </Row>
    );
  }
}

export default NewBlockModal;

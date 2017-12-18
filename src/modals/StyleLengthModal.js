import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import SelectStyleLength from "components/SelectStyleLength";

import { Row, Col, Modal, Table, Divider, Radio, Button, Icon } from "antd";
const RadioGroup = Radio.Group;

@inject("store")
@observer
class StyleLengthModal extends Component {
  render() {
    const {
      isStyleLengthModal,
      hideStyleLengthModal,
      styleLengths,
      isLoading,
      removeStyleLength,
      editStyleLength,
      addAvgStyleLength,
      addAllStyleLengths,
      avgStyleLength,
      radioValue,
      setRadioValue,
      isStyleLengthEdited,
      updateOneStyleLength,
      addOneStyleLength,
      styleLength,
      resetFields
    } = this.props.store.app;

    const { breakpoints } = this.props;

    const columns = [
      {
        title: "#",
        dataIndex: "idx",
        key: "idx",
        width: "30%",
        sorter: (a, b) => a.idx - b.idx
        // sortOrder: "descend"
      },
      {
        title: "Style Length",
        dataIndex: "styleLength",
        key: "styleLength",
        // width: "50%",
        render: (text, record) => <span>{text.toPrecision(4)} mm</span>
      },
      {
        title: "Actions",
        dataIndex: "actions",
        // width: "20%",
        render: (text, record, index) => (
          <div>
            <Icon type="edit" onClick={() => editStyleLength(record, index)} />
            <Divider type="vertical" />
            <Icon
              type="delete"
              onClick={() => removeStyleLength(record, index)}
            />
          </div>
        )
      }
    ];

    const Footer = d => {
      return (
        <Row>
          <Col>
            <Button onClick={() => hideStyleLengthModal()}>Cancel</Button>
            <Button
              disabled={
                isStyleLengthEdited ||
                (radioValue === "calculate" && styleLengths.length <= 5)
              }
              onClick={() =>
                radioValue === "avg"
                  ? addAvgStyleLength()
                  : addAllStyleLengths()
              }
              type="primary"
            >
              OK
            </Button>
          </Col>
        </Row>
      );
    };

    const average = avgStyleLength
      ? `: ${avgStyleLength.toPrecision(4)} (mm)`
      : "";

    return (
      <Modal
        closable={false}
        title={
          radioValue
            ? radioValue === "avg"
              ? `Insert Average Style Length`
              : `Calculated Average Style Length${average}`
            : `Select one of the options:`
        }
        visible={isStyleLengthModal}
        footer={radioValue ? <Footer /> : null}
        onCancel={() => {
          resetFields();
          hideStyleLengthModal();
        }}
      >
        {!(radioValue === "avg" || radioValue === "calculate") && (
          <RadioGroup
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            onChange={e => setRadioValue(e.target.value)}
            defaultValue={null}
          >
            <Row style={{ display: "flex", flexDirection: "column" }}>
              <Col style={{ borderBottom: "1px solid #eee", padding: 16 }}>
                <Radio
                  checked={radioValue === "avg"}
                  disabled={styleLengths.length > 1}
                  value="avg"
                >
                  Insert average style length
                </Radio>
              </Col>
              <Col style={{ borderBottom: "1px solid #eee", padding: 16 }}>
                <Radio checked={radioValue === "calculate"} value="calculate">
                  Calculate average style length
                </Radio>
              </Col>
            </Row>
          </RadioGroup>
        )}

        {radioValue === "avg" && <SelectStyleLength />}

        {radioValue === "calculate" && (
          <Row>
            <Col>
              <Row type="flex" align="middle">
                <Col span={20}>
                  <SelectStyleLength />
                </Col>
                <Col span={4}>
                  {radioValue === "calculate" && (
                    <Button
                      style={{ width: "100%", marginBottom: 16 }}
                      disabled={!styleLength}
                      onClick={
                        isStyleLengthEdited
                          ? updateOneStyleLength
                          : addOneStyleLength
                      }
                    >
                      {isStyleLengthEdited ? "UPDATE" : "ADD"}
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
            <Col>
              <Table
                rowClassName={record => (record.isEdit ? "selected" : null)}
                rowKey={record => record.idx}
                loading={isLoading}
                dataSource={styleLengths.slice()}
                columns={columns}
                size="middle"
                pagination={false}
                scroll={{ y: breakpoints.xs ? "30vh" : "50vh", x: "100%" }}
              />
            </Col>
          </Row>
        )}
      </Modal>
    );
  }
}

export default StyleLengthModal;

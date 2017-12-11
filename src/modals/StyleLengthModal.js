import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Col, Modal, Table, Divider, Radio, Button, Icon } from "antd";
import StyleLength from "components/StyleLength";

const RadioButton = Radio.Button;
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
      isStyleLengthEdited
    } = this.props.store.app;

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
        width: "55%",
        render: (text, record) => <span>{text.toPrecision(4)} mm</span>
      },
      {
        title: "Actions",
        dataIndex: "actions",
        width: "15%",
        render: (text, record, index) => (
          <div>
            <Icon
              type="delete"
              onClick={() => removeStyleLength(record, index)}
            />

            <Divider type="vertical" />

            <Icon type="edit" onClick={() => editStyleLength(record, index)} />
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
      <Row type="flex" align="middle">
        <Modal
          title={
            radioValue
              ? radioValue === "avg"
                ? `Insert Average Style Length`
                : `Calculated Average Style Length${average}`
              : `Select one of the options:`
          }
          visible={isStyleLengthModal}
          footer={radioValue ? <Footer /> : null}
          //   onOk={() =>
          //     radioValue === "avg" ? addAvgStyleLength() : addAllStyleLengths()
          //   }
          //   onCancel={() => hideStyleLengthModal()}
          closable={false}
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
              <RadioButton
                checked={radioValue === "avg"}
                disabled={styleLengths.length > 1}
                value="avg"
              >
                Insert average style length
              </RadioButton>

              <RadioButton
                checked={radioValue === "calculate"}
                value="calculate"
              >
                Calculate average style length
              </RadioButton>
            </RadioGroup>
          )}

          {radioValue === "avg" && <StyleLength />}

          {radioValue === "calculate" && (
            <div>
              <StyleLength />
              <Table
                rowClassName={record => (record.isEdit ? "selected" : null)}
                rowKey={record => record.idx}
                loading={isLoading}
                dataSource={styleLengths.slice()}
                columns={columns}
                size="middle"
                pagination={false}
                scroll={{ y: "50vh", x: "100%" }}
              />
            </div>
          )}
        </Modal>
      </Row>
    );
  }
}

export default StyleLengthModal;

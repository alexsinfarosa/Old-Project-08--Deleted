import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Col, Modal, Divider, Radio, Table } from "antd";

// Left menu
import BlockName from "components/leftPanel/BlockName";
import Variety from "components/leftPanel/Variety";
import StyleLength from "components/leftPanel/StyleLength";
import State from "components/leftPanel/State";
import Station from "components/leftPanel/Station";

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
      addBlock
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
              <a onClick={() => console.log(record, index)}>Edit</a>
            </span>
          </div>
        )
      }
    ];

    return (
      <Row type="flex" align="middle">
        <Modal
          width={450}
          title="New Block"
          visible={isNewBlockModal}
          okText={areRequiredFieldsSet ? "CREATE BLOCK" : "Fill up all fields"}
          onOk={areRequiredFieldsSet ? addBlock : null}
          onCancel={hideNewBlockModal}
        >
          <Col>
            <BlockName />
            <Variety />
            <State />
            <Station />
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
            <StyleLength radioValue={this.state.value} />

            {this.state.value === "calculate" && (
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
          </Col>
        </Modal>
      </Row>
    );
  }
}

export default NewBlockModal;

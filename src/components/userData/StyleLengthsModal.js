import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Modal, Table, message, Divider } from "antd";
import StyleLength from "components/leftPanel/StyleLength";

@inject("store")
@observer
class StyleLengthsModal extends Component {
  render() {
    const {
      isModal,
      hideModal,
      addStyleLength,
      isLoading,
      setStyleLength,
      block,
      styleLength,
      editStyleLength,
      updateStyleLength,
      isEditMode
    } = this.props.store.app;

    const { text } = this.props;
    const data = block.styleLengths;

    // messages
    const emptyStyleLength = () => {
      message.error("Please, insert style length");
    };

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
        title: "Style Length (mm)",
        dataIndex: "styleLength",
        key: "styleLength",
        width: "30%",
        render: (text, record) => <span>{text}</span>
      },
      {
        title: "Actions",
        dataIndex: "actions",
        width: "20%",
        render: (text, record, index) => (
          <div>
            <span>
              <a onClick={() => editStyleLength(record, index)}>Edit</a>
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
        <span>{`${text}`}</span>
        <Modal
          title="Style Length List"
          visible={isModal}
          okText={isEditMode ? "UPDATE" : "ADD"}
          onOk={() => {
            styleLength
              ? isEditMode ? updateStyleLength() : addStyleLength()
              : emptyStyleLength();
          }}
          onCancel={() => {
            block.styleLengths.map(obj => (obj.isEdit = false));
            setStyleLength(null);
            hideModal();
          }}
        >
          <StyleLength
            onChange={setStyleLength}
            isEditMode={isEditMode}
            calculator={false}
          />
          <Table
            rowClassName={record => (record.isEdit ? "selected" : null)}
            rowKey={record => record.date}
            loading={isLoading}
            dataSource={data.length > 0 ? data.slice() : []}
            columns={columns}
            size="middle"
            pagination={false}
            scroll={{ y: 600, x: "100%" }}
          />
          <Row
            type="flex"
            justify="end"
            style={{ marginTop: 16, marginRight: 205 }}
          >
            <b>Average: {text}</b>
          </Row>
        </Modal>
      </Row>
    );
  }
}

export default StyleLengthsModal;

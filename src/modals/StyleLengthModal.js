import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Modal, Table, Divider } from "antd";
import StyleLength from "components/leftPanel/StyleLength";

// import format from "date-fns/format";

@inject("store")
@observer
class StyleLengthModal extends Component {
  render() {
    const {
      isModal,
      hideModal,
      isLoading,
      setStyleLength,
      removeStyleLength,
      styleLengths,
      avgStyleLength
    } = this.props.store.app;

    const averageStyleLength = () => {
      return avgStyleLength ? `${avgStyleLength.toPrecision(4)} (mm)` : "";
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
          title={`Average Style Length: ${averageStyleLength()}`}
          visible={isModal}
          // okText={true ? "UPDATE" : "ADD"}
          onOk={() => {
            styleLengths.map(obj => (obj.isEdit = false));
            setStyleLength(null);
            hideModal();
          }}
          onCancel={() => {
            styleLengths.map(obj => (obj.isEdit = false));
            setStyleLength(null);
            hideModal();
          }}
        >
          <StyleLength onChange={setStyleLength} modal={true} />
          <Table
            rowClassName={record => (record.isEdit ? "selected" : null)}
            rowKey={record => record.idx}
            loading={isLoading}
            dataSource={styleLengths.slice()}
            columns={columns}
            size="middle"
            pagination={false}
            scroll={{ y: 600, x: "100%" }}
          />
        </Modal>
      </Row>
    );
  }
}

export default StyleLengthModal;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Modal, Table } from "antd";
import StyleLength from "components/StyleLength";

import format from "date-fns/format";

@inject("store")
@observer
class StyleLengthsModal extends Component {
  delay = t => {
    return new Promise(res => {
      setTimeout(res, t);
    });
  };

  render() {
    const {
      isModal,
      hideModal,
      addStyleLength,
      isLoading,
      setStyleLength,
      selectedBlock
    } = this.props.store.app;

    const data = selectedBlock.styleLengths;

    const { text } = this.props;

    const columns = [
      {
        title: "Measurement #",
        dataIndex: "idx",
        key: "idx"
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (text, record) => (
          <span>{format(text, "MMM DD YYYY HH:mm")}</span>
        )
      },
      {
        title: "Style Length",
        dataIndex: "styleLength",
        key: "styleLength"
      }
    ];

    return (
      <Row type="flex" align="middle">
        <span style={{ marginRight: 6 }}>{`${text}`}</span>
        <Modal
          title="Style Length List"
          visible={isModal}
          onOk={() => {
            addStyleLength();
            this.delay(1000).then(res => hideModal(res));
          }}
          onCancel={() => hideModal()}
        >
          <StyleLength onChange={setStyleLength} />
          <Table
            rowKey={record => record.i}
            loading={isLoading}
            dataSource={data.length > 0 ? data.slice() : []}
            columns={columns}
            size="middle"
            pagination={false}
          />
        </Modal>
      </Row>
    );
  }
}

export default StyleLengthsModal;

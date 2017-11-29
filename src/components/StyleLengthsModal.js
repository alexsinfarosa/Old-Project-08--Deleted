import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Icon, Modal, Table } from "antd";
import StyleLength from "components/StyleLength";

import format from "date-fns/format";

@inject("store")
@observer
class StyleLengthsModal extends Component {
  render() {
    const {
      styleLengths,
      isModal,
      showModal,
      hideModal,
      addStyleLength,
      isLoading,
      setStyleLength
    } = this.props.store.app;
    const { text } = this.props;
    // styleLengths.map(x => console.log(toJS(x)));
    const columns = [
      {
        title: "Measurement #",
        dataIndex: "i",
        key: "i"
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
          title="List of Average Style Length"
          visible={isModal}
          onOk={() => {
            addStyleLength();
            hideModal();
          }}
          onCancel={() => hideModal()}
        >
          <StyleLength onChange={setStyleLength} />
          <Table
            rowKey={record => record.i}
            loading={isLoading}
            dataSource={styleLengths.length > 0 ? styleLengths : [{}]}
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

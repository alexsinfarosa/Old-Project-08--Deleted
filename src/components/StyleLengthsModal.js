import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Row, Icon, Modal } from "antd";

@inject("store")
@observer
class StyleLengthsModal extends Component {
  render() {
    const {
      styleLengths,
      isModal,
      showModal,
      hideModal
    } = this.props.store.app;
    const { text } = this.props;

    const styleLengthsList = styleLengths.map((length, i) => {
      return <li key={i}>{length}</li>;
    });

    return (
      <Row type="flex" align="middle">
        <span style={{ marginRight: 6 }}>{`${text}`}</span>
        <Icon type="info-circle" onClick={() => showModal()} />
        <Modal
          title="List of Average Style Length"
          visible={isModal}
          onOk={() => hideModal()}
          onCancel={() => hideModal()}
        >
          {styleLengthsList}
        </Modal>
      </Row>
    );
  }
}

export default StyleLengthsModal;

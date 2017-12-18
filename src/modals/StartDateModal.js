import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Modal } from "antd";

import SelectStartDate from "components/SelectStartDate";

@inject("store")
@observer
class StartDateModal extends Component {
  render() {
    const {
      isStartDateModalOpen,
      hideStartDateModal,
      resetFields
    } = this.props.store.app;

    const width = window.screen.width;
    // hack! Fix it.
    const margin = (width - 280 - 24) / 2;

    return (
      <Modal
        width={280}
        closable={false}
        footer={null}
        visible={isStartDateModalOpen}
        onCancel={() => {
          resetFields();
          hideStartDateModal();
        }}
        bodyStyle={{
          marginLeft: width <= 768 ? `${margin}px` : 0,
          padding: 0
        }}
        style={{
          opacity: 0,
          animation: "none"
        }}
      >
        <SelectStartDate />
      </Modal>
    );
  }
}

export default StartDateModal;

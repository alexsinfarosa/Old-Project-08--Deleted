import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Row, Modal } from "antd";

import StartDate from "components/StartDate";

@inject("store")
@observer
class StartDateModal extends Component {
  render() {
    const { isStartDateModalOpen, hideStartDateModal } = this.props.store.app;

    return (
      <Row type="flex" align="middle">
        <Modal
          width={280}
          closable={false}
          footer={null}
          visible={isStartDateModalOpen}
          onCancel={hideStartDateModal}
          bodyStyle={{
            margin: 0,
            padding: 0
          }}
          style={{
            opacity: 0,
            animation: "none"
          }}
        >
          <StartDate />
        </Modal>
      </Row>
    );
  }
}

export default StartDateModal;

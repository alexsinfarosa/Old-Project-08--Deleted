import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Modal } from "antd";
import { Box } from "rebass";

import SelectStartDate from "components/SelectStartDate";

@inject("store")
@observer
class StartDateModal extends Component {
  render() {
    const { isStartDateModalOpen, hideStartDateModal } = this.props.store.app;

    return (
      <Box>
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
          <SelectStartDate />
        </Modal>
      </Box>
    );
  }
}

export default StartDateModal;

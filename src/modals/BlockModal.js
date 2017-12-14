import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Col, Modal } from "antd";

import BlockName from "components/BlockName";
import Variety from "components/Variety";
import State from "components/State";
import Station from "components/Station";
import SprayDate from "components/SprayDate";
import StyleLength from "components/StyleLength";
import StartDateEdit from "components/StartDateEdit";
import EndDate from "components/EndDate";

@inject("store")
@observer
class BlockModal extends Component {
  render() {
    const {
      isBlockModal,
      hideNewBlockModal,
      addBlock,
      updateBlock,
      block,
      firstSprayDate,
      secondSprayDate,
      thirdSprayDate,
      setFirstSprayDate,
      setSecondSprayDate,
      setThirdSprayDate
    } = this.props.store.app;

    return (
      <Row type="flex" align="middle">
        <Modal
          width={"30%"}
          closable={false}
          maskClosable={false}
          title={block.isEdit ? `Edit selected block` : `New Block`}
          visible={isBlockModal}
          okText={block.isEdit ? "UPDATE BLOCK" : "CREATE BLOCK"}
          onOk={block.isEdit ? updateBlock : addBlock}
          onCancel={hideNewBlockModal}
        >
          <Col>
            <BlockName />
            <Variety />
            <State />
            <Station />
            {block.isEdit && (
              <div>
                <StyleLength />
                <StartDateEdit />
                <SprayDate
                  type="First spray"
                  date={firstSprayDate}
                  setDate={setFirstSprayDate}
                />
                <SprayDate
                  type="Second spray"
                  date={secondSprayDate}
                  setDate={setSecondSprayDate}
                />
                <SprayDate
                  type="Third spray"
                  date={thirdSprayDate}
                  setDate={setThirdSprayDate}
                />
                <EndDate />
              </div>
            )}
          </Col>
        </Modal>
      </Row>
    );
  }
}

export default BlockModal;

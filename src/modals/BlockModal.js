import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Col, Modal } from "antd";

import SelectBlockName from "components/SelectBlockName";
import SelectVariety from "components/SelectVariety";
import SelectState from "components/SelectState";
import SelectStation from "components/SelectStation";
import SelectSprayDate from "components/SelectSprayDate";
import SelectStyleLength from "components/SelectStyleLength";
import SelectStartDateEdit from "components/SelectStartDateEdit";
import SelectEndDate from "components/SelectEndDate";

@inject("store")
@observer
class BlockModal extends Component {
  render() {
    const {
      isBlockModal,
      hideBlockModal,
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
          title={block.isBeingEdited ? `Edit selected block` : `New Block`}
          visible={isBlockModal}
          okText={block.isBeingEdited ? "UPDATE BLOCK" : "ADD BLOCK"}
          onOk={block.isBeingEdited ? updateBlock : addBlock}
          onCancel={hideBlockModal}
        >
          <Col>
            <SelectBlockName />
            <SelectVariety />
            <SelectState />
            <SelectStation />
            {block.isBeingEdited && (
              <div>
                <SelectStyleLength />
                <SelectStartDateEdit />
                <SelectSprayDate
                  type="First spray"
                  date={firstSprayDate}
                  setDate={setFirstSprayDate}
                />
                <SelectSprayDate
                  type="Second spray"
                  date={secondSprayDate}
                  setDate={setSecondSprayDate}
                />
                <SelectSprayDate
                  type="Third spray"
                  date={thirdSprayDate}
                  setDate={setThirdSprayDate}
                />
                <SelectEndDate />
              </div>
            )}
          </Col>
        </Modal>
      </Row>
    );
  }
}

export default BlockModal;

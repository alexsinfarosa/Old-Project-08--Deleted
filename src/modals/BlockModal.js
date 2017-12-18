import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import { Row, Modal } from "antd";

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
      // blocks,
      firstSprayDate,
      secondSprayDate,
      thirdSprayDate,
      setFirstSprayDate,
      setSecondSprayDate,
      setThirdSprayDate,
      resetFields
    } = this.props.store.app;

    // console.log(block);
    // blocks.map(b => console.log(b.id, b.name, b.isSelected));

    return (
      <Modal
        width={400}
        style={{ top: 32 }}
        closable={false}
        maskClosable={false}
        title={block.isBeingEdited ? `Edit selected block` : `New Block`}
        visible={isBlockModal}
        okText={block.isBeingEdited ? "UPDATE BLOCK" : "ADD BLOCK"}
        onOk={block.isBeingEdited ? updateBlock : addBlock}
        onCancel={() => {
          resetFields();
          hideBlockModal();
        }}
      >
        <Row align="middle">
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
        </Row>
      </Modal>
    );
  }
}

export default BlockModal;

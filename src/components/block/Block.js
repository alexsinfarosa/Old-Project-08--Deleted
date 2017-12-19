import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

import { BlockWrapper, RowCentered } from "styles";

import BlockHeader from "components/block/BlockHeader";
import BlockSteps from "components/block/BlockSteps";
import BlockBody from "components/block/BlockBody";
// antd
import { Row, Col, Button } from "antd";

@inject("store")
@observer
export default class Block extends Component {
  render() {
    const {
      editBlock,
      showStartDateModal,
      showStyleLengthModal,
      setRadioValue
    } = this.props.store.app;

    const { breakpoints, block } = this.props;

    return (
      <BlockWrapper>
        <BlockHeader block={block} breakpoints={breakpoints} />
        <Col>
          {!block.date && !block.avgStyleLength ? (
            <Row type="flex" justify="space-between" align="center">
              <Button
                type="default"
                style={{ width: "40%" }}
                onClick={() => {
                  editBlock(block.id);
                  showStartDateModal();
                }}
              >
                Set Start Date
              </Button>
              <Button
                type="default"
                style={{ width: "40%" }}
                onClick={() => {
                  setRadioValue(null);
                  showStyleLengthModal();
                }}
              >
                Set Style Length
              </Button>
            </Row>
          ) : (
            <Row>
              <BlockBody breakpoints={breakpoints} block={block} />
              <BlockSteps breakpoints={breakpoints} block={block} />
              {breakpoints.xs && (
                <Col xs={24} style={{ padding: 5 }}>
                  <RowCentered>
                    <Col>
                      <small>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Qui neque dolor illo laboriosam esse optio, sed nihil
                        aspernatur dignissimos aperiam libero sequi excepturi
                        cumque quia iste reiciendis? Corrupti, suscipit facere!
                      </small>
                    </Col>
                  </RowCentered>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </BlockWrapper>
    );
  }
}

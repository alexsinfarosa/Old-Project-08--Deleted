import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// antd
import { Col, Progress } from "antd";

import { BlockBodyWrapper, RowCentered } from "styles";

@inject("store")
@observer
class BlockBody extends Component {
  formatEmergence = d => {
    if (d === 100) return "Spray!";
    return `${d}%`;
  };
  render() {
    const { breakpoints, block } = this.props;
    let currentPercentage = 0;
    if (block.gridData.length !== 0) {
      currentPercentage = block.gridData[block.gridData.length - 1].percentage;
    }

    return (
      <Col
        xs={16}
        sm={24}
        md={24}
        lg={24}
        style={{ marginBottom: breakpoints.xs ? 16 : 32 }}
      >
        <BlockBodyWrapper>
          <Col
            xs={24}
            sm={8}
            md={8}
            lg={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              flex: "1 1 auto"
            }}
          >
            <RowCentered column>
              <Col style={{ marginBottom: 8 }}>
                <small>Emergence</small>
              </Col>
              <Col>
                <Progress
                  type="circle"
                  percent={Math.round(currentPercentage, 1)}
                  // percent={100}
                  format={d => this.formatEmergence(d)}
                  width={80}
                />
              </Col>
            </RowCentered>
          </Col>

          <Col xs={0} sm={8} md={8} lg={8} style={{ padding: 5 }}>
            <RowCentered>
              <Col>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                neque dolor illo laboriosam esse optio, sed nihil aspernatur
                dignissimos aperiam libero sequi excepturi cumque quia iste
              </Col>
            </RowCentered>
          </Col>

          <Col
            xs={24}
            sm={8}
            md={8}
            lg={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              flex: "1 1 auto"
            }}
          >
            <RowCentered>
              {breakpoints.xs ? (
                <Col
                  span={24}
                  style={{
                    height: 110,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <small>
                    Avg. Style Length: {block.avgStyleLength.toPrecision(4)}{" "}
                    (mm)
                  </small>
                </Col>
              ) : (
                <Col span={24}>
                  Avg. Style Length: {block.avgStyleLength.toPrecision(4)} (mm)
                </Col>
              )}
            </RowCentered>
          </Col>
        </BlockBodyWrapper>
      </Col>
    );
  }
}

export default BlockBody;

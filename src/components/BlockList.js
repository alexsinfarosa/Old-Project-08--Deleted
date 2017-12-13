import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import format from "date-fns/format";

import { Row, Col, List, Card } from "antd";

@inject("store")
@observer
class BlockLists extends Component {
  render() {
    const { blocks, setBlock, setIsUserData } = this.props.store.app;
    return (
      <Row>
        <Col>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={blocks}
            renderItem={block => (
              <List.Item key={block.id}>
                <Card
                  hoverable={true}
                  title={block.name}
                  style={{ height: 200 }}
                  onClick={() => {
                    setIsUserData(false);
                    setBlock(block.id);
                  }}
                >
                  <li>
                    Start:{" "}
                    {block.date ? format(block.date, "MM/DD/YY HH:00") : null}
                  </li>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
}

export default BlockLists;

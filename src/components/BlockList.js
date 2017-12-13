import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import format from "date-fns/format";

import { Row, Col, List, Card } from "antd";

@inject("store")
@observer
class BlockLists extends Component {
  render() {
    const { blocks, setBlock, toggleUserData } = this.props.store.app;
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
                    toggleUserData();
                    setBlock(block.id);
                  }}
                >
                  <li>{block.variety.name}</li>
                  <li>
                    Start Date:{" "}
                    {block.date ? format(block.date, "MMM Do YYYY HH:0") : null}
                  </li>
                  <li>
                    Average Style Length:{" "}
                    {block.avgStyleLength ? block.avgStyleLength : null}
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

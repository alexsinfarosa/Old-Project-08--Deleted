import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

import format from "date-fns/format";

// antd
import { Row, Col, Table } from "antd";

// styled components
import { Block, MRow } from "styles";

@inject("store")
@observer
class UserData extends Component {
  state = {
    record: {}
  };

  render() {
    const { blocks, editBlock, deleteBlock } = this.props.store.app;
    // blocks.map(b => console.table(toJS(b)));

    // columns ----------------------------------------------------------
    const columns = [
      {
        title: "Block Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Variety",
        dataIndex: "variety",
        key: "variety"
      },
      {
        title: "Avg. Style Length",
        dataIndex: "avgStyleLength",
        key: "avgStyleLength"
      },
      {
        title: "Start Date",
        dataIndex: "date",
        key: "date",
        render: (text, record) => (
          <span>{format(text, "MMM DD YYYY HH:mm")}</span>
        )
      },
      {
        title: "1st Spray Date",
        dataIndex: "firstSpray",
        key: "firstSpray",
        render: (text, record) =>
          text ? <span>{format(text, "MMM DD YYYY HH:mm")}</span> : null
      },
      {
        title: "2nd Spray Date",
        dataIndex: "secondSpray",
        key: "secondSpray",
        render: (text, record) =>
          text ? <span>{format(text, "MMM DD YYYY HH:mm")}</span> : null
      },
      {
        title: "3rd Spray Date",
        dataIndex: "thirdSpray",
        key: "thirdSpray",
        render: (text, record) =>
          text ? <span>{format(text, "MMM DD YYYY HH:mm")}</span> : null
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record, index) => (
          <span>
            <a onClick={() => deleteBlock(record, index)}>Delete</a>
            <span className="ant-divider" />
            <a
              onClick={() => {
                editBlock(record, index);
                this.setState({ record });
              }}
            >
              Edit
            </a>
          </span>
        )
      }
    ];
    //  end columns ------------------------------------------------------

    const isRowSelected = record => {
      if (record.id === this.state.record.id) return "selected";
    };

    return (
      <Block>
        <Row>
          <MRow>
            <Col>
              <h2>
                Blocks <small>({blocks.length})</small>
              </h2>
            </Col>
          </MRow>
          <MRow>
            <Table
              rowClassName={record => isRowSelected(record)}
              size="middle"
              pagination={false}
              rowKey={record => record.id}
              dataSource={blocks.slice()}
              columns={columns}
              expandedRowRender={record => <p>{record.name}</p>}
            />
          </MRow>
        </Row>
      </Block>
    );
  }
}

export default UserData;

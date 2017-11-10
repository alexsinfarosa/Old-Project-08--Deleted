import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";
import format from "date-fns/format";
import isThisYear from "date-fns/is_this_year";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Tooltip } from "antd";

import { TableIcons, CellWrapper, CellHeader } from "styles";
import PCEgraph from "components/PCEgraph";

@inject("store")
@observer
class UserTable extends Component {
  state = {
    blocks: JSON.parse(localStorage.getItem("pollenTubeBlocks")) || []
  };

  addBlock = async () => {
    const blocks = [...this.state.blocks];
    const {
      subject,
      blockName,
      avgStyleLength,
      state,
      station,
      endDate
    } = this.props.store.app;

    const block = {
      id: Math.random(),
      variety: subject,
      blockName: blockName,
      avgStyleLength: avgStyleLength,
      state: state.name,
      station: station.name,
      date: endDate
    };

    blocks.push(block);
    this.setState({ blocks });
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(blocks));
  };

  deleteBlock = block => {
    const blocks = [...this.state.blocks];
    blocks.splice(block.index, 1);
    this.setState({ blocks });
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(blocks));
  };

  editBlock = cellInfo => {
    return (
      <div
        style={{
          backgroundColor: "#fafafa",
          borderRadius: "3px",
          outline: "none",
          height: "25px",
          display: "flex",
          alignItems: "center"
        }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const blocks = [...this.state.blocks];
          blocks[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ blocks });
          localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(blocks));
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.blocks[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  render() {
    const { blocks } = this.state;

    return (
      <Flex
        column
        bg="white"
        p={1}
        mb={[1, 2, 3]}
        style={{ borderRadius: "5px" }}
      >
        <Flex mb={1} justify="space-between" align="center">
          <Box f={[1, 2, 3]}>Field User Data</Box>
          <Box>
            <Button icon="plus" onClick={this.addBlock}>
              Field
            </Button>
          </Box>
        </Flex>

        <Box>
          <ReactTable
            noDataText="No Data"
            data={blocks}
            showPagination={false}
            minRows={1}
            pageSize={blocks.length}
            resizable={true}
            className="-highlight"
            columns={[
              {
                expander: true,
                Header: () => <CellHeader>Graph</CellHeader>,
                width: 45,
                Expander: ({ isExpanded, ...rest }) => (
                  <div>
                    {isExpanded ? (
                      <CellWrapper>
                        <TableIcons type="rollback" />
                      </CellWrapper>
                    ) : (
                      <CellWrapper>
                        <TableIcons type="line-chart" />
                      </CellWrapper>
                    )}
                  </div>
                )
              },
              {
                Header: () => <CellHeader>Block Name</CellHeader>,
                accessor: "blockName",
                Cell: this.editBlock
              },
              {
                Header: () => <CellHeader>Average Style Length</CellHeader>,
                accessor: "avgStyleLength",
                Cell: this.editBlock
              },
              {
                Header: () => <CellHeader>Variety</CellHeader>,
                accessor: "variety",
                Cell: this.editBlock
                // Cell: props => <span className="number">{props.value}</span>
              },
              {
                Header: () => <CellHeader>Start Date</CellHeader>,
                accessor: "date",
                Cell: this.editBlock
                // Cell: props => <span className="number">{props.value}</span>
              },
              {
                Header: "",
                width: 45,
                Cell: props => (
                  <Tooltip title="Delete Field">
                    <CellWrapper>
                      <TableIcons
                        style={{ color: "#A42D25" }}
                        type="delete"
                        onClick={() => this.deleteBlock(props)}
                      />
                    </CellWrapper>
                  </Tooltip>
                )
              }
            ]}
            SubComponent={row => {
              return (
                <div style={{ padding: "20px" }}>
                  <PCEgraph
                    graphData={row.original.graphData}
                    station={row.original.station}
                    state={row.original.state}
                  />
                </div>
              );
            }}
          />
        </Box>
      </Flex>
    );
  }
}

export default UserTable;

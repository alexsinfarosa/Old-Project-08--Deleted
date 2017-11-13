import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";
// import format from "date-fns/format";
// import isThisYear from "date-fns/is_this_year";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Tooltip } from "antd";

import { TableIcons, CellWrapper, CellHeader } from "styles";
// import PCEgraph from "components/PCEgraph";

@inject("store")
@observer
class UserTable extends Component {
  // editBlock = cellInfo => {
  //   const { blocks, setBlocks } = this.props.store.app;
  //   return (
  //     <div
  //       style={{
  //         backgroundColor: "#fafafa",
  //         borderRadius: "3px",
  //         outline: "none",
  //         height: "25px",
  //         display: "flex",
  //         alignItems: "center"
  //       }}
  //       contentEditable
  //       suppressContentEditableWarning
  //       onBlur={e => {
  //         const blocksEdit = [...blocks.slice()];
  //         blocksEdit[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
  //         setBlocks(blocksEdit);
  //       }}
  //       dangerouslySetInnerHTML={{
  //         __html: blocks[cellInfo.index][cellInfo.column.id]
  //       }}
  //     />
  //   );
  // };

  render() {
    const { blocks, deleteBlock, editBlock } = this.props.store.app;

    return (
      <Flex
        column
        bg="white"
        p={1}
        mb={[1, 2, 3]}
        style={{ borderRadius: "5px" }}
      >
        <Flex mb={1} justify="space-between" align="center">
          <Box f={[1, 2, 3]}>
            Blocks <small style={{ fontSize: "14px" }}>({blocks.length})</small>
          </Box>
        </Flex>

        <Box>
          <ReactTable
            noDataText="No Data"
            data={blocks.slice()}
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
                Cell: props => <CellWrapper>{props.value}</CellWrapper>
              },
              {
                Header: () => <CellHeader>State</CellHeader>,
                accessor: "state",
                Cell: props => <CellWrapper>{props.value}</CellWrapper>
              },
              {
                Header: () => <CellHeader>Station</CellHeader>,
                accessor: "station",
                Cell: props => <CellWrapper>{props.value}</CellWrapper>
              },
              {
                Header: () => <CellHeader>Avg. Style Length</CellHeader>,
                accessor: "avgStyleLength",
                Cell: props => <CellWrapper>{props.value} mm</CellWrapper>
              },
              {
                Header: () => <CellHeader>Variety</CellHeader>,
                accessor: "variety",
                Cell: props => <CellWrapper>{props.value}</CellWrapper>
                // Cell: props => <span className="number">{props.value}</span>
              },
              {
                Header: () => <CellHeader>Start Date</CellHeader>,
                accessor: "date",
                Cell: props => <CellWrapper>{props.value}</CellWrapper>
              },
              {
                Header: () => <CellHeader center>Delete</CellHeader>,
                width: 60,
                Cell: props => (
                  <Tooltip title="Delete Block">
                    <CellWrapper>
                      <TableIcons
                        type="delete"
                        onClick={() => deleteBlock(props)}
                      />
                    </CellWrapper>
                  </Tooltip>
                )
              },
              {
                Header: () => <CellHeader center>Edit</CellHeader>,
                width: 45,
                Cell: props => (
                  <Tooltip title="Edit Block">
                    <CellWrapper>
                      <TableIcons
                        type="edit"
                        onClick={() => editBlock(props)}
                      />
                    </CellWrapper>
                  </Tooltip>
                )
              }
            ]}
            SubComponent={row => {
              return <div style={{ padding: "20px" }}>ciccio</div>;
            }}
          />
        </Box>
      </Flex>
    );
  }
}

export default UserTable;

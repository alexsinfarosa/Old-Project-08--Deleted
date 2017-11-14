import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";
import format from "date-fns/format";
// import isThisYear from "date-fns/is_this_year";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Tooltip } from "antd";

import { TableIcons, CellWrapper, CellHeader } from "styles";
// import PCEgraph from "components/PCEgraph";

@inject("store")
@observer
class UserTable extends Component {
  render() {
    const { blocks, deleteBlock, editBlock } = this.props.store.app;
    // blocks.map(block => console.log(block));
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
            expander={true}
            defaultSorted={[
              {
                id: "date",
                desc: false
              }
            ]}
            columns={[
              {
                Header: () => <CellHeader>Block Name</CellHeader>,
                accessor: "name",
                Cell: props => (
                  <CellWrapper style={{ background: "orange" }}>
                    {props.value}
                  </CellWrapper>
                )
              },
              {
                Header: () => <CellHeader>Variety</CellHeader>,
                accessor: "variety",
                Cell: props => <CellWrapper>{props.value}</CellWrapper>
                // Cell: props => <span className="number">{props.value}</span>
              },
              {
                Header: () => <CellHeader>Avg. Style Length</CellHeader>,
                accessor: "avgStyleLength",
                Cell: props => <CellWrapper>{props.value} mm</CellWrapper>
              },
              {
                Header: () => <CellHeader>Start Date</CellHeader>,
                accessor: "date",
                Cell: props => (
                  <CellWrapper>
                    {props.value
                      ? format(props.value, "MMM DD YYYY HH:mm")
                      : null}
                  </CellWrapper>
                )
              },
              {
                Header: () => <CellHeader>1st Spray Date</CellHeader>,
                accessor: "firstSpray",
                Cell: props => (
                  <CellWrapper>
                    {props.value
                      ? format(props.value, "MMM DD YYYY HH:mm")
                      : null}
                  </CellWrapper>
                )
              },
              {
                Header: () => <CellHeader>2nd Spray Date</CellHeader>,
                accessor: "secondSpray",
                Cell: props => (
                  <CellWrapper>
                    {props.value
                      ? format(props.value, "MMM DD YYYY HH:mm")
                      : null}
                  </CellWrapper>
                )
              },
              {
                Header: () => <CellHeader>3rd Spray Date</CellHeader>,
                accessor: "thirdSpray",
                Cell: props => (
                  <CellWrapper>
                    {props.value
                      ? format(props.value, "MMM DD YYYY HH:mm")
                      : null}
                  </CellWrapper>
                )
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
              return (
                <Flex p={[1, 1, 2]} column>
                  <Box>content...</Box>
                  <Box>content...</Box>
                </Flex>
              );
            }}
          />
        </Box>
      </Flex>
    );
  }
}

export default UserTable;

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
  state = {
    props: {}
  };

  handleEdit = props => {
    const { editBlock } = this.props.store.app;
    this.setState({ props });
    editBlock(props);
  };

  render() {
    const { blocks, deleteBlock, block } = this.props.store.app;
    console.log("----------------------");
    blocks.map(b => console.log(b.name, b.id, b.isEditing));
    console.log("----------------------");
    console.log(block.name, block.id, block.isEditing);
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

        {blocks.length > 0 && (
          <Box>
            <ReactTable
              noDataText="No Data"
              data={blocks.slice()}
              showPagination={false}
              pageSize={blocks.length}
              className="-highlight"
              defaultSorted={[
                {
                  id: "date",
                  desc: true
                }
              ]}
              columns={[
                {
                  Header: () => <CellHeader>Block Name</CellHeader>,
                  accessor: "name",
                  Cell: props => <CellWrapper>{props.value}</CellWrapper>
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
                          onClick={() => this.handleEdit(props.original)}
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
              getTrProps={(state, rowInfo, column) => {
                const { props } = this.state;
                const { isEditing } = this.props.store.app;
                // console.log(props);
                let isRow;
                if (isEditing) {
                  isRow = rowInfo.original.id === props.id;
                }
                return {
                  style: {
                    background: isRow ? "#FDF7D0" : null
                  }
                };
              }}
            />
          </Box>
        )}
      </Flex>
    );
  }
}

export default UserTable;

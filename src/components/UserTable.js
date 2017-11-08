import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";
import format from "date-fns/format";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Tooltip } from "antd";

import { TableIcons } from "styles";
import PCEgraph from "components/PCEgraph";

@inject("store")
@observer
class UserTable extends Component {
  state = {
    fields: JSON.parse(localStorage.getItem("weedModelUserTable")) || []
  };

  addField = () => {
    const fields = [...this.state.fields];
    const field = {
      action: "edit action...",
      date: format(this.props.store.app.endDate, "MMM Do YYYY"),
      id: Math.random(),
      name: "edit field name..."
    };
    fields.push(field);
    this.setState({ fields });
    localStorage.setItem(`weedModelUserTable`, JSON.stringify(fields));
  };

  deleteField = field => {
    const fields = [...this.state.fields];
    fields.splice(field.index, 1);
    this.setState({ fields });
    localStorage.setItem(`weedModelUserTable`, JSON.stringify(fields));
  };

  editField = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa", outline: "none" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const fields = [...this.state.fields];
          fields[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ fields });
          localStorage.setItem(`weedModelUserTable`, JSON.stringify(fields));
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.fields[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  graphData = d => {
    const { graphData } = this.props.store.app;
    console.log(graphData);
  };

  render() {
    const { fields } = this.state;
    return (
      <Flex column bg="white" p={1} mb={2} style={{ borderRadius: "5px" }}>
        <Flex mb={1} justify="space-between" align="center">
          <Box f={[1, 2, 3]}>Field User Data</Box>
          <Box>
            <Button icon="plus" onClick={this.addField}>
              Field
            </Button>
          </Box>
        </Flex>

        <Box>
          <ReactTable
            noDataText="No User Data"
            data={fields}
            showPagination={false}
            pageSize={fields.length}
            resizable={true}
            className="-highlight"
            columns={[
              {
                expander: true,
                Header: () => <span>Graph</span>,
                width: 45,
                Expander: ({ isExpanded, ...rest }) => (
                  <div>
                    {isExpanded ? (
                      <TableIcons type="rollback" />
                    ) : (
                      <TableIcons type="line-chart" />
                    )}
                  </div>
                )
              },
              {
                Header: "Field Name",
                accessor: "name",
                Cell: this.editField
              },
              {
                Header: "Action",
                accessor: "action",
                Cell: this.editField
              },
              {
                Header: "Accumulation Start Date",
                accessor: "date",
                Cell: this.editField
                // Cell: props => <span className="number">{props.value}</span> // Custom cell components!
              },
              {
                Header: "",
                width: 45,
                Cell: props => (
                  <Tooltip title="Delete Field">
                    <TableIcons
                      style={{ color: "#A42D25" }}
                      type="delete"
                      onClick={() => this.deleteField(props)}
                    />
                  </Tooltip>
                )
              }
            ]}
            SubComponent={row => {
              return (
                <div style={{ padding: "20px" }}>
                  <em>You can write notes here...</em>
                  <PCEgraph />
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

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Flex, Box } from "rebass";
import format from "date-fns/format";
import isThisYear from "date-fns/is_this_year";
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

  addField = async () => {
    const fields = [...this.state.fields];
    const {
      loadGridData,
      endDate,
      state,
      station,
      currentYear
    } = this.props.store.app;
    const resetDate = endDate;

    let lastDate = format(new Date(), "YYYY-MM-DD");
    if (!isThisYear(currentYear)) {
      lastDate = `${currentYear}-12-31`;
    }

    await loadGridData(resetDate, lastDate);

    const field = {
      action: "edit action...",
      date: format(endDate, "MMM Do YYYY"),
      id: Math.random(),
      name: "edit field name...",
      graphData: this.props.store.app.graphData,
      state: state,
      station: station
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
            noDataText="No Data"
            data={fields}
            showPagination={false}
            minRows={1}
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
                // Cell: props => <span className="number">{props.value}</span>
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

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";
import { Select } from "antd";

@inject("store")
@observer
class Subject extends Component {
  handleChange = value => {
    const { setSubject, closeSidebar } = this.props.store.app;
    setSubject(value);
    closeSidebar();
  };

  render() {
    const { subject, subjects } = this.props.store.app;

    const subjectList = subjects.map(subject => {
      return (
        <Select.Option key={subject.name} value={subject.name}>
          {subject.name}
        </Select.Option>
      );
    });

    return (
      <Box mb={3}>
        <label>Variety:</label>
        <Select
          name="subject"
          size="large"
          autoFocus
          value={subject.name}
          placeholder="Select Variety"
          style={{ width: "100%" }}
          onChange={this.handleChange}
        >
          {subjectList}
        </Select>
      </Box>
    );
  }
}

export default Subject;

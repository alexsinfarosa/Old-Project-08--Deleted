import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Box } from "rebass";
import { Select } from "antd";

@inject("store")
@observer
class Subject extends Component {
  handleChange = value => {
    const { setSubject, closeSidebar, setIsMap } = this.props.store.app;
    setSubject(value);
    setIsMap();
    closeSidebar();
  };

  render() {
    const { subject, subjects } = this.props.store.app;

    const subjectList = subjects.map((subject, i) => {
      return (
        <Select.Option key={subject.name.toString()} value={subject.name}>
          {subject.name}
        </Select.Option>
      );
    });

    return (
      <Box mb={3}>
        <label>Select a disease or insect:</label>
        <Select
          name="subject"
          size="large"
          autoFocus
          value={subject.name}
          placeholder="Select Disease"
          style={{ width: 200 }}
          onChange={this.handleChange}
        >
          {subjectList}
        </Select>
      </Box>
    );
  }
}

export default Subject;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

import { Flex, Box } from "rebass";

import { Select } from "antd";
const Option = Select.Option;

@inject("store")
@observer
class Subject extends Component {
  constructor(props) {
    super(props);
    this.props.store.app.loadSubjects();
  }

  handleChange = value => {
    const { areRequiredFieldsSet } = this.props.store.app;
    const mobile = this.props.size;
    this.props.store.app.setSubject(value);
    if (areRequiredFieldsSet && mobile) {
      // console.log("inside Subject");
      this.props.store.app.setIsSidebarOpen(false);
      return;
    }
    // console.log(`subject: ${value}`);
  };
  render() {
    const { subject, subjects } = this.props.store.app;
    return (
      <Flex mb={2} bg="green" column>
        <Box w={200} bg="white" m="auto">
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
            {subjects.map((subject, i) => {
              return (
                <Option key={subject.name.toString()} value={subject.name}>
                  {subject.name}
                </Option>
              );
            })}
          </Select>
        </Box>
      </Flex>
    );
  }
}

export default Subject;

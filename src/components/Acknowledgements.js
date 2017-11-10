import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import { Box } from "rebass";

import { Modal, Button } from "antd";

@inject("store")
@observer
class Acknowledgements extends Component {
  @observable isVisible = false;
  @action setIsVisible = d => (this.isVisible = d);

  render() {
    return (
      <Box my={3} flex="1 1 auto">
        <Button
          style={{ width: "100%" }}
          size="large"
          type="default"
          icon="info-circle-o"
          onClick={() => this.setIsVisible(true)}
        >
          Acknowledgments
        </Button>
        <Modal
          title="Acknowledgments"
          wrapClassName="vertical-center-modal"
          visible={this.isVisible}
          onOk={() => this.setIsVisible(false)}
          onCancel={() => this.setIsVisible(false)}
        >
          <ul>
            <li>
              New York State Integrated Pest Management -{" "}
              <a
                style={{ color: "black" }}
                onClick={() => this.setIsVisible(false)}
                href="https://nysipm.cornell.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NYSIPM
              </a>
            </li>
            <li>
              Northeast Regional Climate Center -{" "}
              <a
                style={{ color: "black" }}
                onClick={() => this.setIsVisible(false)}
                href="http://www.nrcc.cornell.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NRCC
              </a>
            </li>
          </ul>
        </Modal>
      </Box>
    );
  }
}

export default Acknowledgements;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Modal, Button } from "antd";

//  styled components
import { MBCol } from "styles";

@inject("store")
@observer
class Acknowledgements extends Component {
  state = {
    isVisible: false
  };

  render() {
    return (
      <MBCol>
        <Button
          style={{ width: "100%" }}
          type="default"
          icon="info-circle-o"
          onClick={() => this.setState({ isVisible: true })}
        >
          Acknowledgments
        </Button>
        <Modal
          title="Acknowledgments"
          wrapClassName="vertical-center-modal"
          visible={this.state.isVisible}
          onOk={() => this.setState({ isVisible: false })}
          onCancel={() => this.setState({ isVisible: false })}
        >
          <ul>
            <li>
              New York State Integrated Pest Management -{" "}
              <a
                style={{ color: "black" }}
                onClick={() => this.setState({ isVisible: false })}
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
                onClick={() => this.setState({ isVisible: false })}
                href="http://www.nrcc.cornell.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NRCC
              </a>
            </li>
          </ul>
        </Modal>
      </MBCol>
    );
  }
}

export default Acknowledgements;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { message, Button } from "antd";

const success = () => {
  message.info(
    "This is a prompt message for success, and it will disappear in 10 seconds",
    10
  );
};

@inject("store")
@observer
class StyleLengthMsg extends Component {
  render() {
    return (
      <div>
        <Button onClick={success}>Customized display duration</Button>
      </div>
    );
  }
}

export default StyleLengthMsg;

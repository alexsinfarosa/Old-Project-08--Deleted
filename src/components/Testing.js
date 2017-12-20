import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Testing extends Component {
  render() {
    return <div>ciccio</div>;
  }
}

export default Testing;

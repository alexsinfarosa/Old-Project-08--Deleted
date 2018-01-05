import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { MatchMediaProvider } from "mobx-react-matchmedia";

// ToolBar
// import ToolBar from "components/ToolBar";

// Modals
// import BlockModal from "modals/BlockModal";
// import StartDateModal from "modals/StartDateModal";
// import StyleLengthModal from "modals/StyleLengthModal";

// Main content
// import USMap from "components/USMap";
// import BlockList from "components/block/BlockList";
// import Testing from "components/Testing";

// styled components
import { Header, SubHeader, SubHeaderRight, Main } from "styles";
import { ToolBarWrapper } from "./styles";
import { matchIconsToStations } from "./utils/utils";

@inject("app", "acisStates")
@observer
class App extends Component {
  render() {
    const { breakpoints, isMap } = this.props.app;
    console.log(toJS(this.props.acisStates.states));
    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Header>
          <SubHeader>
            Pollen Tube Growth Model Developed By Virginia Tech
          </SubHeader>
          <SubHeaderRight>NEWA</SubHeaderRight>
        </Header>
      </MatchMediaProvider>
    );
  }
}

export default App;

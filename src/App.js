import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { MatchMediaProvider } from "mobx-react-matchmedia";

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
// import { Header, SubHeader, SubHeaderRight, Main } from "styles";

@inject("store")
@observer
class App extends Component {
  render() {
    // const { breakpoints, isMap } = this.props.store.app;
    // return (
    //   <MatchMediaProvider breakpoints={breakpoints}>
    //     <Header>
    //       <SubHeader>
    //         Pollen Tube Growth Model Developed By Virginia Tech
    //       </SubHeader>
    //       <SubHeaderRight>NEWA</SubHeaderRight>
    //     </Header>

    //     <ToolBar breakpoints={breakpoints} />

    //     <BlockModal />
    //     <StartDateModal />
    //     <StyleLengthModal breakpoints={breakpoints} />

    //     <Main>
    //       {isMap && <USMap />}
    //       <BlockList breakpoints={breakpoints} />
    //     </Main>
    //   </MatchMediaProvider>
    // );
    return <div />;
  }
}

export default App;

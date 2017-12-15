import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./index.css";
import { MatchMediaProvider } from "mobx-react-matchmedia";

// ToolBar
import ToolBar from "components/ToolBar";

// Main content
import USMap from "components/USMap";
import BlockList from "components/BlockList";
// import BlockList from "components/BlockList";

// Modal
import StyleLengthModal from "modals/StyleLengthModal";
import BlockModal from "modals/BlockModal";
import StartDateModal from "modals/StartDateModal";

import { Flex, Box } from "rebass";

// styled components
import { Header, SubHeader, RightSubHeader, Container } from "styles";

@inject("store")
@observer
class App extends Component {
  render() {
    const { breakpoints, isMap } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Flex column>
          <Header wrap px={(1, 1, 2, 2)}>
            <SubHeader w={[1, "90%"]} f={[1, 2, 3, 3]}>
              Pollen Tube Growth Model Developed By Virginia Tech
            </SubHeader>

            {!breakpoints.xs && (
              <RightSubHeader w={[1, "10%"]} f={[1, 2, 2, 3]}>
                NEWA
              </RightSubHeader>
            )}
          </Header>

          <Box my={[2, 3, 4]} mx={[1, 2, 3]}>
            <ToolBar breakpoints={breakpoints} />

            <Container>
              <BlockModal />
              <StyleLengthModal />
              <StartDateModal />
              {isMap && <USMap />}
              <BlockList breakpoints={breakpoints} />
            </Container>
          </Box>
        </Flex>
      </MatchMediaProvider>
    );
  }
}

export default App;

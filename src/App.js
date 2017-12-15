import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./index.css";
import { MatchMediaProvider } from "mobx-react-matchmedia";

// Navigation
import Navigation from "components/Navigation";
import ToggleIcons from "components/ToggleIcons";

// Main content
import USMap from "components/USMap";
import BlocksDropdown from "components/userData/BlocksDropdown";
import SingleBlock from "components/userData/SingleBlock";
import BlockList from "components/BlockList";

// Modal
import StyleLengthModal from "modals/StyleLengthModal";
import BlockModal from "modals/BlockModal";
import StartDateModal from "modals/StartDateModal";

import { Flex, Box } from "grid-styled";
import Hide from "hidden-styled";

// styled components
import { Header, SubHeader, Container } from "styles";
import { networkHumidityAdjustment } from "./utils";

@inject("store")
@observer
class App extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const {
      breakpoints,
      isMap,
      isBlockSelected,
      areBlocksDisplayed
    } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Flex column>
          <Header wrap px={(1, 1, 2, 2)}>
            <SubHeader w={[1, "90%"]} f={[1, 2, 2, 3]}>
              Pollen Tube Growth Model Developed By Virginia Tech
            </SubHeader>

            {!breakpoints.xs && (
              <SubHeader right w={[1, "10%"]} f={[1, 2, 2, 3]}>
                NEWA
              </SubHeader>
            )}
          </Header>
          <Container>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            tempora fugit incidunt laudantium voluptatem velit maiores porro.
            Accusantium voluptates quos officiis reprehenderit molestiae
            deserunt aut voluptatum assumenda? Voluptatem, quis vitae.
          </Container>
        </Flex>
      </MatchMediaProvider>
    );
  }
}

export default App;

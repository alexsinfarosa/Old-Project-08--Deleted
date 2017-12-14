import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./index.css";
// import { MatchMediaProvider } from "mobx-react-matchmedia";

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

// Rebass
import { Provider, Flex, Box } from "rebass";

// styled components
import { Header, Container } from "styles";

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
      <Provider
        theme={{
          font: "'Open Sans', sans-serif"
        }}
      >
        <Flex column>
          <Header mx={[1, 2, 3]}>
            <Box
              flex="1 1 auto"
              w={[1 / 2, 1]}
              f={[1, 2, 3]}
              style={{ letterSpacing: 1, background: "orange" }}
            >
              Pollen Tube Growth Model Developed By Virginia Tech
            </Box>
            <Box
              flex="1 1 auto"
              w={[1 / 2, 1]}
              f={[1, 2, 3]}
              style={{
                letterSpacing: 1,
                textAlign: "right",
                background: "tomato"
              }}
            >
              NEWA
            </Box>
          </Header>
          <Container>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            tempora fugit incidunt laudantium voluptatem velit maiores porro.
            Accusantium voluptates quos officiis reprehenderit molestiae
            deserunt aut voluptatum assumenda? Voluptatem, quis vitae.
          </Container>
        </Flex>
      </Provider>
    );
  }
}

export default App;

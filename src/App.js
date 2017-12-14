import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";

import { MatchMediaProvider } from "mobx-react-matchmedia";

// styled components
// import { MBRow } from "styles";

// Navigation
import Navigation from "components/Navigation";
import ToggleIcons from "components/ToggleIcons";

// Main content
import USMap from "components/USMap";
import BlocksDropdown from "components/userData/BlocksDropdown";
import SingleBlock from "components/userData/SingleBlock";
import BlockList from "components/BlockList";
// import GrowthTable from "components/GrowthTable";

// Modal
import StyleLengthModal from "modals/StyleLengthModal";
import BlockModal from "modals/BlockModal";
import StartDateModal from "modals/StartDateModal";

// import Instructions from "components/Instructions";

// Logos
// import NEWALogo from "assets/newa_logo.svg";

// Messages
// import StyleLengthMsg from "messages/StyleLengthMsg";

import { Layout, Row, Col } from "antd";
// import { MBRow } from "./styles";
// import { Row } from "rebass";
const { Content } = Layout;

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
        <Layout style={{ minHeight: "100vh" }}>
          <Row style={{ padding: "0 16px", background: "#1DA57A", height: 80 }}>
            <Col
              xs={20}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 16px",
                color: "white",
                fontSize: breakpoints.xs ? "1rem" : "1.1rem",
                textAlign: breakpoints.xs ? "center" : "left",
                height: "100%"
              }}
            >
              <div style={{ letterSpacing: 1, fontSize: "1.2rem" }}>
                Pollen Tube Growth Model Developed By Virginia Tech
              </div>
            </Col>
            <Col
              xs={0}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 16px",
                color: "white",
                fontSize: "1.1rem",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <div style={{ letterSpacing: 1 }}>NEWA</div>
            </Col>
          </Row>

          <Content style={{ margin: "24px auto", width: "90%" }}>
            <Row
              type="flex"
              justify="space-between"
              style={{ height: 40, marginTop: 16, marginBottom: 48 }}
            >
              <Navigation />
              <BlocksDropdown />
              <ToggleIcons />
            </Row>

            <div style={{ minHeight: 360 }}>
              {isMap && <USMap />}
              {isBlockSelected && !areBlocksDisplayed && <SingleBlock />}
              {!isBlockSelected && areBlocksDisplayed && <BlockList />}
              <BlockModal />
              <StyleLengthModal />
              <StartDateModal />
            </div>
          </Content>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App;

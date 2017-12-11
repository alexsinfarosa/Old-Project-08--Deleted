import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";

import { MatchMediaProvider } from "mobx-react-matchmedia";

// styled components
import { Header } from "styles";

// Navigation
import Navigation from "components/Navigation";

// Main content
import USMap from "components/USMap";
import BlocksDropdown from "components/userData/BlocksDropdown";
import UserData from "components/userData/UserData";

// Modal
import StyleLengthModal from "modals/StyleLengthModal";
import NewBlockModal from "modals/NewBlockModal";

// Logos
// import NEWALogo from "assets/newa_logo.svg";

import { Layout, Row, Col } from "antd";
import { MBRow } from "./styles";
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
      isUserData
    } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout style={{ minHeight: "100vh" }}>
          <Row style={{ padding: "0 16px", background: "#8ec9f2" }}>
            <Col
              xs={24}
              md={12}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 0",
                color: "white",
                fontSize: breakpoints.xs ? "1rem" : "1.1rem",
                textAlign: breakpoints.xs ? "center" : "left"
              }}
            >
              <div>Tech Pollen Tube Growth Model</div>
              <div style={{ marginTop: "-5px" }}>
                <small>
                  <i style={{ fontSize: "0.7rem" }}> BY VIRGINIA TECH</i>
                </small>
              </div>
            </Col>
            <Col
              xs={24}
              md={8}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 0",
                color: "white",
                fontSize: "1.1rem"
              }}
            >
              <Navigation />
            </Col>
            <Col
              xs={0}
              md={4}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 0",
                textAlign: "right",
                color: "white",
                fontSize: "1.1rem"
              }}
            >
              NEWA
            </Col>
          </Row>

          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ minHeight: 360 }}>
              {isMap && <USMap />}
              {isUserData && (
                <div>
                  <BlocksDropdown />
                  {isBlockSelected && <UserData />}
                </div>
              )}
              <StyleLengthModal />
              <NewBlockModal />
            </div>
          </Content>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App;

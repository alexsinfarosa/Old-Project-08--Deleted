import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";

import { MatchMediaProvider } from "mobx-react-matchmedia";

// styled components
import { MBRow } from "styles";

// Navigation
import Navigation from "components/Navigation";
import ToggleIcons from "components/ToggleIcons";

// Main content
import USMap from "components/USMap";
import BlocksDropdown from "components/userData/BlocksDropdown";
import UserData from "components/userData/UserData";
// import GrowthTable from "components/GrowthTable";

// Modal
import StyleLengthModal from "modals/StyleLengthModal";
import BlockModal from "modals/BlockModal";
import StartDateModal from "modals/StartDateModal";

// Logos
// import NEWALogo from "assets/newa_logo.svg";

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
      isUserData
    } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout style={{ minHeight: "100vh" }}>
          <Row style={{ padding: "0 16px", background: "#8ec9f2", height: 90 }}>
            <Col
              xs={20}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 0",
                color: "white",
                fontSize: breakpoints.xs ? "1rem" : "1.1rem",
                textAlign: breakpoints.xs ? "center" : "left",
                height: "100%"
              }}
            >
              <div>
                <div style={{ letterSpacing: 1, fontSize: "1.2rem" }}>
                  Tech Pollen Tube Growth Model
                </div>
                <div style={{ marginTop: "-5px" }}>
                  <small>
                    <i style={{ fontSize: "0.7rem", letterSpacing: 1 }}>
                      {" "}
                      BY VIRGINIA TECH
                    </i>
                  </small>
                </div>
              </div>
            </Col>
            <Col
              xs={0}
              style={{
                padding: breakpoints.xs ? "16px 0" : "24px 0",
                color: "white",
                fontSize: "1.1rem",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              NEWA
            </Col>
          </Row>

          <Content style={{ margin: "24px auto", width: "90%" }}>
            <MBRow
              type="flex"
              justify="space-around"
              // style={{ border: "1px solid teal" }}
            >
              <Navigation />
              <ToggleIcons />
            </MBRow>
            <div style={{ minHeight: 360 }}>
              {isMap && <USMap />}
              {isUserData && (
                <div>
                  <BlocksDropdown />
                  {isBlockSelected && <UserData />}
                </div>
              )}
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

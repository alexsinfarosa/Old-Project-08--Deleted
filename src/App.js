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

import { Row, Layout, Icon, Divider, Button, message, Popconfirm } from "antd";
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
      isUserData,
      showNewBlockModal,
      deleteBlock,
      block
    } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header>
            {breakpoints.xs ? (
              <h4>Tech Pollen Tube Growth Model by Virginia Tech</h4>
            ) : (
              <h3>Tech Pollen Tube Growth Model by Virginia Tech</h3>
            )}

            <Navigation />

            {breakpoints.xs ? <h4>NEWA</h4> : <h3>NEWA</h3>}
          </Header>

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

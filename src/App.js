import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";

import { MatchMediaProvider } from "mobx-react-matchmedia";

import BlockName from "components/leftPanel/BlockName";
import Variety from "components/leftPanel/Variety";
import StyleLength from "components/leftPanel/StyleLength";
import State from "components/leftPanel/State";
import Station from "components/leftPanel/Station";
// import StartDate from "components/leftPanel/StartDate";
import NewUpdateBlockButton from "components/leftPanel/NewUpdateBlockButton";
import MapBlocksButtons from "components/leftPanel/MapBlocksButtons";
import Acknowledgements from "components/leftPanel/Acknowledgements";

import { Layout, Icon, Divider } from "antd";
const { Content, Sider, Header } = Layout;

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
    const { breakpoints } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout>
          <Sider
            style={{
              background: "#FFF"
            }}
            breakpoint="xs"
            width={250}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={(collapsed, type) => this.setState({ collapsed })}
            collapsedWidth={0}
          >
            <h1 className="logo">Cornell University</h1>

            <div style={{ margin: "0 16px", border: "none" }}>
              <BlockName />
              <Variety />
              <StyleLength />
              <State />
              <Station />
              <NewUpdateBlockButton />

              <Divider>
                <small>Components</small>
              </Divider>

              <MapBlocksButtons />
              <Acknowledgements />
            </div>
          </Sider>

          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: "0 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline"
              }}
            >
              <Icon
                style={{ fontSize: breakpoints.xs ? 14 : 16 }}
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />

              {breakpoints.xs ? (
                <h4>Tech Pollen Tube Growth Model by Virginia Tech</h4>
              ) : (
                <h3>Tech Pollen Tube Growth Model by Virginia Tech</h3>
              )}

              {breakpoints.xs ? <h4>NEWA</h4> : <h3>NEWA</h3>}
            </Header>

            <Content style={{ margin: "24px 16px 0", minHeight: "100vh" }}>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum ex
                omnis cumque nisi ducimus eius nobis tempora nihil ut optio
                velit minima nulla adipisci quibusdam tenetur, ad quasi dolores
                obcaecati!
              </div>
            </Content>
          </Layout>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App;

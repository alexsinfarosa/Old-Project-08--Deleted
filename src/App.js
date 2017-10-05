import React, { Component } from "react";
import "./index.css";
import { Layout, Menu, Icon } from "antd";
const { Header, Content, Footer, Sider } = Layout;

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
    return (
      <Layout>
        <Sider
          style={{ background: "#fff" }}
          trigger={null}
          breakpoint="sm"
          width={250}
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            this.setState({ collapsed: collapsed });
          }}
          collapsed={this.state.collapsed}
        >
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <a
              href="https://www.cornell.edu/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8rem",
                color: "#ee2309",
                textDecoration: "inherit"
              }}
            >
              Cornell University
            </a>
          </div>

          <Menu
            style={{ height: "100vh" }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
          >
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>

          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 360,
                borderRadius: "5px"
              }}
            >
              content
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </Layout>
    );
  }
}

export default App;

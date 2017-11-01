import React, { Component } from "react";
import "./index.css";
import { Layout, Menu, Icon } from "antd";

import { Flex, Box, Heading, BlockLink } from "rebass";

import { MenuFold } from "./styles";

const { Content, Footer, Sider } = Layout;

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
          <Flex>
            <Box m="auto" p={1}>
              <BlockLink
                f={[1, 2, 2]}
                style={{ color: "#A42D25" }}
                href="https://www.cornell.edu/"
                children="Cornell University"
              />
            </Box>
          </Flex>

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
          <Flex
            bg="white"
            py={12}
            px={16}
            align="center"
            justify="space-between"
          >
            <Flex align="center">
              <MenuFold
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
              <Heading f={[1, 2, 3]}>Pollen Tube Growth Model</Heading>
            </Flex>

            <Flex>
              <Heading f={[1, 2, 3]}>NEWA</Heading>
            </Flex>
          </Flex>

          <Content style={{ margin: "24px 16px" }}>
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: "20rem",
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

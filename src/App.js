import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./index.css";

import { Flex, Box, BlockLink } from "rebass";

import { MenuFold } from "./styles";

import Subject from "components/Subject";

import { MatchMediaProvider } from "mobx-react-matchmedia";

import { Layout } from "antd";
const { Content, Footer, Sider } = Layout;

@inject("store")
@observer
class App extends Component {
  render() {
    const {
      isSidebarCollapsed,
      toggleSidebar,
      setSidebar,
      breakpoints
    } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout>
          <Sider
            style={{ background: "white", height: "100vh" }}
            trigger={null}
            breakpoint="sm"
            width={250}
            collapsedWidth="0"
            onCollapse={collapsed => {
              setSidebar(collapsed);
            }}
            collapsed={isSidebarCollapsed}
          >
            <Flex py={12} px={16}>
              <Box m="auto">
                <BlockLink
                  f={[1, 2, 2]}
                  style={{ color: "#A42D25" }}
                  href="https://www.cornell.edu/"
                  children="Cornell University"
                />
              </Box>
            </Flex>

            <Flex py={12} px={16}>
              <Subject breakpoints={breakpoints} />
            </Flex>
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
                  type={isSidebarCollapsed ? "menu-unfold" : "menu-fold"}
                  onClick={toggleSidebar}
                />
                <Box f={[1, 2, 2]}>Pollen Tube Growth Model</Box>
              </Flex>

              <Flex>
                <Box f={[1, 2, 2]}>NEWA</Box>
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
      </MatchMediaProvider>
    );
  }
}

export default App;

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";
import { Flex, Box, BlockLink } from "rebass";
import { MenuFold } from "./styles";
import { MatchMediaProvider } from "mobx-react-matchmedia";
import { Layout } from "antd";

import Subject from "components/Subject";
import State from "components/State";
import Station from "components/Station";
import DatePicker from "components/DatePicker";
import ClickMapMessage from "components/ClickMapMessage";
import USMap from "components/USMap";
import PCEtable from "components/PCEtable";
import MapTableButtons from "components/MapTableButtons";

const { Content, Footer, Sider } = Layout;

@inject("store")
@observer
class App extends Component {
  render() {
    const {
      isSidebarCollapsed,
      toggleSidebar,
      setSidebar,
      breakpoints,
      isMap,
      isTable,
      state
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

            <Flex column py={12} px={16}>
              <Subject />
              <State />
              <Station />
              <DatePicker />
              <MapTableButtons />
            </Flex>
          </Sider>

          <Layout style={{ background: "white" }}>
            <Flex
              bg="#4F5D75"
              color="white"
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
              <Flex column>
                <ClickMapMessage state={state} />
                {isMap && <USMap />}
                {isTable && <PCEtable bpxs={breakpoints.xs} />}
              </Flex>
            </Content>

            <Footer style={{ textAlign: "center", background: "white" }} />
          </Layout>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App;

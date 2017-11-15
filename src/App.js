import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";
import { Flex, Box, BlockLink } from "rebass";
import { MenuFold } from "./styles";
import { MatchMediaProvider } from "mobx-react-matchmedia";
import { Layout } from "antd";

import Subject from "components/Subject";
import AvgStyleLength from "components/AvgStyleLength";
import BlockName from "components/BlockName";
import State from "components/State";
import Station from "components/Station";
import DatePicker from "components/DatePicker";
import AddUpdateButton from "components/AddUpdateButton";
import Acknowledgements from "components/Acknowledgements";

// import ClickMapMessage from "components/ClickMapMessage";
// import USMap from "components/USMap";
import UserTable from "components/UserTable";
// import PCEtable from "components/PCEtable";
import ToggleButtons from "components/ToggleButtons";
// import PCEgraph from "components/PCEgraph";

const { Content, Sider } = Layout;

@inject("store")
@observer
class App extends Component {
  render() {
    const {
      isSidebarCollapsed,
      toggleSidebar,
      setSidebar,
      breakpoints,
      isBlocks,
      isEditing,
      firstSprayDate,
      setFirstSprayDate,
      secondSprayDate,
      setSecondSprayDate,
      thirdSprayDate,
      setThirdSprayDate,
      date,
      setDate
    } = this.props.store.app;

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout>
          <Sider
            trigger={null}
            breakpoint="sm"
            width={245}
            collapsedWidth="0"
            style={{
              background: "white",
              padding: "0 16px",
              minHeight: "100vh"
            }}
            onCollapse={collapsed => {
              setSidebar(collapsed);
            }}
            collapsed={isSidebarCollapsed}
          >
            <Box
              style={{
                display: "flex",
                height: "48px",
                justifyContent: "center",
                alignItems: "center"
              }}
              is="h3"
            >
              {isEditing ? "Edit Selected Block" : "Create New Block"}
            </Box>

            <Flex column>
              <Box flex="1 1 auto">
                <Subject />
                <BlockName />
                <AvgStyleLength />
                <State />
                <Station />
                <DatePicker label={"Date"} value={date} setDate={setDate} />
                {isEditing && (
                  <Flex column>
                    <DatePicker
                      label={"First Spray Date"}
                      value={firstSprayDate}
                      setDate={setFirstSprayDate}
                    />
                    <DatePicker
                      label={"Second Spray Date"}
                      value={secondSprayDate}
                      setDate={setSecondSprayDate}
                    />
                    <DatePicker
                      label={"Third Spray Date"}
                      value={thirdSprayDate}
                      setDate={setThirdSprayDate}
                    />
                  </Flex>
                )}
                <AddUpdateButton />

                <Box>
                  <ToggleButtons />
                </Box>

                <Box>
                  <Acknowledgements />
                </Box>
              </Box>
            </Flex>
          </Sider>

          <Layout>
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
              <Flex column style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {isBlocks && <UserTable />}
              </Flex>
            </Content>
          </Layout>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App;

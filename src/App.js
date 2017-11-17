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
      setDate,
      acisData
    } = this.props.store.app;

    acisData.then(res => console.log(res));

    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout>
          <Sider
            trigger={null}
            breakpoint="sm"
            width={245}
            collapsedWidth="0"
            onCollapse={collapsed => {
              setSidebar(collapsed);
            }}
            collapsed={isSidebarCollapsed}
          >
            <Flex column bg="white" style={{ minHeight: "100vh" }} px={2}>
              <Box
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  alignItems: "center",
                  margin: "0 auto"
                }}
              >
                <Box>
                  <BlockLink
                    f={[1, 2, 2]}
                    style={{ color: "#A42D25" }}
                    href="https://www.cornell.edu/"
                    children="Cornell University"
                  />
                </Box>
              </Box>

              <Box
                flex="3 1 auto"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <Box>
                  <Flex column>
                    <Box my={3} m="auto" is="h3">
                      {isEditing ? "Edit Selected Block" : "Create New Block"}
                    </Box>
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
                  </Flex>
                </Box>

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

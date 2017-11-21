import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";

import { MatchMediaProvider } from "mobx-react-matchmedia";

import DropDown from "components/DropDown";
import AvgStyleLength from "components/AvgStyleLength";
import BlockName from "components/BlockName";
import DatePicker from "components/DatePicker";
import AddUpdateButton from "components/AddUpdateButton";
import Acknowledgements from "components/Acknowledgements";

// import ClickMapMessage from "components/ClickMapMessage";
// import USMap from "components/USMap";
import UserData from "components/UserData";
// import PCEtable from "components/PCEtable";
import ToggleButtons from "components/ToggleButtons";
// import PCEgraph from "components/PCEgraph";

import { Row, Col, Layout, Menu, Icon } from "antd";
const { Header, Content, Sider } = Layout;

@inject("store")
@observer
class App2 extends Component {
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
      isEditing,
      firstSprayDate,
      setFirstSprayDate,
      secondSprayDate,
      setSecondSprayDate,
      thirdSprayDate,
      setThirdSprayDate,
      date,
      setDate,
      isBlocks,
      subjects,
      subject,
      setSubject,
      state,
      states,
      setState,
      stations,
      station,
      setStation
    } = this.props.store.app;
    return (
      <MatchMediaProvider breakpoints={breakpoints}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{ background: "white" }}
            width={250}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            collapsedWidth={0}
          >
            <div className="logo">Cornell University</div>

            <Menu style={{ margin: "0 16px", border: "none" }}>
              <DropDown
                list={subjects}
                object={subject}
                setOption={setSubject}
              />
              <BlockName />
              <AvgStyleLength />
              <DropDown list={states} object={state} setOption={setState} />
              <DropDown
                list={stations}
                object={station}
                setOption={setStation}
              />
              <DatePicker label={"Date"} value={date} setDate={setDate} />
              {isEditing && (
                <div>
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
                </div>
              )}

              <AddUpdateButton />
              <ToggleButtons />
              <Acknowledgements />
            </Menu>
          </Sider>

          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Row
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  height: "100%",
                  justifyContent: "space-between"
                }}
              >
                <Col span={1} style={{ minWidth: "50px" }}>
                  <Icon
                    style={{ fontSize: breakpoints.xs ? 14 : 16 }}
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                </Col>
                <Col span={17}>
                  {breakpoints.xs ? (
                    <h3>Pollen Tube Growth Model</h3>
                  ) : (
                    <h2>Pollen Tube Growth Model</h2>
                  )}
                </Col>

                <Col
                  span={6}
                  style={{
                    textAlign: "right",
                    paddingRight: breakpoints.xs ? "48px" : "24px"
                  }}
                >
                  {breakpoints.xs ? <h3>NEWA</h3> : <h2>NEWA</h2>}
                </Col>
              </Row>
            </Header>

            <Content style={{ margin: "24px 16px" }}>
              <Row style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {isBlocks && <UserData />}
              </Row>
            </Content>
          </Layout>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App2;

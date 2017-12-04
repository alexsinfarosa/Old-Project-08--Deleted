import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";
import "./index.css";

import { MatchMediaProvider } from "mobx-react-matchmedia";

import DropDown from "components/DropDown";
import StyleLength from "components/StyleLength";
import BlockName from "components/BlockName";
import DatePicker from "components/DatePicker";
import AddUpdateButton from "components/AddUpdateButton";
import Acknowledgements from "components/Acknowledgements";
import ToggleButtons from "components/ToggleButtons";

import USMap from "components/USMap";
import BlocksDropdown from "components/BlocksDropdown";
import UserData from "components/UserData";

// import logo from "assets/cornell-logo.svg";

import { Row, Col, Layout, Menu, Icon } from "antd";
const { Content, Sider } = Layout;

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
      isEditingBlock,
      firstSprayDate,
      setFirstSprayDate,
      secondSprayDate,
      setSecondSprayDate,
      thirdSprayDate,
      setThirdSprayDate,
      date,
      setDate,
      subjects,
      subject,
      setSubject,
      state,
      states,
      setState,
      station,
      setStation,
      isMap,
      currentStateStations,
      isSelectedBlock,
      setStyleLength,
      isUserData
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
              <BlockName />
              <DropDown
                label={"Variety"}
                list={subjects}
                object={subject}
                setOption={setSubject}
              />
              <StyleLength onChange={setStyleLength} />
              <DropDown
                label={"States"}
                list={states}
                object={state}
                setOption={setState}
              />
              <DropDown
                label={"Station"}
                list={currentStateStations}
                object={station}
                setOption={setStation}
              />
              <DatePicker
                date={date}
                label={"Model Start Date"}
                value={date}
                setDate={setDate}
              />
              {isEditingBlock && (
                <DatePicker
                  date={date}
                  label={"First Spray Date"}
                  value={firstSprayDate}
                  setDate={setFirstSprayDate}
                />
              )}
              {isEditingBlock && (
                <DatePicker
                  date={firstSprayDate}
                  label={"Second Spray Date"}
                  value={secondSprayDate}
                  setDate={setSecondSprayDate}
                />
              )}
              {isEditingBlock && (
                <DatePicker
                  date={secondSprayDate}
                  label={"Third Spray Date"}
                  value={thirdSprayDate}
                  setDate={setThirdSprayDate}
                />
              )}

              <AddUpdateButton />
              <ToggleButtons />
              <Acknowledgements />
            </Menu>
          </Sider>

          <Layout>
            <Row
              type="flex"
              justify="space-between"
              style={{
                background: "white",
                alignItems: "center",
                paddingRight: 16,
                height: 48
              }}
            >
              <Col>
                <Icon
                  style={{ fontSize: breakpoints.xs ? 14 : 18 }}
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
              </Col>
              <Col>
                {breakpoints.xs ? (
                  <h3>VA Tech Pollen Tube Growth Model</h3>
                ) : (
                  <h2>VA Tech Pollen Tube Growth Model</h2>
                )}
              </Col>

              <Col>{breakpoints.xs ? <h3>NEWA</h3> : <h2>NEWA</h2>}</Col>
            </Row>

            <Content style={{ margin: "24px 16px" }}>
              <Row style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {isMap && <USMap />}
                {isUserData && (
                  <div>
                    <BlocksDropdown />
                    {isSelectedBlock && <UserData />}
                  </div>
                )}
              </Row>
            </Content>
          </Layout>
        </Layout>
      </MatchMediaProvider>
    );
  }
}

export default App;

import { observable, action, when, computed } from "mobx";
import axios from "axios";
// import { toJS } from "mobx";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";
import getYear from "date-fns/get_year";

// utils
import { fetchACISData } from "fetchACISData";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.subjects.length === 0, () => this.loadSubjects());
    when(() => this.states.length === 0, () => this.loadStates());
    when(() => this.stations.length === 0, () => this.loadStations());
    // when(() => this.gridData.length === 0, () => this.loadGridData());
  }

  // Logic -----------------------------------------------------------
  @observable
  breakpoints = {
    xs: "(max-width: 767px)",
    su: "(min-width: 768px)",
    sm: "(min-width: 768px) and (max-width: 991px)",
    md: "(min-width: 992px) and (max-width: 1199px)",
    mu: "(min-width: 992px)",
    lg: "(min-width: 1200px)"
  };

  @observable protocol = window.location.protocol;
  @observable isLoading = false;

  @computed
  get areRequiredFieldsSet() {
    return (
      this.blockName.length >= 3 &&
      Object.keys(this.subject).length !== 0 &&
      this.styleLength !== null &&
      Object.keys(this.station).length !== 0
    );
  }

  // Sidebar ---------------------------------------------------------
  @observable isSidebarCollapsed = false;
  @action setSidebar = d => (this.isSidebarCollapsed = d);
  @action
  toggleSidebar = () => (this.isSidebarCollapsed = !this.isSidebarCollapsed);

  //   Map ----------------------------------------------------------------
  @observable
  isMap = JSON.parse(localStorage.getItem("state")) === null ? true : false;
  @action setIsMap = d => (this.isMap = d);
  // @computed
  // get viewMap() {
  //   return this.isMap ? true : this.station.name === undefined ? true : false;
  // }
  @action toggleMap = () => (this.isMap = !this.isMap);

  //   Modal ---------------------------------------------------------------
  @observable isModal = false;
  @action showModal = () => (this.isModal = true);
  @action hideModal = () => (this.isModal = false);

  // BlockName ----------------------------------------------------------------
  @observable blockName = "";
  @action setBlockName = d => (this.blockName = d);

  // Subject ------------------------------------------------------------------
  @observable subjects = [];
  @action updateSubjects = d => (this.subjects = d);

  @action
  loadSubjects() {
    this.isLoading = true;
    this.fetch("species.json")
      .then(json => {
        this.updateSubjects(json);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load subjects", err);
      });
  }

  @observable subject = {};

  @action
  setSubject = name => {
    this.subject = this.subjects.find(subject => subject.name === name);
    localStorage.setItem(`pollenTubeVariety`, JSON.stringify(this.subject));
  };

  // Style Length -----------------------------------------------------
  @observable styleLengths = [];
  @action setStyleLengths = d => (this.styleLengths = d);
  @observable styleLength = null;
  @action setStyleLength = d => (this.styleLength = d);

  @computed
  get avgStyleLength() {
    if (this.styleLengths.length !== 0) {
      return (
        this.styleLengths
          .map(obj => obj.styleLength)
          .reduce((p, c) => p + c, 0) / this.styleLengths.length
      );
    }
  }

  @action
  addStyleLength = () => {
    const styleLengthObj = {
      idx: this.styleLengths.length + 1,
      styleLength: this.styleLength,
      isEdit: false
    };
    this.styleLengths.push(styleLengthObj);
  };

  // States -------------------------------------------------------------------
  @observable states = [];
  @action updateStates = d => (this.states = d);

  @action
  loadStates() {
    this.isLoading = true;
    this.fetch("states.json")
      .then(json => {
        this.updateStates(json);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load states", err);
      });
  }

  @observable
  state = JSON.parse(localStorage.getItem("state")) || {
    postalCode: "ALL",
    lat: 42.5,
    lon: -75.7,
    zoom: 6,
    name: "All States"
  };

  @action
  setState = name => {
    this.station = {};
    const state = this.states.find(state => state.name === name);
    this.state = state;
    this.setIsMap(true);
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  @action
  setStateFromMap = state => {
    this.state = state;
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  // Stations -----------------------------------------------------------------
  @observable stations = [];
  @action updateStations = d => (this.stations = d);

  @action
  loadStations() {
    this.isLoading = true;
    return axios
      .get(
        `${this.protocol}//newa2.nrcc.cornell.edu/newaUtil/stateStationList/all`
      )
      .then(res => {
        // console.log(res.data.stations);
        this.updateStations(res.data.stations);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load stations", err);
      });
  }

  @computed
  get currentStateStations() {
    if (this.state.name === "All States") {
      return this.stations;
    }

    return this.stations.filter(
      station => station.state === this.state.postalCode
    );
  }

  @observable station = JSON.parse(localStorage.getItem("station")) || {};

  @action
  setStation = id => {
    const station = this.stations.find(station => station.id === id);
    const state = this.states.find(state => state.postalCode === station.state);
    this.station = station;
    this.setStateFromMap(state);
    this.setIsMap(false);
    localStorage.setItem("station", JSON.stringify(this.station));
  };

  // Dates---------------------------------------------------------------------
  @observable date;
  @action setDate = d => (this.date = d);
  @computed
  get currentYear() {
    if (this.date) {
      return format(this.date, "YYYY");
    }
    return getYear(new Date());
  }

  @computed
  get seasonStartDate() {
    if (this.date) {
      return `${this.currentYear}-03-01`;
    }
  }

  @computed
  get seasonEndDate() {
    if (this.date) {
      return `${this.currentYear}-07-30`;
    }
  }

  @computed
  get isSeason() {
    if (this.date) {
      return (
        isAfter(this.date, this.seasonStartDate) &&
        isBefore(this.date, this.seasonEndDate)
      );
    }
  }
  @observable firstSprayDate;
  @action setFirstSprayDate = d => (this.firstSprayDate = d);
  @observable secondSprayDate;
  @action setSecondSprayDate = d => (this.secondSprayDate = d);
  @observable thirdSprayDate;
  @action setThirdSprayDate = d => (this.thirdSprayDate = d);

  // User Data (Table of blocks) ------------------------------------------------
  @observable isUserData = true;
  @action toggleUserData = d => (this.isUserData = !this.isUserData);

  @observable
  blocks = JSON.parse(localStorage.getItem("pollenTubeBlocks")) || [];
  @action setBlocks = d => (this.blocks = d);
  @observable block = {};
  @action
  setBlock = id => {
    this.block = this.blocks.find(block => block.id === id);
  };

  @computed
  get isBlockSelected() {
    return Object.keys(this.block).length !== 0;
  }

  @action
  resetFields = () => {
    this.setBlockName("");
    this.subject = {};
    this.setStyleLength(null);
    this.setStyleLengths([]);
    this.setDate(undefined);
    this.setFirstSprayDate(undefined);
    this.setSecondSprayDate(undefined);
    this.setThirdSprayDate(undefined);
  };

  @action
  addBlock = d => {
    this.addStyleLength();

    this.block = {
      id: Math.random().toString(),
      name: `${this.blockName}`,
      variety: this.subject,
      styleLengths: this.styleLengths,
      avgStyleLength: this.avgStyleLength,
      state: this.state,
      station: this.station,
      date: this.date,
      firstSpray: this.firstSprayDate,
      secondSpray: this.secondSprayDate,
      thirdSpray: this.thirdSprayDate,
      isEdit: false
    };
    this.blocks.push(this.block);
    this.resetFields();
    localStorage.setItem("pollenTubeBlocks", JSON.stringify(this.blocks));
  };

  @action
  deleteBlock = (record, index) => {
    this.blocks.splice(index, 1);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.resetFields();
    this.block = {};
  };

  @computed
  get isEditingBlock() {
    if (Object.keys(this.block).length !== 0) {
      return this.block.isEdit;
    }
  }

  @action
  editBlock = block => {
    this.block = block;
    this.setBlockName(`${block.name}`);
    this.setSubject(block.variety.name);
    this.setStyleLength(block.avgStyleLength);
    this.setState(block.state.name);
    this.setStation(block.station.id);
    this.setDate(block.date);
    this.setFirstSprayDate(block.firstSprayDate);
    this.setSecondSprayDate(block.secondSprayDate);
    this.setThirdSprayDate(block.thirdSprayDate);
    this.block["isEdit"] = true;
  };

  @action
  updateBlock = () => {
    this.addStyleLength();

    this.block["name"] = this.blockName;
    this.block["variety"] = this.subject;
    this.block["avgStyleLength"] = this.avgStyleLength;
    this.block["state"] = this.state;
    this.block["station"] = this.station;
    this.block["date"] = this.date;
    this.block["firstSpray"] = this.firstSprayDate;
    this.block["secondSpray"] = this.secondSprayDate;
    this.block["thirdSpray"] = this.thirdSprayDate;
    this.block["isEdit"] = false;

    const idx = this.blocks.findIndex(b => b.id === this.block.id);
    this.blocks.splice(idx, 1, this.block);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.resetFields();
  };

  @action
  cancelBlock = () => {
    this.block.isEdit = false;
    this.resetFields();
  };

  // Hourly station data ------------------------------------------------------
  // @action
  // degreeDay = (day, base = 48.2) => {
  //   return day[1] - base > 0 ? Math.round(day[1] - base) : 0;
  // };

  @computed
  get acisData() {
    return this.areRequiredFieldsSet
      ? fetchACISData(this.station, this.date).then(res => {
          return res;
        })
      : [];
  }
}

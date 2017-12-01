import { observable, action, when, computed } from "mobx";
import axios from "axios";
// import { toJS } from "mobx";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";

// utils
import { fetchACISData } from "fetchACISData";
import { delay } from "utils";

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
      this.blockName.length >= 2 &&
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
  @computed
  get viewMap() {
    return this.isMap ? true : this.station.name === undefined ? true : false;
  }
  @action toggleMap = () => (this.isMap = !this.isMap);

  //   Modal ---------------------------------------------------------------
  @observable isModal = false;
  @action
  showModal = () => {
    this.isModal = true;
  };
  @action hideModal = () => (this.isModal = false);

  // BlockName ----------------------------------------------------------------
  @observable blockName = "";
  @action
  setBlockName = d => {
    this.blockName = d;
  };

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
  @observable styleLength = null;
  @action
  setStyleLength = d => {
    this.styleLength = d;
  };

  @computed
  get avgStyleLength() {
    if (Object.keys(this.selectedBlock).length !== 0) {
      console.log("selected block is not empty");
      return (
        this.selectedBlock.styleLengths
          .map(val => val.styleLength)
          .reduce((p, c) => p + c, 0) / this.selectedBlock.styleLengths.length
      );
    }
    console.log("selected block is emtpy");
    return this.styleLength;
  }

  @observable styleLengths = [];
  @action setStyleLengths = d => (this.styleLengths = d);
  @action clearStyleLengths = () => (this.styleLengths = []);
  @action
  addStyleLength = () => {
    let block = { ...this.selectedBlock };
    block.styleLengths.push({
      idx: block.styleLengths.length + 1,
      date: Date.now(),
      styleLength: this.styleLength,
      isEdit: false
    });
    block["avgStyleLength"] = this.avgStyleLength;
    const idx = this.blocks.findIndex(b => b.id === block.id);
    this.blocks.splice(idx, 1, block);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.resetFields();

    this.disableIsStyleLength(false);
    this.setSelectedBlock(block.id);
    delay(1300).then(res => this.hideModal(res));
  };

  @action
  editStyleLength = record => {
    this.selectedBlock.isEditing = true;
    this.selectedBlock.styleLengths.map(obj => {
      if (obj.date === record.date) {
        return (obj.isEdit = true);
      }
      return (obj.isEdit = false);
    });
    this.setStyleLength(record.styleLength);
  };

  @action
  updateStyleLength = () => {
    const length = this.selectedBlock.styleLengths.filter(
      l => l.isEdit === true
    )[0];
    const idx = this.selectedBlock.styleLengths.findIndex(
      l => l.date === length.date
    );
    this.selectedBlock.styleLengths[idx].styleLength = this.styleLength;
    const blockIdx = this.blocks.findIndex(b => b.id === this.selectedBlock.id);
    this.selectedBlock.isEditing = false;
    this.selectedBlock.styleLengths[idx].isEdit = false;
    this.blocks.splice(blockIdx, 1, this.selectedBlock);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.resetFields();
    this.setSelectedBlock(this.selectedBlock.id);
    delay(1300).then(res => this.hideModal(res));
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
  setState = d => {
    this.station = {};
    const obj = this.states.find(state => state.name === d);
    this.state = { ...obj };
    this.setIsMap(true);
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  @action
  setStateFromMap = d => {
    this.state = this.states.find(state => state.postalCode === d);
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
    const obj = this.stations.find(station => station.id === id);
    this.station = { ...this.station, ...obj };
    const state = this.states.find(
      state => state.postalCode === this.station.state
    );
    this.setStateFromMap(state.postalCode);
    this.setIsMap(false);
    localStorage.setItem("station", JSON.stringify(this.station));
  };

  // Dates---------------------------------------------------------------------
  @observable date = new Date();
  @action setDate = d => (this.date = d);
  @computed
  get currentYear() {
    return format(this.date, "YYYY");
  }

  @computed
  get seasonStartDate() {
    return `${this.currentYear}-03-01`;
  }

  @computed
  get seasonEndDate() {
    return `${this.currentYear}-07-30`;
  }

  @computed
  get isSeason() {
    return (
      isAfter(this.date, this.seasonStartDate) &&
      isBefore(this.date, this.seasonEndDate)
    );
  }
  @observable firstSprayDate = "";
  @action setFirstSprayDate = d => (this.firstSprayDate = d);
  @observable secondSprayDate = "";
  @action setSecondSprayDate = d => (this.secondSprayDate = d);
  @observable thirdSprayDate = "";
  @action setThirdSprayDate = d => (this.thirdSprayDate = d);

  // User Data (Table of blocks) ------------------------------------------------
  @observable
  blocks = JSON.parse(localStorage.getItem("pollenTubeBlocks")) || [];

  @action setBlocks = d => (this.blocks = d);

  @observable selectedBlock = {};

  @action clearSelectedBlock = () => (this.selectedBlock = {});

  @action
  setSelectedBlock = id => {
    this.selectedBlock = this.blocks.find(block => block.id === id);
  };

  @computed
  get isSelectedBlock() {
    if (this.selectedBlock) {
      if (Object.keys(this.selectedBlock).length !== 0) {
        return true;
      }
      return false;
    }
  }

  resetFields = () => {
    this.setBlockName("");
    this.subject = {};
    this.clearSelectedBlock();
    this.setStyleLength(null);
    this.clearStyleLengths();
    this.setDate(new Date());
    this.setFirstSprayDate("");
    this.setSecondSprayDate("");
    this.setThirdSprayDate("");
  };

  @action
  addBlock = () => {
    const obj = {
      idx: 1,
      date: Date.now(),
      styleLength: this.styleLength
    };
    this.styleLengths.push(obj);
    const block = {
      id: Math.random().toString(),
      name: this.blockName,
      variety: this.subject,
      styleLengths: this.styleLengths,
      avgStyleLength: this.avgStyleLength,
      state: this.state,
      station: this.station,
      date: this.date,
      firstSpray: this.firstSprayDate,
      secondSpray: this.secondSprayDate,
      thirdSpray: this.thirdSprayDate,
      isEditing: false
    };
    this.blocks.push(block);
    localStorage.setItem("pollenTubeBlocks", JSON.stringify(this.blocks));
    this.resetFields();
  };

  @action
  deleteBlock = index => {
    let blocks = [...this.blocks];
    blocks.splice(index, 1);
    this.setBlocks(blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(blocks));
    this.resetFields();
  };

  @observable isEditing = false;

  @observable isStyleLength = false;
  @action disableIsStyleLength = d => (this.isStyleLength = d);

  @action
  editBlock = obj => {
    this.isEditing = true;
    this.disableIsStyleLength(true);
    this.selectedBlock = obj;
    const block = { ...this.selectedBlock };
    block["isEditing"] = true;
    this.setStyleLength(this.avgStyleLength);
    this.setSubject(block.variety.name);
    this.setBlockName(block.name);
    this.setState(block.state);
    this.setStation(block.station.id);
    this.setDate(block.date);
    this.setFirstSprayDate(block.firstSpray);
    this.setSecondSprayDate(block.secondSpray);
    this.setThirdSprayDate(block.thirdSpray);
  };

  @action
  updateBlock = () => {
    let block = { ...this.selectedBlock };
    block["name"] = this.blockName;
    block["variety"] = this.subject;
    block["styleLengths"] = this.styleLengths;
    block["avgStyleLength"] = this.avgStyleLength;
    block["state"] = this.state;
    block["station"] = this.station;
    block["date"] = this.date;
    block["firstSpray"] = this.firstSprayDate;
    block["secondSpray"] = this.secondSprayDate;
    block["thirdSpray"] = this.thirdSprayDate;
    block["isEditing"] = false;

    const idx = this.blocks.findIndex(b => b.id === block.id);
    this.blocks.splice(idx, 1, block);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.resetFields();
    this.isEditing = false;
    this.disableIsStyleLength(false);
    this.setSelectedBlock(block.id);
  };

  @action
  cancelBlock = () => {
    this.resetFields();
    this.disableIsStyleLength(false);
    this.isEditing = false;
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

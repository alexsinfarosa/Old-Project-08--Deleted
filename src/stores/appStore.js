import { observable, action, when, computed } from "mobx";
import axios from "axios";

import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";

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
      this.blockName.length >= 2 &&
      Object.keys(this.subject).length !== 0 &&
      this.avgStyleLength !== null &&
      Object.keys(this.station).length !== 0
    );
  }

  @observable isSidebarCollapsed = false;
  @action setSidebar = d => (this.isSidebarCollapsed = d);
  @action
  toggleSidebar = () => (this.isSidebarCollapsed = !this.isSidebarCollapsed);

  @observable
  isMap = JSON.parse(localStorage.getItem("state")) === null ? true : false;
  @action setIsMap = d => (this.isMap = d);
  @computed
  get viewMap() {
    return this.isMap ? true : this.station.name === undefined ? true : false;
  }
  @action toggleMap = () => (this.isMap = !this.isMap);

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
  setSubject = d => {
    const obj = this.subjects.find(subject => subject.name === d);
    this.subject = { ...obj };
    localStorage.setItem(`pollenTubeVariety`, JSON.stringify(this.subject));
  };

  // Average Style Length -----------------------------------------------------
  @observable avgStyleLength = null;
  @action
  setAvgStyleLength = d => {
    this.avgStyleLength = d;
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

  // Load Grid Data ------------------------------------------------------------
  // @observable gridData = [];
  // @action updateGridData = d => (this.gridData = d);

  // @action
  // loadGridData = (sdate = this.date, edate = this.date) => {
  //   if (this.areRequiredFieldsSet) {
  //     this.isLoading = true;

  //     let loc = "-75.7,42.5";
  //     if (this.state.name !== "All States") {
  //       loc = `${this.station.lon},${this.station.lat}`;
  //     }

  //     const params = {
  //       loc: loc,
  //       sdate: format(sdate, "YYYY-MM-DD"),
  //       edate: format(edate, "YYYY-MM-DD"),
  //       grid: 3,
  //       elems: [{ name: "avgt" }]
  //     };

  //     // console.log(params);

  //     return axios
  //       .post(`${this.protocol}//grid.rcc-acis.org/GridData`, params)
  //       .then(res => {
  //         // console.log(res.data.data);
  //         this.updateGridData(res.data.data);
  //         this.isLoading = false;
  //       })
  //       .catch(err => {
  //         console.log("Failed to load grid data", err);
  //       });
  //   }
  //   return [];
  // };

  // User Data (Table of blocks) ------------------------------------------------
  @observable
  blocks = JSON.parse(localStorage.getItem("pollenTubeBlocks")) || [];
  @action setBlocks = d => (this.blocks = d);

  @observable selectedBlock = {};
  @computed
  get getBlock() {
    if (Object.keys(this.selectedBlock).length === 0) {
      return {};
    }
    return this.blocks.find(block => block.id === this.selectedBlock.id);
  }
  @computed
  get isSelectedBlock() {
    if (Object.keys(this.selectedBlock).length !== 0) {
      return true;
    }
    return false;
  }
  @action
  setSelectedBlock = d => {
    const obj = this.blocks.find(block => block.name === d);
    this.selectedBlock = obj;
  };
  @action
  clearSelectedBlock = () => {
    this.selectedBlock = {};
  };

  @observable blockId = "";
  @action setBlockId = d => (this.blockId = d);

  @computed
  get block() {
    return {
      id: this.blockId,
      variety: this.subject.name,
      name: this.blockName,
      avgStyleLength: this.avgStyleLength,
      state: this.state.postalCode,
      station: this.station.id,
      date: this.date,
      firstSpray: this.firstSprayDate,
      secondSpray: this.secondSprayDate,
      thirdSpray: this.thirdSprayDate,
      isEditing: false,
      data: []
    };
  }

  resetFields = () => {
    this.setBlockId("");
    this.subject = {};
    this.setBlockName("");
    this.setAvgStyleLength("");
    this.setDate(new Date());
    this.setFirstSprayDate("");
    this.setSecondSprayDate("");
    this.setThirdSprayDate("");
    this.blocks.map(b => (b.isEditing = false));
  };

  convertDateToHourlyDate = res => {
    let data = [];
    let obj = {};
    res.forEach(day => {
      day[1].forEach((hour, i) => {
        obj[`${day[0]} ${i + 1}:00`] = hour;
      });
      data.push(obj);
    });
    return data;
  };

  @action
  addBlock = async () => {
    this.isLoading = true;
    this.blockId = Math.random().toString();

    const block = { ...this.block };
    await fetchACISData(this.station, this.date).then(res => {
      this.convertDateToHourlyDate(res);
    });
    this.blocks.push(block);
    localStorage.setItem("pollenTubeBlocks", JSON.stringify(this.blocks));
    this.resetFields();
    this.isLoading = false;
  };

  @action
  deleteBlock = (block, index) => {
    this.clearSelectedBlock();
    this.blocks.splice(index, 1);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
  };

  @observable isEditing = false;

  @action
  editBlock = (b, index) => {
    this.isEditing = true;
    this.blocks.map(b => (b.isEditing = false));
    this.blocks[index].isEditing = true;
    this.setBlockId(b.id);
    this.setSubject(b.variety);
    this.setBlockName(b.name);
    this.setAvgStyleLength(b.avgStyleLength);
    this.setState(b.state);
    this.setStation(b.station);
    this.setDate(b.date);
    this.setFirstSprayDate(b.firstSpray);
    this.setSecondSprayDate(b.secondSpray);
    this.setThirdSprayDate(b.thirdSpray);
  };

  @action
  updateBlock = () => {
    const idx = this.blocks.findIndex(b => b.id === this.blockId);
    this.blocks.splice(idx, 1, this.block);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.resetFields();
    this.isEditing = false;
  };

  @action
  cancelBlock = () => {
    this.resetFields();
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

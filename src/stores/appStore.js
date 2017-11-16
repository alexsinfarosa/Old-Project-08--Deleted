import { observable, action, when, computed } from "mobx";
import axios from "axios";
import format from "date-fns/format";

import Block from "stores/Block";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.subjects.length === 0, () => this.loadSubjects());
    when(() => this.states.length === 0, () => this.loadStates());
    when(() => this.stations.length === 0, () => this.loadStations());
    when(() => this.gridData.length === 0, () => this.loadGridData());
  }

  // Logic ------------------------------------------------------------------
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
      Object.keys(this.subject).length !== 0 &&
      Object.keys(this.blockName).length !== 0 &&
      this.avgStyleLength !== null &&
      Object.keys(this.state).length !== 0 &&
      Object.keys(this.station).length !== 0
    );
  }

  @observable isMobile = window.matchMedia("(max-width: 480px)").matches; // FIX IT
  @action
  closeSidebar = () => {
    if (this.areRequiredFieldsSet && this.isMobile) {
      this.toggleSidebar();
    }
  };

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

  @observable
  isBlocks = JSON.parse(localStorage.getItem("pollenTubeBlocks")) === null
    ? false
    : true;
  @computed
  @action
  toggleBlocks = d => (this.isBlocks = !this.isBlocks);

  // Block ------------------------------------------------------------------
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
    this.subject = this.subjects.find(subject => subject.name === d);
    // localStorage.setItem(`pollenTubeVariety`, JSON.stringify(this.subject));
  };

  // Average Style Length -----------------------------------------------------
  @observable avgStyleLength;
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
    this.state = this.states.find(state => state.name === d);
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
    return this.stations.filter(
      station => station.state === this.state.postalCode
    );
  }

  @observable station = JSON.parse(localStorage.getItem("station")) || {};
  @action
  setStation = d => {
    this.station = this.stations.find(station => station.name === d);

    localStorage.setItem("station", JSON.stringify(this.station));
  };

  // Dates---------------------------------------------------------------------
  @observable date = new Date();
  @action setDate = d => (this.date = d);
  @observable firstSprayDate = "";
  @action setFirstSprayDate = d => (this.firstSprayDate = d);
  @observable secondSprayDate = "";
  @action setSecondSprayDate = d => (this.secondSprayDate = d);
  @observable thirdSprayDate = "";
  @action setThirdSprayDate = d => (this.thirdSprayDate = d);

  // Load Grid Data --------------------------------------------------------------
  @observable gridData = [];
  @action updateGridData = d => (this.gridData = d);

  @action
  loadGridData = (sdate = this.date, edate = this.date) => {
    if (this.areRequiredFieldsSet) {
      this.isLoading = true;

      let loc = "-75.7,42.5";
      if (this.state.name !== "All States") {
        loc = `${this.station.lon},${this.station.lat}`;
      }

      const params = {
        loc: loc,
        sdate: format(sdate, "YYYY-MM-DD"),
        edate: format(edate, "YYYY-MM-DD"),
        grid: 3,
        elems: [{ name: "avgt" }]
      };

      // console.log(params);

      return axios
        .post(`${this.protocol}//grid.rcc-acis.org/GridData`, params)
        .then(res => {
          // console.log(res.data.data);
          this.updateGridData(res.data.data);
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Failed to load grid data", err);
        });
    }
    return [];
  };

  // Current Model ----------------------------------------------------------------
  // @action
  // degreeDay = (day, base = 48.2) => {
  //   return day[1] - base > 0 ? Math.round(day[1] - base) : 0;
  // };

  @observable
  blocks = JSON.parse(localStorage.getItem("pollenTubeBlocks")) || [];
  @action setBlocks = d => (this.blocks = d);

  @action
  addBlock = () => {
    const block = {
      id: Math.random(),
      variety: this.subject.name,
      name: this.blockName,
      avgStyleLength: this.avgStyleLength,
      state: this.state.name,
      station: this.station.name,
      date: this.date,
      firstSpray: this.firstSprayDate,
      secondSpray: this.secondSprayDate,
      thirdSpray: this.thirdSprayDate
    };

    this.blocks.push(new Block(block));
    localStorage.setItem("pollenTubeBlocks", JSON.stringify(this.blocks));
    this.subject = {};
    this.setBlockName("");
    this.setAvgStyleLength("");
    this.setDate(new Date());
  };

  @action
  deleteBlock = block => {
    this.blocks.splice(block.index, 1);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
  };

  @observable isEditing = false;

  @action
  editBlock = block => {
    this.blockId = block.id;
    this.setSubject(block.variety);
    this.setBlockName(block.name);
    this.setAvgStyleLength(block.avgStyleLength);
    this.setState(block.state);
    this.setStation(block.station);
    this.setDate(block.date);
    this.setFirstSprayDate(block.firstSpray);
    this.setSecondSprayDate(block.secondSpray);
    this.setThirdSprayDate(block.thirdSpray);
    this.isEditing = true;
  };

  @observable blockId;
  @action
  updateBlock = () => {
    const block = {
      id: this.blockId,
      variety: this.subject.name,
      name: this.blockName,
      avgStyleLength: this.avgStyleLength,
      state: this.state.name,
      station: this.station.name,
      date: this.date,
      firstSpray: this.firstSprayDate,
      secondSpray: this.secondSprayDate,
      thirdSpray: this.thirdSprayDate
    };

    const idx = this.blocks.findIndex(b => b.id === block.id);

    this.blocks.splice(idx, 1, new Block(block));
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    this.subject = {};
    this.setBlockName("");
    this.setAvgStyleLength("");
    this.isEditing = false;
  };
}

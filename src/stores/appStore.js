import { observable, action, when, computed } from "mobx";
import axios from "axios";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";

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
  isMap = JSON.parse(localStorage.getItem("state")) !== null ? false : true;
  @action
  setIsMap = d => {
    if (this.areRequiredFieldsSet) {
      this.isMap = d;
    } else {
      this.isMap = true;
    }
  };
  @action toggleMap = d => (this.isMap = !this.isMap);

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

  @observable subject = JSON.parse(localStorage.getItem("subject")) || {};

  @action
  setSubject = d => {
    this.subject = this.subjects.find(subject => subject.name === d);
    localStorage.setItem(`subject`, JSON.stringify(this.subject));
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
  @observable endDate = format(new Date(), "YYYY-MM-DD");
  @action setEndDate = d => (this.endDate = format(d, "YYYY-MM-DD"));
  @computed
  get currentYear() {
    return format(this.endDate, "YYYY");
  }
  @computed
  get startDate() {
    return `${this.currentYear}-03-01`;
  }
  @computed
  get isSeason() {
    return (
      isAfter(this.endDate, this.startDate) &&
      isBefore(this.endDate, `${this.currentYear}-09-30`)
    );
  }

  // Load Grid Data --------------------------------------------------------------
  @observable gridData = [];
  @action updateGridData = d => (this.gridData = d);

  @action
  loadGridData = () => {
    if (this.areRequiredFieldsSet) {
      this.isLoading = true;

      let loc = "-75.7,42.5";
      if (this.state.name !== "All States") {
        loc = `${this.station.lon},${this.station.lat}`;
      }

      const params = {
        loc: loc,
        sdate: this.startDate,
        edate: this.endDate,
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
}

import { observable, action, when, computed } from "mobx";
import axios from "axios";
// import { toJS } from "mobx";

export default class AppStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.subjects.length === 0, () => this.loadSubjects());
    when(() => this.states.length === 0, () => this.loadStates());
    when(() => this.stations.length === 0, () => this.loadStations());
  }

  // Logic -----------------------------------------------------------
  @observable
  breakpoints = {
    xs: "(max-width: 575px)",
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
    xxl: "(min-width: 1600px)"
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

  //   Map ---------------------------------------------------------
  @observable
  isMap = JSON.parse(localStorage.getItem("state")) === null ? true : false;
  @action setIsMap = d => (this.isMap = d);
  @action toggleMap = () => (this.isMap = !this.isMap);

  //   Modals ------------------------------------------------------
  @observable isBlockModal = false;
  @action showBlockModal = () => (this.isBlockModal = true);
  @action hideBlockModal = () => (this.isBlockModal = false);

  @observable isStyleLengthModal = false;
  @action showStyleLengthModal = () => (this.isStyleLengthModal = true);
  @action hideStyleLengthModal = () => (this.isStyleLengthModal = false);

  @observable isStartDateModalOpen = false;
  @action showStartDateModal = id => (this.isStartDateModalOpen = true);
  @action hideStartDateModal = () => (this.isStartDateModalOpen = false);

  // Radio button values
  @observable radioValue = null;
  @action setRadioValue = d => (this.radioValue = d);

  // Subject -----------------------------------------------------------
  @observable subjects = [];
  @action updateSubjects = d => (this.subjects = d);

  @action
  loadSubjects() {
    this.isLoading = true;
    this.fetch("growthRates.json")
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

  // States ------------------------------------------------------------
  @observable states = [];
  @action updateStates = d => (this.states = d);

  @action
  loadStates() {
    this.isLoading = true;
    this.fetch("states.json")
      .then(json => {
        // console.log(json);
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

  // Stations ----------------------------------------------------------
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
}

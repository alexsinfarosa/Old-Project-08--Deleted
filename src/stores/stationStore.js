import axios from "axios";
import { observable, action, when, computed } from "mobx";
// import { toJS } from "mobx";
const fetcher = url => window.fetch(url).then(response => response.json());

class StationStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.stations.size === 0, () => this.loadStations());
  }

  @observable isLoading = false;
  @observable stations = new Map();

  @action
  updateStations = json =>
    json.forEach(blockJson =>
      this.stations.set(`${blockJson.id} ${blockJson.network}`, blockJson)
    );

  @action
  loadStations() {
    this.isLoading = true;
    return axios
      .get(
        `${
          window.location.protocol
        }//newa2.nrcc.cornell.edu/newaUtil/stateStationList/all`
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

export default new StationStore(fetcher);

import { observable, action, when } from "mobx";
// import { toJS } from "mobx";
const fetcher = url => window.fetch(url).then(response => response.json());

class StateStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.states.size === 0, () => this.loadStates());
  }

  @observable isLoading = false;
  @observable states = new Map();

  @action
  updateStates = json =>
    json.forEach(blockJson => this.states.set(blockJson.postalCode, blockJson));

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
  state = JSON.parse(localStorage.getItem("state")) || this.states.get("ALL");

  @action
  setState = name => {
    this.state = this.states.find(state => state.name === name);
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  @action
  setStateFromMap = state => {
    this.state = state;
    localStorage.setItem("state", JSON.stringify(this.state));
  };
}

export default new StateStore(fetcher);

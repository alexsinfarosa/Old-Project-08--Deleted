import React, { Component } from "react";
import { observable, action, when, computed } from "mobx";
import { toJS } from "mobx";
const fetcher = url => window.fetch(url).then(response => response.json());

class StatesStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.states.size === 0, () => this.loadStates());
  }

  @observable states = new Map();

  @observable isLoading = false;

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
}

export default new StatesStore(fetcher);

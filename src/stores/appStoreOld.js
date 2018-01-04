import { observable, action, when, computed } from "mobx";

import axios from "axios";
// import { toJS } from "mobx";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";
import getYear from "date-fns/get_year";
import getHours from "date-fns/get_hours";

import { message } from "antd";

// utils
import { fetchACISData } from "fetchACISData";

export default class appStore {
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
      this.blockName.length >= 3 &&
      Object.keys(this.subject).length !== 0 &&
      Object.keys(this.state).length !== 0 &&
      Object.keys(this.station).length !== 0
    );
  }

  //   Map ----------------------------------------------------------------
  @observable
  isMap = JSON.parse(localStorage.getItem("state")) === null ? true : false;
  @action setIsMap = d => (this.isMap = d);
  @action toggleMap = () => (this.isMap = !this.isMap);

  //   Modals ---------------------------------------------------------------
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

  // BlockName ----------------------------------------------------------------
  @observable blockName = "";
  @action setBlockName = d => (this.blockName = d);

  // Subject ------------------------------------------------------------------
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
  addAvgStyleLength = () => {
    let highiestIdx = 0;
    if (this.styleLengths.length !== 0) {
      const tempArr = this.styleLengths.map(obj => obj.idx);
      highiestIdx = Math.max(...tempArr);
    }

    const styleLengthObj = {
      idx: highiestIdx + 1,
      styleLength: this.styleLength,
      isEdit: false
    };

    this.styleLengths.push(styleLengthObj);
    this.updateBlock();
  };

  @action
  addOneStyleLength = () => {
    let highiestIdx = 0;
    if (this.styleLengths.length !== 0) {
      const tempArr = this.styleLengths.map(obj => obj.idx);
      highiestIdx = Math.max(...tempArr);
    }

    const styleLengthObj = {
      id: Math.random(),
      idx: highiestIdx + 1,
      styleLength: this.styleLength,
      isEdit: false
    };
    this.styleLengths.push(styleLengthObj);
    this.styleLength = null;
  };

  @action
  removeStyleLength = (record, idx) => {
    const below = this.styleLengths.slice(0, idx);
    const above = this.styleLengths.slice(idx + 1);
    above.map(obj => (obj.idx = obj.idx - 1));
    const newArr = [...below, ...above];
    this.setStyleLengths(newArr);
  };

  @computed
  get isStyleLengthEdited() {
    return this.styleLengths.some(obj => obj.isEdit);
  }

  @action
  editStyleLength = (record, idx) => {
    this.setStyleLength(record.styleLength);
    this.styleLengths[idx].isEdit = true;
  };

  @action
  updateOneStyleLength = () => {
    const obj = this.styleLengths.find(
      styleLength => styleLength.isEdit === true
    );
    obj.styleLength = this.styleLength;
    obj.isEdit = false;

    const idx = this.styleLengths.findIndex(d => d.id === obj.id);
    this.styleLengths.splice(idx, 1, obj);
    this.setStyleLengths(this.styleLengths);
    this.styleLength = null;
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
      return `${this.currentYear}-07-01`;
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

  @computed
  get resetDate() {
    if (this.dateRange.length > 1) {
      return this.dateRange[this.dateRange.length - 2].date;
    }
    return this.date;
  }

  @observable firstSprayDate;
  @action setFirstSprayDate = d => (this.firstSprayDate = d);
  @observable secondSprayDate;
  @action setSecondSprayDate = d => (this.secondSprayDate = d);
  @observable thirdSprayDate;
  @action setThirdSprayDate = d => (this.thirdSprayDate = d);

  @observable endDate = `${this.currentYear}-07-01`;
  @action setEndDate = d => (this.endDate = d);

  // calculate the index for the Step component
  @computed
  get currentIndex() {
    const { date, firstSpray, secondSpray, thirdSpray } = this.block;
    const dates = [date, firstSpray, secondSpray, thirdSpray]
      .map(date => (date === undefined ? 0 : date))
      .map(date => format(date, "x"));
    const max = Math.max(...dates);
    return dates.findIndex(date => date === max.toString());
  }

  // User Data (Table of blocks) ------------------------------------------------
  @observable
  blocks = JSON.parse(localStorage.getItem("pollenTubeBlocks")) || [];
  @action setBlocks = d => (this.blocks = d);

  @computed
  get filteredBlocks() {
    return this.blocks.filter(block => block.isSelected);
  }

  @action
  selectBlock = id => {
    this.blocks.forEach(block => {
      block.id === id ? (block.isSelected = true) : (block.isSelected = false);
    });
  };

  @action
  displayAllBlocks = () => {
    const areAllBlocksDisplayed = this.blocks.every(
      block => block.isSelected === true
    );
    areAllBlocksDisplayed
      ? this.blocks.forEach(block => (block.isSelected = false))
      : this.blocks.forEach(block => (block.isSelected = true));
  };

  @observable isBlockBeingEdited = false;
  @observable blockId;
  @observable isBlockSelected = false;
  @computed
  get dateRange() {
    const dates = [
      this.date,
      this.firstSprayDate,
      this.secondSprayDate,
      this.thirdSprayDate
    ].filter(date => date);

    let results = [];
    dates.forEach((date, i) => {
      let status = "wait";
      if (i === dates.length - 1) status = "finish";
      let name = "";
      if (i === 0) name = "Start Date";
      if (i === 1) name = "First Spray";
      if (i === 2) name = "Second Spray";
      if (i === 3) name = "Third Spray";
      results.push({
        name,
        date,
        status
      });
    });
    const today = {
      name: "Today",
      date: new Date("2017/06/03"), // change this
      status: "wait"
    };
    return [...results, today];
  }

  @computed
  get block() {
    return {
      id: this.blockId,
      name: this.blockName,
      variety: this.subject,
      state: this.state,
      station: this.station,
      isSelected: this.isBlockSelected,
      isBeingEdited: this.isBlockBeingEdited,
      styleLengths: this.styleLengths,
      avgStyleLength: this.avgStyleLength,
      date: this.date,
      resetDate: this.resetDate,
      firstSpray: this.firstSprayDate,
      secondSpray: this.secondSprayDate,
      thirdSpray: this.thirdSprayDate,
      endDate: this.endDate,
      isOkToGetGridData: false,
      gridData: [],
      dateRange: this.dateRange
    };
  }

  @action
  resetFields = () => {
    this.blockId = undefined;
    this.isBlockSelected = false;
    this.setBlockName("");
    this.subject = {};
    this.isBlockBeingEdited = false;
    this.setStyleLengths([]);
    this.setStyleLength(null);
    this.setDate(undefined);
    this.setFirstSprayDate(undefined);
    this.setSecondSprayDate(undefined);
    this.setThirdSprayDate(undefined);
  };

  @action
  addBlock = () => {
    this.blockId = Math.random().toString();
    this.isBlockBeingEdited = false;
    this.isBlockSelected = true;
    const block = { ...this.block };
    this.blocks.push(block);
    this.selectBlock(block.id);
    this.resetFields();
    message.success(`${block.name} block has been created!`);
    localStorage.setItem("pollenTubeBlocks", JSON.stringify(this.blocks));
    this.hideBlockModal();
  };

  @action
  deleteBlock = id => {
    const idx = this.blocks.findIndex(b => b.id === id);
    const block = this.blocks[idx];
    this.blocks.splice(idx, 1);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    message.success(`${block.name} block has been deleted!`);
  };

  @action
  editBlock = id => {
    const block = this.blocks.find(b => b.id === id);
    this.blockId = block.id;
    this.isBlockBeingEdited = true;
    this.isBlockSelected = block.isSelected;
    this.setBlockName(block.name);
    this.setSubject(block.variety.name);
    this.setStyleLengths(block.styleLengths);
    this.setState(block.state.name);
    this.setStation(block.station.id);
    this.setDate(block.date);
    this.setFirstSprayDate(block.firstSpray);
    this.setSecondSprayDate(block.secondSpray);
    this.setThirdSprayDate(block.thirdSpray);
    this.setEndDate(block.endDate);
  };

  @action
  updateBlock = () => {
    this.isBlockBeingEdited = false;
    this.isBlockSelected = true;
    const block = { ...this.block };
    block["currentIndex"] = this.currentIndex;
    const idx = this.blocks.findIndex(b => b.id === block.id);
    this.blocks.splice(idx, 1, block);
    this.setBlocks(this.blocks);
    localStorage.setItem(`pollenTubeBlocks`, JSON.stringify(this.blocks));
    message.success(`${block.name} block has been updated!`);
    this.resetFields();
    this.hideBlockModal();
    this.hideStyleLengthModal();
  };

  // Model ------------------------------------------------------------------
  @action
  setGridData = id => {
    if (Object.keys(this.filteredBlocks).length === 1) {
      this.isLoading = true;
      const { station, resetDate, avgStyleLength } = this.filteredBlocks[0];
      if (station.name && resetDate && avgStyleLength) {
        fetchACISData(station, resetDate).then(res => {
          this.filteredBlocks[0].gridData = this.transformGridData(res);
          this.isLoading = false;
        });
      }
    }
  };

  addZeroToHoursLessThen10 = d => {
    if (d >= 0 && d <= 8) return `0${d + 1}`;
    return d + 1;
  };

  transformGridData = res => {
    const { dateRange, variety, avgStyleLength } = this.filteredBlocks[0];
    const { hrGrowth, temps } = variety;
    let date;
    if (dateRange.length !== 0) {
      date = dateRange[dateRange.length - 2].date;
    }

    const hour = getHours(date);
    const hourIdx = hour - 1;

    let results = [];
    let cumulativeHrGrowth = 0;
    let percentage = 0;

    const filteredFirstDayTemps = res[0][1].slice(hourIdx);
    // first day. The starting hour is selected by the user
    filteredFirstDayTemps.forEach((temp, h) => {
      const idx = temps.findIndex(t => t.toString() === temp);
      let hourlyGrowth = hrGrowth[idx];
      if (temp < 35 || temp > 106 || temp === "M") hourlyGrowth = 0;
      cumulativeHrGrowth += hourlyGrowth;
      percentage = cumulativeHrGrowth / avgStyleLength * 100;
      results.push({
        date: `${format(date, "YYYY-MM-DD")} ${this.addZeroToHoursLessThen10(
          h + hourIdx
        )}:00`,
        temp: temp,
        hrGrowth: hourlyGrowth,
        cumulativeHrGrowth: cumulativeHrGrowth,
        percentage: percentage
      });
    });

    // body. Does not include first and last day
    const dates = res.slice(1, -1).map(day => day[0]);
    const values = res.slice(1, -1).map(day => day[1]);
    dates.forEach((date, i) => {
      values[i].forEach((temp, h) => {
        const idx = temps.findIndex(t => t.toString() === temp);
        let hourlyGrowth = hrGrowth[idx];
        if (temp < 35 || temp > 106 || temp === "M") hourlyGrowth = 0;
        cumulativeHrGrowth += hourlyGrowth;
        percentage = cumulativeHrGrowth / avgStyleLength * 100;

        results.push({
          date: `${date} ${this.addZeroToHoursLessThen10(h)}:00`,
          temp: temp,
          hrGrowth: hourlyGrowth,
          cumulativeHrGrowth: cumulativeHrGrowth,
          percentage: percentage
        });
      });
    });

    const filteredLastDayTemps = res[res.length - 1][1].slice(0, hour);

    // last day.
    filteredLastDayTemps.forEach((temp, h) => {
      const idx = temps.findIndex(t => t.toString() === temp);
      let hourlyGrowth = hrGrowth[idx];
      if (temp < 35 || temp > 106 || temp === "M") hourlyGrowth = 0;
      cumulativeHrGrowth += hourlyGrowth;
      percentage = cumulativeHrGrowth / avgStyleLength * 100;

      results.push({
        date: `${res[res.length - 1][0]} ${this.addZeroToHoursLessThen10(
          h
        )}:00`,
        temp: temp,
        hrGrowth: hourlyGrowth,
        cumulativeHrGrowth: cumulativeHrGrowth,
        percentage: percentage
      });
    });

    return results;
  };
}

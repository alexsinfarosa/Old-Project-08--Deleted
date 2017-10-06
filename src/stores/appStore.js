import { observable, action } from "mobx";
import axios from "axios";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
  }

  @observable isLoading = false;

  @observable gridData = [];
  @action
  updateGridData = d => {
    this.gridData.clear();
    this.gridData = d;
  };

  @action
  loadGridData() {
    this.isLoading = true;

    return axios
      .post(`${this.protocol}//grid.rcc-acis.org/GridData`, params)
      .then(res => {
        console.log(res.data.data);
        this.updateGridData(res.data.data);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load data model", err);
      });
  }
}

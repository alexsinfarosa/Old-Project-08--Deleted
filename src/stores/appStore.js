import { observable, action } from "mobx";
import axios from "axios";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
  }
  @observable
  @observable
  protocol = window.location.protocol;
  @observable isLoading = false;

  @observable gridData = [];
  @action
  updateGridData = d => {
    this.gridData = d;
  };

  @action
  loadGridData() {
    this.isLoading = true;

    const params = {
      loc: "-75.7,42.5",
      sdate: "2017-01-01",
      edate: "2017-10-26",
      grid: 3,
      elems: [{ name: "avgt" }]
    };

    return axios
      .post(`${this.protocol}//grid.rcc-acis.org/GridData`, params)
      .then(res => {
        // console.log(res.data.data);
        this.updateGridData(res.data.data);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load grid data model", err);
      });
  }
}

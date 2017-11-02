import { observable, action } from "mobx";
import axios from "axios";
import { when } from "mobx";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.subjects.length === 0, () => this.loadSubjects());
  }

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

  @observable isSidebarCollapsed = false;
  @action setSidebar = d => (this.isSidebarCollapsed = d);
  @action
  toggleSidebar = () => (this.isSidebarCollapsed = !this.isSidebarCollapsed);

  // Subject ------------------------------------------------------------------
  @observable subjects = [];

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

  @action updateSubjects = d => (this.subjects = d);

  @observable subject = JSON.parse(localStorage.getItem("subject")) || {};

  @action
  setSubject = d => {
    this.subject = this.subjects.find(subject => subject.name === d);
    localStorage.setItem(`subject`, JSON.stringify(this.subject));
  };
  // -------------------------------------------------------------------------------

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

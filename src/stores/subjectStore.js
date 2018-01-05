import { observable, action, when } from "mobx";
// import { toJS } from "mobx";
const fetcher = url => window.fetch(url).then(response => response.json());

class SubjectStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.subjects.size === 0, () => this.loadSubjects());
  }

  @observable isLoading = false;
  @observable subjects = new Map();

  @action
  updateSubjects = json =>
    json.forEach(blockJson => this.subjects.set(blockJson.name, blockJson));

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
}

export default new SubjectStore(fetcher);

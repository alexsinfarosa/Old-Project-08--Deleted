import { observable, when } from "mobx";

export default class blockStore {
  constructor(fetch) {
    this.fetch = fetch;
    when(() => this.subjects.length === 0, () => this.loadSubjects());
  }

  @observable isLoading = false;
}

import { observable, computed } from "mobx";

class Block {
  @observable id;
  @observable name;
  @observable variety;
  @observable state;
  @observable station;
  @observable styleLengths;
  @observable dates;
  @observable data;
  @observable isBeingEdited;

  constructor({
    id,
    name,
    variety,
    state,
    station,
    styleLengths,
    dates,
    data,
    isBeingEdited = false
  }) {
    this.id = id;
    this.name = name;
    this.variety = variety;
    this.state = state;
    this.station = station;
    this.styleLengths = styleLengths;
    this.dates = dates;
    this.data = data;
    this.isBeingEdited = isBeingEdited;
  }

  @computed
  get avgStyleLength() {
    return (
      this.styleLengths.map(obj => obj.styleLength).reduce((p, c) => p + c, 0) /
      this.styleLengths.length
    );
  }
}

export default class blockStore {
  constructor(fetch) {
    this.fetch = fetch;
    // console.log(this.props.store.app.isBlockModal);
    console.log("ciccio bello");
    // when(() => this.subjects.length === 0, () => this.loadSubjects());
  }

  @observable blocks = new Map();

  // @action
  // updateBlocks(json) {
  //   this.blocks.clear();
  //   json.forEach(blockJson => {
  //     console.log(blockJson);
  //     this.blocks.set(blockJson.id, new Block(blockJson));
  //   });
  // }
}

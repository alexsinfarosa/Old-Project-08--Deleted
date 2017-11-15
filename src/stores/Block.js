import { observable, computed } from "mobx";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";

export default class Block {
  @observable id;
  @observable name;
  @observable avgStyleLength;
  @observable state;
  @observable station;
  @observable variety;
  @observable date;
  @observable firstSpray;
  @observable secondSpray;
  @observable thirdSpray;
  @observable isEditing;

  constructor({
    id,
    name,
    avgStyleLength,
    state,
    station,
    variety,
    date,
    firstSpray,
    secondSpray,
    thirdSpray,
    isEditing = false
  }) {
    this.id = id;
    this.name = name.trim();
    this.avgStyleLength = avgStyleLength;
    this.state = state;
    this.station = station;
    this.variety = variety;
    this.date = date;
    this.firstSpray = firstSpray;
    this.secondSpray = secondSpray;
    this.thirdSpray = thirdSpray;
    this.isEditing = isEditing;
  }

  @computed
  get currentYear() {
    return format(this.endDate, "YYYY");
  }

  @computed
  get seasonStartDate() {
    return `${this.currentYear}-03-01`;
  }

  @computed
  get seasonEndDate() {
    return `${this.currentYear}-07-30`;
  }

  @computed
  get isSeason() {
    return (
      isAfter(this.endDate, this.seasonStartDate) &&
      isBefore(this.endDate, this.seasonEndDate)
    );
  }
}

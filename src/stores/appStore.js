import { observable, action } from "mobx";

export default class AppStore {
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

  //   Map ---------------------------------------------------------
  @observable
  isMap = JSON.parse(localStorage.getItem("state")) === null ? true : false;
  @action setIsMap = d => (this.isMap = d);
  @action toggleMap = () => (this.isMap = !this.isMap);

  //   Modals ------------------------------------------------------
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
}

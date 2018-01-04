import AppStore from "./appStore";

// Testing
import cleanFetchedData from "utils/cleanFetchedData";

const fetcher = url => window.fetch(url).then(response => response.json());

const store = {
  app: new AppStore(fetcher)
};

export default store;

cleanFetchedData;

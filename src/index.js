import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App2 from "./App2";
import registerServiceWorker from "./registerServiceWorker";

// Mobx
import store from "stores";
import { Provider } from "mobx-react";

// antd
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App2 />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <App2 />
        </LocaleProvider>
      </Provider>,
      document.getElementById("root")
    );
  });
}

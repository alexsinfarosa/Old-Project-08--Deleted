import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Mobx
import stores from "stores";
import { Provider } from "mobx-react";
// antd
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

ReactDOM.render(
  <Provider {...stores}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      <Provider {...stores}>
        <LocaleProvider locale={enUS}>
          <App />
        </LocaleProvider>
      </Provider>,
      document.getElementById("root")
    );
  });
}

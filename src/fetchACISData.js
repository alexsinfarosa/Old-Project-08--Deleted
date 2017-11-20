import axios from "axios";
import { michiganIdAdjustment, networkTemperatureAdjustment } from "utils";
import getYear from "date-fns/get_year";
import format from "date-fns/format";
import addDays from "date-fns/add_days";
import isThisYear from "date-fns/is_this_year";
// utils
import {
  replaceNonConsecutiveMissingValues,
  replaceMissingValues
} from "utils";

const protocol = window.location.protocol;
const sdate = date => `${getYear(date)}-01-01`;

// Fetch acis data -------------------------------------------------------------
const fetchHourlyStationData = (station, date) => {
  // console.log("fetchHourlyStationData");
  let sid, network;
  if (station !== null && typeof station === "object") {
    network = station.network;
    sid = `${michiganIdAdjustment(station)} ${network}`;
  }

  if (station !== null && typeof station === "string") {
    const [id, sisNetwork] = station.split(" ");
    network = sisNetwork;
    sid = `${id} ${network}`;
  }

  const params = {
    sid: sid,
    sdate: sdate(date),
    edate: format(date, "YYYY-MM-DD"),
    elems: [
      // temperature
      networkTemperatureAdjustment(network)
    ]
  };

  console.log(params);

  return axios
    .post(`${protocol}//data.nrcc.rcc-acis.org/StnData`, params)
    .then(res => {
      // res.data.data.map(arr => console.log(arr[1]));
      return res.data.data;
    })
    .catch(err => {
      console.log("Failed to load ACIS data", err);
    });
};

// Get sister station Id and network -------------------------------------------
const getSisterStationIdAndNetwork = station => {
  // console.log("getSisterStationIdAndNetwork");
  return axios(
    `${protocol}//newa2.nrcc.cornell.edu/newaUtil/stationSisterInfo/${station.id}/${station.network}`
  )
    .then(res => {
      // console.log(res.data);
      return res.data.temp;
    })
    .catch(err => {
      console.log("Failed to load sister station's id and network", err);
    });
};

// Fetch forecast temperature --------------------------------------------------
const fetchHourlyForcestData = (station, date) => {
  // console.log("fetchHourlyForcestData");
  const plusFiveDays = format(addDays(date, 5), "YYYY-MM-DD");

  return axios
    .get(
      `${protocol}//newa2.nrcc.cornell.edu/newaUtil/getFcstData/${station.id}/${station.network}/temp/${sdate(
        date
      )}/${plusFiveDays}`
    )
    .then(res => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch(err => {
      console.log("Failed to load hourly forecast data", err);
    });
};

export const fetchACISData = async (station, date) => {
  // console.log("fetchACISData");

  // get sister station id and network
  const sisterStationIdAndNetwork = await getSisterStationIdAndNetwork(
    station
  ).then(res => res);

  // get sister station hourly data
  const sisterStation = await fetchHourlyStationData(
    sisterStationIdAndNetwork,
    date
  ).then(res => res);
  const sStation = await replaceNonConsecutiveMissingValues(sisterStation);

  // get current station hourly data
  const currentStation = await fetchHourlyStationData(station, date).then(
    res => res
  );
  const cStation = await replaceNonConsecutiveMissingValues(currentStation);

  // replace missing values with sister station
  const replacedMissingValuesWithSisterStation = await replaceMissingValues(
    cStation,
    sStation
  );

  // If this year, replace missing value with forecast data
  if (isThisYear(date)) {
    const forecastData = await fetchHourlyForcestData(station, date).then(
      res => res
    );

    const replacedMissingValuesWithForecast = await replaceMissingValues(
      replacedMissingValuesWithSisterStation,
      forecastData
    );
    return replacedMissingValuesWithForecast;
  }

  return replacedMissingValuesWithSisterStation;
};

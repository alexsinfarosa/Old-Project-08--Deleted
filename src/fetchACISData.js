import axios from "axios";
import { michiganIdAdjustment, networkTemperatureAdjustment } from "utils";
import getYear from "date-fns/get_year";
import format from "date-fns/format";
import addDays from "date-fns/add_days";

const protocol = window.location.protocol;
const sdate = date => `${getYear(date)}-01-01`;

// Fetch acis data -------------------------------------------------------------
const fetchHourlyStationData = (station, date) => {
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

  // console.log(params);

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
  // get sister station id and network
  const sisterStationIdAndNetwork = await getSisterStationIdAndNetwork(
    station
  ).then(res => res);

  // get current station hourly data
  const currentStation = fetchHourlyStationData(station, date).then(res => res);

  // get sister station hourly data
  const sisterStation = fetchHourlyStationData(
    sisterStationIdAndNetwork,
    date
  ).then(res => res);

  const forecastData = fetchHourlyForcestData(station, date).then(res => res);

  console.log(sisterStationIdAndNetwork);
  console.log(currentStation);
  console.log(sisterStation);
  console.log(forecastData);
};

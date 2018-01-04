import axios from "axios";
import {
  michiganIdAdjustment,
  networkTemperatureAdjustment
} from "utils/utils";

// import getYear from "date-fns/get_year";
import format from "date-fns/format";
import addDays from "date-fns/add_days";

const protocol = window.location.protocol;
const formatDate = date => format(date, "YYYY-MM-DD");

// Fetch current station hourly data --------------------------------------------------
const fetchHourlyCurrentStationData = (
  station,
  seasonStartDate,
  selectedDate
) => {
  const params = {
    sid: `${michiganIdAdjustment(station)} ${station.network}`,
    sdate: formatDate(seasonStartDate),
    edate: formatDate(selectedDate),
    elems: [
      // temperature
      networkTemperatureAdjustment(station.network)
    ]
  };

  // console.log(params);

  return axios
    .post(`${protocol}//data.nrcc.rcc-acis.org/StnData`, params)
    .then(res => {
      return new Map(res.data.data);
    })
    .catch(err => {
      console.log("Failed to load ACIS data", err);
    });
};

// Fetch sister station hourly data------------------------------------------------------
const fetchHourlySisterStationData = (sid, seasonStartDate, selectedDate) => {
  const [id, sisNetwork] = sid.split(" ");

  const params = {
    sid: `${id} ${sisNetwork}`,
    sdate: formatDate(seasonStartDate),
    edate: formatDate(selectedDate),
    elems: [
      // temperature
      networkTemperatureAdjustment(sisNetwork)
    ]
  };

  // console.log(params);

  return axios
    .post(`${protocol}//data.nrcc.rcc-acis.org/StnData`, params)
    .then(res => {
      // console.log(res.data.data);
      return new Map(res.data.data);
    })
    .catch(err => {
      console.log("Failed to load ACIS data", err);
    });
};

// Get sister station Id and network -------------------------------------------
const getSisterStationIdAndNetwork = station => {
  return axios(
    `${protocol}//newa2.nrcc.cornell.edu/newaUtil/stationSisterInfo/${
      station.id
    }/${station.network}`
  )
    .then(res => {
      // console.log(res.data);
      return res.data.temp;
    })
    .catch(err => {
      console.log("Failed to load sister station's id and network", err);
    });
};

// Fetch forecast hourly temperatures --------------------------------------------
const fetchHourlyForcestData = (station, seasonStartDate, selectedDate) => {
  const plusFiveDays = format(addDays(selectedDate, 5), "YYYY-MM-DD");

  return axios
    .get(
      `${protocol}//newa2.nrcc.cornell.edu/newaUtil/getFcstData/${station.id}/${
        station.network
      }/temp/${formatDate(seasonStartDate)}/${formatDate(plusFiveDays)}`
    )
    .then(res => {
      // console.log(res.data.data);
      return new Map(res.data.data);
    })
    .catch(err => {
      console.log("Failed to load hourly forecast data", err);
    });
};

// Main Function
export default async (station, seasonStartDate, selectedDate) => {
  const results = new Map();

  // get current station hourly data
  const currentStation = await fetchHourlyCurrentStationData(
    station,
    seasonStartDate,
    selectedDate
  );
  results.set("cStation", currentStation);

  // get sister station id and network
  const sisterStationIdAndNetwork = await getSisterStationIdAndNetwork(station);

  // get sister station hourly data
  const sisterStation = await fetchHourlySisterStationData(
    sisterStationIdAndNetwork,
    seasonStartDate,
    selectedDate
  );
  results.set("sStation", sisterStation);

  const forecastData = await fetchHourlyForcestData(
    station,
    seasonStartDate,
    selectedDate
  );

  results.set("forecast", forecastData);

  return results;
};

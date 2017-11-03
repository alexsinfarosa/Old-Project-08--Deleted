import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Map as LMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { matchIconsToStations } from "utils";

// rebass
import { Box } from "rebass";

const myIcon = e =>
  L.icon({
    iconUrl: e
  });

@inject("store")
@observer
export default class USMap extends Component {
  onClickSetStation = e => {
    const { lat, lng } = e.latlng;

    const {
      stations,
      state,
      states,
      setStation,
      setIsMap,
      loadGridData,
      setState
    } = this.props.store.app;

    const selectedStation = stations.find(
      station => station.lat === lat && station.lon === lng
    );

    const selectedState = states.find(
      state => state.postalCode === selectedStation.state
    );

    if (state.name === "All States") {
      setState(selectedState.name);
      setStation(selectedStation.name);
      loadGridData();
      setIsMap(false);
      return;
    }

    if (selectedStation.state === state.postalCode) {
      setStation(selectedStation.name);
      loadGridData();
      setIsMap(false);
    } else {
      alert(
        `Select ${selectedState.name} from the State menu to access this station.`
      );
    }
  };

  render() {
    const { state, protocol, stations } = this.props.store.app;

    const stationsWithMatchedIcons = stations.map(station => {
      station["icon"] = matchIconsToStations(protocol, station, state);
      return station;
    });

    // Marker list
    const MarkerList = stationsWithMatchedIcons.map(station => (
      <Marker
        key={`${station.id} ${station.network}`}
        position={[station.lat, station.lon]}
        icon={myIcon(station.icon)}
        title={station.name}
        onClick={this.onClickSetStation}
      />
    ));

    return (
      <Box mb={3}>
        <LMap
          style={{ width: "100%", height: "35vh" }}
          zoomControl={true}
          scrollWheelZoom={false}
          ref="map"
          center={
            Object.keys(state).length === 0
              ? [42.9543, -75.5262]
              : [state.lat, state.lon]
          }
          zoom={Object.keys(state).length === 0 ? 6 : state.zoom}
        >
          <TileLayer
            url={`${protocol}//server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}`}
          />
          {MarkerList}
        </LMap>
      </Box>
    );
  }
}

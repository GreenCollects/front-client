import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import MapView, { ProviderPropType, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { getPointsInCircle } from "../api/point";
import { getAllWasteType } from "../api/waste";
import tw from "twrnc";

import { AddIcon, FilterIcon } from "../icons/icons"
import FilteringKm from "../filtering/FilteringKm";
import Filters from "./Filters";
import CardDetails from "./CardDetails";

import Toast from "react-native-root-toast";

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 45.188529;
const LONGITUDE = 5.724524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = (props) => {
  const [coordinate, setCoordinate] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  const [radius, setRadius] = useState(5000);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [markers, setMarkers] = useState([]);
  const [wasteLabels, setWasteLabels] = useState([]);
  const [wastes, setWastes] = useState([])
  const [filters, setFilters] = useState([])
  const [filteredMarkers, setFilteredMarkers] = useState([])
  const map = useRef(null);
  const token = useSelector((state) => state.authentication.token);

  const updateRadius = (radius) => {
    setRadius(radius);
    animate({ latitude: LATITUDE, longitude: LONGITUDE }, radius, 2000);
  };

  const animate = (region, radius, time) => {
    let r = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: (radius / 1000 / 111) * 4,
      longitudeDelta: (radius / 1000 / 111) * ASPECT_RATIO,
    };
    map.current.animateToRegion(r, time);
  };

  const zoomAndDisplayDetails = (marker) => {
    const region = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    };
    const getAddress = async () => {
      const address = await map.current.addressForCoordinate(region);
      setSelectedMarker(marker);
      setSelectedAddress(address);
      setVisibleDetails(true);
    };
    getAddress().catch((err) => console.log(err));
    animate(region, 500, 500);
  };

  const deselectMarkerAndHGideDetails = () => {
    setSelectedMarker({});
    setSelectedAddress({});
    setVisibleDetails(false);
  };

  const onRegionChange = (region) => {
    setCoordinate(region);
  };

  useEffect(() => {
    if (token) {
      const getAllPoints = async () => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Token " + token);

        const body = {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          radius: radius / 1000,
        };

        const data = await getPointsInCircle(headers, JSON.stringify(body));
        setMarkers(data ? data : []);
      };

      getAllPoints().catch((err) => console.log(err));
    } else {
      setMarkers([])
    }
  }, [radius, props.route.params, token]);

  useEffect(() => {
    if (token) {
      const getAllWasteLabel = async () => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Token " + token);

        const data = await getAllWasteType(headers);
        if (data !== undefined) {
          const fetched_labels = data?.map((value) => {
            return value.label;
          });

          setWasteLabels(fetched_labels);
          setWastes(data)
        }
      };
      getAllWasteLabel().catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    const filtered_markers = []

    for (let i = 0; i < markers.length; i++) {
      for (let j = 0; j < markers[i].wastes.length; j++) {
        if (filters[markers[i].wastes[j] - 1]) {
          filtered_markers.push(markers[i])
          break
        }
      }
    }

    setFilteredMarkers(filtered_markers)

  }, [filters])

  return (
    <SafeAreaView style={styles.safecontainer}>
      <View style={styles.mapcontainer}>
        <FilteringKm updateRadius={updateRadius} />

        <MapView
          provider={props.provider}
          ref={map}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: (radius / 1000 / 111) * 4,
            longitudeDelta: (radius / 1000 / 111) * ASPECT_RATIO,
          }}
          onPress={deselectMarkerAndHGideDetails}
          onRegionChange={onRegionChange}
        >

          <MapView.Circle
            center={{ latitude: LATITUDE, longitude: LONGITUDE }}
            radius={radius}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
          {filteredMarkers.length !== 0 && filters.toString() !== new Array(wasteLabels.length).fill(false) && filteredMarkers.map((marker, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onSelect={() => zoomAndDisplayDetails(marker)}
                onPress={() => zoomAndDisplayDetails(marker)}
              />
            );
          })}

          {filteredMarkers.length === 0 && filters.toString() === new Array(wasteLabels.length).fill(false).toString() && markers.map((marker, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onSelect={() => zoomAndDisplayDetails(marker)}
                onPress={() => zoomAndDisplayDetails(marker)}
              />
            );
          })}
        </MapView>


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addBubble}
            onPress={() =>
              this.props.navigation.push("AddCollect", {
                ParentScreen: "Map",
              })
            }
          >
            <AddIcon style={styles.icon} fill='#fff' />
          </TouchableOpacity>
        </View>

        <Filters wastes={wastes} setFilters={setFilters} />

        {visibleDetails && (
          <CardDetails
            deselect={deselectMarkerAndHGideDetails}
            marker={selectedMarker}
            address={selectedAddress}
            wasteLabels={wasteLabels}
          />
        )}

      </View>

    </SafeAreaView >
  );
}

Map.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addBubble: tw`bg-[#54e096] rounded-full mr-4 mb-4`,
  container: tw`flex flex-1 bg-white items-center justify-center`,
  safecontainer: tw`flex flex-1`,
  icon: tw`w-12 h-12`,
  buttonContainer: tw`bottom-0 right-0 absolute `,
});

export default Map;

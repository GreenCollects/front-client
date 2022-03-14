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
import { getPoints } from "../api/point";
import { getAllWasteType } from "../api/waste";
import tw from "twrnc";

import addIcon from "../../assets/add-collect-plus.png";
import FilteringKm from "../filtering/FilteringKm";
import CardDetails from "./CardDetails";
import { getCollects } from "../api/collect";

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 45.188529;
const LONGITUDE = 5.724524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// //Hardcoded value markers TO REMOVE
// const markers = [
//   {
//     id: 0,
//     coordinate: {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//     },
//   },
//   {
//     id: 1,
//     coordinate: {
//       latitude: LATITUDE + 0.004,
//       longitude: LONGITUDE - 0.004,
//     },
//   },
//   {
//     id: 2,
//     coordinate: {
//       latitude: LATITUDE - 0.004,
//       longitude: LONGITUDE - 0.004,
//     },
//   },
// ];

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
    const getAllPoints = async () => {
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Token " + token);

      const points = await getPoints(headers);

      const collects = await getCollects(headers);

      let concat = Array.from(markers)

      if (points !== undefined) {
        concat = concat.concat(points)
      }

      if (collects !== undefined) {
        concat = concat.concat(collects)
      }

      const uniqueStringifyConcat = []

      const stringifyConcat = concat.map(elt => {
        return JSON.stringify(elt)
      })

      stringifyConcat.forEach((element) => {
        if (!uniqueStringifyConcat.includes(element)) {
          uniqueStringifyConcat.push(element);
        }
      });

      concat = uniqueStringifyConcat.map(elt => {
        return JSON.parse(elt)
      })

      setMarkers(concat)
    };

    getAllPoints().catch((err) => console.log(err));

  }, [radius, props.route.params, token]);

  useEffect(() => {
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
      }
    };
    getAllWasteLabel().catch(err => console.log(err))
  }, []);

  return (
    <SafeAreaView style={styles.safecontainer}>
      <View style={styles.mapcontainer}>
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
          {markers.map((marker, i) => {
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

        <FilteringKm updateRadius={updateRadius} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => {
              props.navigation.push("AddCollect", {
                ParentScreen: "AddPoint",
              })
            }
            }
          >
            <Image style={styles.icon} source={addIcon} />
          </TouchableOpacity>
        </View>

        {visibleDetails && (
          <CardDetails
            deselect={deselectMarkerAndHGideDetails}
            marker={selectedMarker}
            address={selectedAddress}
            wasteLabels={wasteLabels}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

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
  bubble: tw`flex-1 bg-transparent py-3 rounded-full `,
  button: tw`w-10 pr-12 mx-8`,
  container: tw`flex flex-1 bg-white items-center justify-center`,
  safecontainer: tw`flex flex-1`,
  icon: tw`w-15 h-15`,
  buttonContainer: tw`bottom-0 right-0 absolute `,
});

export default Map;

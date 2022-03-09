import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from "react-native-maps";

import tw from "twrnc";

import addIcon from "../../assets/add-collect-plus.png";
import FilteringKm from "../filtering/FilteringKm";
import CardDetails from "./CardDetails";

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 45.188529;
const LONGITUDE = 5.724524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//Hardcoded value markers TO REMOVE
const markers = [
  {
    id: 0,
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
  },
  {
    id: 1,
    coordinate: {
      latitude: LATITUDE + 0.004,
      longitude: LONGITUDE - 0.004,
    },
  },
  {
    id: 2,
    coordinate: {
      latitude: LATITUDE - 0.004,
      longitude: LONGITUDE - 0.004,
    },
  },
];

const Map = (props) => {
  const [coordinate, setCoordinate] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  const [radius, setRadius] = useState(5000);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const map = useRef(null);

  const updateRadius = (radius) => {
    setRadius(radius);
    animate(radius);
  };

  const animate = (radius) => {
    let r = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: (radius / 1000 / 111) * 4,
      longitudeDelta: (radius / 1000 / 111) * ASPECT_RATIO,
    };
    map.animateToRegion(r, 2000);
  };


  const zoomAndDisplayDetails = (marker) => {
    const getAddress = async () => {
      const address = await map.current.addressForCoordinate(marker.coordinate);
      setSelectedMarker(marker);
      setSelectedAddress(address);
      setVisibleDetails(true);
    };
    getAddress().catch((e) => console.log(e));

    // TODO : ZOOM
  };

  const deselectMarkerAndHGideDetails = () => {
    setSelectedMarker({});
    setSelectedAddress({});
    setVisibleDetails(false);
  };
  
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
                coordinate={marker.coordinate}
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
            onPress={() =>
              props.navigation.push("AddCollect", {
                ParentScreen: "AddPoint",
              })
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

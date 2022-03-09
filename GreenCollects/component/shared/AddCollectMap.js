import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import MapView, { ProviderPropType } from "react-native-maps";

import TopNavigation from "./TopNavigation";
import tw from "twrnc";

import marker from "../../assets/marker-centered.png";

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 45.188529;
const LONGITUDE = 5.724524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const AddCollectMap = (props) => {
  const [coordinate, setCoordinate] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });
  const [address, setAddress] = useState({});
  const map = useRef(null)

  const onRegionChange = (region) => {
    setCoordinate(region);
  };

  const handlePress = () => {
    const getAddress = async () => {
      console.log(map.current )
      const address = await map.current.addressForCoordinate(coordinate);
      setAddress(address);
      props.navigation.navigate(props.route.params.ParentScreen, {
        region: coordinate,
        address: address,
      });
    };

    getAddress().catch(e => console.log(e))
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <View>
        <TopNavigation title="Accueil" />
      </View>
      <View style={styles.mapcontainer}>
        <MapView
          provider={props.provider}
          style={styles.map}
          ref={map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onRegionChange={onRegionChange}
        ></MapView>
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={handlePress}
          >
            <Text>Choisir cet emplacement </Text>
          </TouchableOpacity>
        </View>
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
  bubble: tw`flex-1 bg-white py-3 rounded-full `,
  button: tw`w-80 px-14 mx-10`,
  buttonContainer: tw`flex-row my-20 bg-transparent`,
  container: tw`flex flex-1 bg-white items-center justify-center`,
  safecontainer: tw`flex flex-1`,
  markerFixed: tw`top-75% -ml-24 -mt-48 absolute`,
  marker: tw`w-10 h-10`,
});

export default AddCollectMap;

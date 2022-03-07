import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";

import MapView, {
  ProviderPropType,
  AnimatedRegion,
} from "react-native-maps";

import TopNavigation from "./TopNavigation";
import tw from "twrnc";

import marker from "../../assets/marker-centered.png";

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 45.188529;
const LONGITUDE = 5.724524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }

  onRegionChange = (region) => {
    this.setState({
      region,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safecontainer}>
        <View>
          <TopNavigation title="Accueil" />
        </View>
        <View style={styles.mapcontainer}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          ></MapView>
          <View style={styles.markerFixed}>
            <Image style={styles.marker} source={marker} />
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => this.props.navigation.navigate(this.props.route.params.ParentScreen, { region : this.state.coordinate})}
          >
            <Text>Choisir cette emplacement </Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    );
  }
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
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  container: tw`flex flex-1 bg-white items-center justify-center`,
  safecontainer: tw`flex flex-1`,
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 36,
    width: 36,
  },
});

export default Map;

import React from "react";
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
    amount: 99,
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
  },
  {
    id: 1,
    amount: 199,
    coordinate: {
      latitude: LATITUDE + 0.004,
      longitude: LONGITUDE - 0.004,
    },
  },
  {
    id: 2,
    amount: 285,
    coordinate: {
      latitude: LATITUDE - 0.004,
      longitude: LONGITUDE - 0.004,
    },
  },
];

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
      radius: 5000,
    };
  }

  updateRadius = (radius) => {
    this.setState({
      radius: radius,
    });
    this.animate(radius);
  };

  animate(radius) {
    let r = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: (radius / 1000 / 111) * 4,
      longitudeDelta: (radius / 1000 / 111) * ASPECT_RATIO,
    };
    this.map.animateToRegion(r, 2000);
  }

  componentDidUpdate = (prevProps) => {
    const getAddress = async () => {
      const changeProps = this.props.route?.params?.region;
      console.log("region",this.props)
      if (changeProps !== undefined && changeProps !== prevProps?.route?.params?.region) {
        const newAddress = await this.map.addressForCoordinate(changeProps);
        this.props.navigation.push("AddPoint", {
          region: changeProps,
          address: newAddress,
        });
      }
    };
    getAddress().catch( e => console.log(e))
  };

  render() {
    return (
      <SafeAreaView style={styles.safecontainer}>
        <View style={styles.mapcontainer}>
          <MapView
            provider={this.props.provider}
            ref={(ref) => {
              this.map = ref;
            }}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: (this.state.radius / 1000 / 111) * 4,
              longitudeDelta: (this.state.radius / 1000 / 111) * ASPECT_RATIO,
            }}
          >
            <MapView.Circle
              center={{ latitude: LATITUDE, longitude: LONGITUDE }}
              radius={this.state.radius}
              strokeWidth={1}
              strokeColor={"#1a66ff"}
              fillColor={"rgba(230,238,255,0.5)"}
            />
            {markers.map((marker, i) => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title="C'est un Titre ? "
                  description={"Décription du point" + marker.id}
                />
              );
            })}
          </MapView>

          <FilteringKm updateRadius={this.updateRadius} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.bubble, styles.button]}
              onPress={() =>
                this.props.navigation.push("AddCollect", {
                  ParentScreen: "Map",
                })
              }
            >
              <Image style={styles.icon} source={addIcon} />
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
  container: tw`flex flex-1 bg-white items-center justify-center`,
  safecontainer: tw`flex flex-1`,
  icon: tw`w-15 h-15`,
  buttonContainer: tw`bottom-0 right-0 absolute `,
});

export default Map;

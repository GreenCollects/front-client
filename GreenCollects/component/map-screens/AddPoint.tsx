import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {
  Button,
  Text,
  Input,
  TopNavigation,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import tw from "twrnc";
import { getAllWasteType } from "../api/waste";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Toast from "react-native-root-toast";
import { createPoint } from "../api/point";
import { nameOrAddress } from "./CardDetails";

export const AddPoint = (props: any) => {
  const [labels, setLabels] = useState([]);
  const [wastes, setWastes] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [locationValue, setLocationValue] = useState({
    locality: "",
    postalCode: "",
    address: "",
  });
  const [error, setError] = useState("");
  const token = useSelector((state: RootState) => state.authentication.token);
  const user = useSelector((state: RootState) => state.authentication.user);

  const printedValue = selectedLabels.map((selectedLabel) => {
    return labels[selectedLabel - 1];
  });

  const addCollect = () => {
    const currentDate = new Date();
    currentDate.toLocaleDateString("fr");

    if (
      locationValue.address !== "" &&
      locationValue.postalCode !== "" &&
      locationValue.locality !== "" &&
      selectedLabels.length !== 0
    ) {
      setError("");
      const postData = async () => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Token " + token);

        const wastesId = wastes.map((waste: any, index) => {
          let id;
          for (let i = 0; i < printedValue.length; i++) {
            if (printedValue[i] === waste.label) {
              id = waste.id;
            }
          }

          return id ? id : -1;
        });

        const filteredWastesId = wastesId.filter((elt) => elt !== -1);

        const body = {
          label: nameOrAddress(props.route.params.address),
          latitude: props.route.params.region.latitude,
          longitude: props.route.params.region.longitude,
          wastes: filteredWastesId,
          user: user.id,
        };

        const data: any = await createPoint(headers, JSON.stringify(body));

        if (data !== undefined) {
          Toast.show("Point de collecte créé avec succès !", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: "#54e096",
            textColor: "#fff",
          });
          props.route.params.newMarker(data)
          props.navigation.popToTop();
        }
      };
      postData().catch((err) => console.log(err));
    } else {
      setError("Aucun des champs ne doit être vide.");
    }
  };

  useEffect(() => {
    if (token !== "") {
      const getData = async () => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Token " + token);

        const data = await getAllWasteType(headers);
        if (data !== undefined) {
          const fetched_labels = data?.map((value: any) => {
            return value.label;
          });

          setWastes(data);
          setLabels(fetched_labels);
        }
      };

      getData().catch((err) => console.log(err));
    } else {
      // TODO: Gérer le token avec des stack de connexion
    }
  }, [getAllWasteType, token]);

  useEffect(() => {
    setLocationValue({
      locality: props.route.params?.address?.locality,
      postalCode: props.route.params?.address?.postalCode,
      address: props.route.params?.address?.subThoroughfare
        ? props.route.params?.address?.subThoroughfare +
          " " +
          props.route.params?.address?.thoroughfare
        : props.route.params?.address?.thoroughfare,
    });
  }, [props.route.params]);

  return (
    <SafeAreaView style={styles.safecontainer}>
      <View>
        <TopNavigation title="Nouveau point de collecte" />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Recenser un point de collecte</Text>
        <View>
          <View style={styles.formWaste}>
            <Text style={styles.wasteLabel}>Déchets collectable</Text>
            <Select
              multiSelect={true}
              placeholder="Choisir un déchet"
              selectedIndex={selectedLabels}
              value={printedValue.join(", ")}
              size="large"
              onSelect={(index: any) => setSelectedLabels(index)}
            >
              {labels.map((label, i) => {
                return <SelectItem title={label} key={i} />;
              })}
            </Select>
          </View>
          <View style={styles.formLocation}>
            <View>
              <Text style={styles.positionLabel}> Adresse</Text>
              <Input value={locationValue.address} disabled={true} />
            </View>
            <View style={tw`flex flex-row`}>
              <View style={tw`flex flex-1`}>
                <Text style={styles.positionLabel}>Ville</Text>
                <Input disabled={true} value={locationValue.locality}/>
              </View>
              <View style={tw`flex flex-1`}>
                <Text style={styles.positionLabel}> Code postal</Text>
                <Input disabled={true} value={locationValue.postalCode} />
              </View>
            </View>
          </View>
        </View>

        {error !== "" && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View>
          <Button status="success" onPress={addCollect}>
            Créer
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safecontainer: tw`flex flex-1 bg-white`,
  container: tw`flex p-4`,
  title: tw`text-center text-3xl mb-8 text-slate-500`,
  formDate: tw`mb-4`,
  formVolume: tw`mb-4`,
  formWaste: tw`mb-4`,
  formLocation: tw`mb-4`,
  wasteLabel: tw`text-lg text-slate-500`,
  dateLabel: tw`text-lg text-slate-500`,
  volumeLabel: tw`text-lg text-slate-500`,
  positionLabel: tw`text-lg text-slate-500`,
  error: tw`bg-orange-300 mb-3 p-3`,
  errorText: tw`text-white text-center text-lg`,
});

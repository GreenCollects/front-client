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
// import { getAllWasteType } from "../api/waste.tsx";

export const AddPoint = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [labels, setLabels] = useState([]);

  const [selectedLabels, setSelectedLabels] = useState([]);
  const [locationValue, setLocationValue] = useState({
    locality: "",
    postalCode: "",
    address: "",
  });

  const [error, setError] = useState("");

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
    } else {
      setError("Aucun des champs ne doit être vide.");
    }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = [{id : 3, label : "pile"}, ]
  //     // await getAllWasteType();
  //     const fetched_labels = data.map((value: any) => {
  //       return value.label;
  //     });

  //     setLabels(fetched_labels);
  //   };

  //   getData().catch((err) => console.log(err));
  // })
  // , [getAllWasteType]);

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
            <View style={tw`flex flex-row`}>
              <View style= {tw`flex flex-1`}>
                <Text style={styles.positionLabel}>
                  Ville
                </Text>
                <Input
                  placeholder={props.route.params.address.locality}
                  disabled={true}
                  value={locationValue.locality}
                />
              </View>
              <View style= {tw`flex flex-1`}>
                <Text style={styles.positionLabel}> Code postal</Text>
                <Input
                  placeholder={props.route.params.address.postalCode}
                  disabled={true}
                  value={locationValue.postalCode}
                />
              </View>
            </View>
            <Text style={styles.positionLabel}> Adresse</Text>
            <Input
              placeholder={
                props.route.params.address.subThoroughfare
                  ? props.route.params.address.subThoroughfare +
                    " " +
                    props.route.params.address.thoroughfare
                  : props.route.params.address.thoroughfare
              }
              value={locationValue.address}
              disabled={true}
            />
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

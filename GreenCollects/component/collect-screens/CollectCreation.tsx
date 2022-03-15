import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import {
    Button,
    Datepicker,
    DateService,
    I18nConfig,
    Input,
    NativeDateService,
    Select,
    SelectItem,
} from "@ui-kitten/components";

import TopNavigation from "../shared/TopNavigation";
import { CalendarIcon } from "../icons/icons";
import { getAllWasteType } from "../api/waste";
import { createCollect } from "../api/collect";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Toast from "react-native-root-toast";

const i18n: I18nConfig = {
    dayNames: {
        short: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        long: [
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
            "Dimanche",
        ],
    },
    monthNames: {
        short: [
            "Jan",
            "Fev",
            "Mar",
            "Avr",
            "Mai",
            "Juin",
            "Juil",
            "Aout",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ],
        long: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
        ],
    },
};

const localeDateService: DateService<any> = new NativeDateService("fr", {
    i18n,
    startDayOfWeek: 0,
});

const CollectCreation = (props: any) => {
    const [labels, setLabels] = useState([]);

    const [selectedLabels, setSelectedLabels] = useState([]);
    const [volumeValue, setVolumeValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [locationValue, setLocationValue] = useState({
        locality: "",
        postalCode: "",
        address: "",
    });
    const [wastes, setWastes] = useState([]);

    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);

    const [error, setError] = useState("");

    const printedValue = selectedLabels.map((selectedLabel) => {
        return labels[selectedLabel - 1];
    });

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
    }, [token]);

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

    const onChangeVolume = (value: string) => {
        const parsedValue = parseInt(value);
        if (parsedValue !== undefined && !isNaN(parsedValue)) {
            setVolumeValue(parsedValue.toString());
        } else {
            setVolumeValue("");
        }
    };

    const clearForm = () => {
        setSelectedLabels([]);
        setVolumeValue("");
        setDateValue("");
        setLocationValue({ locality: "", postalCode: "", address: "" });
    };

    const createCollectOnPress = () => {
        const currentDate = new Date();
        const createDate = new Date(dateValue);
        const isDateValid =
            currentDate.toLocaleDateString("fr") <=
            createDate.toLocaleDateString("fr");

        if (
            volumeValue !== "" &&
            isDateValid &&
            locationValue.postalCode !== "" &&
            locationValue.locality !== "" &&
            selectedLabels.length !== 0
        ) {
            setError("");
            const getData = async () => {
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
                    quantityMax: volumeValue,
                    collectDate: dateValue,
                    label: "Point de collecte : " + printedValue.join(", "),
                    latitude: props.route.params.region.latitude,
                    longitude: props.route.params.region.longitude,
                    wastes: filteredWastesId,
                    user: user.id,
                };

                const data: any = await createCollect(
                    headers,
                    JSON.stringify(body)
                );

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

                    clearForm();

                    const bodyToSend = {
                        quantityMax: volumeValue,
                        label: "Point de collecte : " + printedValue.join(", "),
                        latitude: props.route.params.region.latitude,
                        longitude: props.route.params.region.longitude,
                        wastes: filteredWastesId,
                        user: user.id,
                    };

                    props.navigation.navigate("Carte", {
                        screen: "Map",
                        params: { newMarker: bodyToSend },
                    });
                }
            };
            getData().catch((err) => console.log(err));
        } else if (
            volumeValue === "" ||
            locationValue.postalCode === "" ||
            locationValue.locality === "" ||
            selectedLabels.length === 0
        ) {
            setError("Aucun des champs ne doit être vide.");
        } else if (!isDateValid) {
            setError("La date est déjà passé.");
        }
    };

    const handlePressIn = () => {
        props.navigation.navigate("Sélectionner un point", {
            ParentScreen: "Organisation",
        });
    };

    return (
        <SafeAreaView style={styles.safecontainer}>
            <View>
                <TopNavigation title="Organisation" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Organiser une collecte</Text>
                <View>
                    <View style={styles.formDate}>
                        <Text style={styles.wasteLabel}>
                            Date de la récolte
                        </Text>
                        <Datepicker
                            placeholder="Choisir une date"
                            date={dateValue}
                            onSelect={(nextDate) => setDateValue(nextDate)}
                            accessoryRight={CalendarIcon}
                            dateService={localeDateService}
                            size="large"
                        />
                    </View>
                    <View style={styles.formWaste}>
                        <Text style={styles.wasteLabel}>
                            Les déchets à récolter
                        </Text>
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
                    <View style={styles.formVolume}>
                        <Text style={styles.volumeLabel}>
                            Volume de la récolte (Kg)
                        </Text>
                        <Input
                            placeholder="20"
                            onChangeText={onChangeVolume}
                            value={volumeValue}
                        />
                    </View>
                    <View style={styles.formLocation}>
                        <Text style={styles.positionLabel}>
                            Où la récolte se situera ?
                        </Text>
                        <View style={styles.formLocation}>
                            <View>
                                <Text style={styles.positionLabel}>
                                    {" "}
                                    Adresse
                                </Text>
                                <Input
                                    value={locationValue.address}
                                    onPressIn={handlePressIn}
                                />
                            </View>
                            <View style={tw`flex flex-row`}>
                                <View style={tw`flex flex-1`}>
                                    <Text style={styles.positionLabel}>
                                        Ville
                                    </Text>
                                    <Input
                                        disabled={true}
                                        value={locationValue.locality}
                                    />
                                </View>
                                <View style={tw`flex flex-1`}>
                                    <Text style={styles.positionLabel}>
                                        Code postal
                                    </Text>
                                    <Input
                                        disabled={true}
                                        value={locationValue.postalCode}
                                    />
                                </View>
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
                    <Button status="success" onPress={createCollectOnPress}>
                        Créer
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

// Variable to store and centralized style for these components
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

export default CollectCreation;

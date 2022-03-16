import React, { useEffect, useState } from "react";
import {
    Card,
    CheckBox,
    Modal,
    Select,
    SelectItem,
} from "@ui-kitten/components";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import tw from "twrnc";
import { FilterIcon } from "../icons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";

const Filters = (props: any) => {
    const [selectedLabels, setSelectedLabels] = useState<Boolean[]>([]);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setSelectedLabels(new Array(props.wastes.length).fill(false));
    }, [props.wastes]);

    const handlePress = () => {
        setVisible(true);
    };

    const onBackdropPress = () => {
        setVisible(false);
    };

    const handleChange = (i: number) => {
        const newSelectedLabels = Array.from(selectedLabels);

        newSelectedLabels[i] = !selectedLabels[i];

        setSelectedLabels(newSelectedLabels);

        props.setFilters(newSelectedLabels)
    };

    return (
        <>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.filterBubble}
                    onPress={handlePress}
                >
                    <FilterIcon style={styles.icon} fill="#fff" />
                    {selectedLabels.toString() !==
                        new Array(selectedLabels.length)
                            .fill(false)
                            .toString() && <View style={styles.notification} />}
                </TouchableOpacity>
            </View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={onBackdropPress}
            >
                <Card style={styles.cardContainer} disabled={true}>
                    <Text style={styles.header}>Sélectionnez les déchets</Text>
                    <Text style={styles.description}>
                        Les points ayant les déchets ci-dessous seront affichés.
                    </Text>
                    <View>
                        {props.wastes.map((waste: any, i: number) => {
                            return (
                                <CheckBox
                                    key={i}
                                    status="primary"
                                    style={styles.checkbox}
                                    onChange={() => handleChange(i)}
                                    checked={selectedLabels[i]}
                                >
                                    {waste.label}
                                </CheckBox>
                            );
                        })}
                    </View>
                </Card>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1 items-center`,
    cardContainer: tw`rounded-3xl`,
    container: tw`max-h-2`,
    backdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    header: tw`font-bold m-auto mb-2 text-lg`,
    description: tw`font-light text-slate-500 text-sm mb-2`,
    filterBubble: tw`bg-[#bbb] rounded-full mr-4 mb-20`,
    icon: tw`w-12 h-12`,
    buttonContainer: tw`bottom-0 right-0 absolute `,
    checkbox: tw`my-2`,
    notification: tw`absolute rounded-3xl w-3 h-3 bg-red-400 -right-1 -top-1`,
});

export default Filters;

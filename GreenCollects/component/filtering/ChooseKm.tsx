import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Button,
    Card,
    Modal,
    Text,
    RadioGroup,
    Radio,
    Divider,
} from "@ui-kitten/components";
import tw from "twrnc";

const ChooseKm = (props: any) => {
    const radioDistance = props.distances.map(
        (distance: any) => (
            // <>
            // <Divider key={distance.toString()}/>
            <Radio key={distance.toString()}>{distance} km</Radio>
        )
        // </>
    );

    return (
        <View style={styles.safecontainer}>
            <Modal
                visible={props.visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => props.setVisible(false)}
            >
                <Card style={styles.cardContainer} disabled={true}>
                    <Text style={styles.header}>Sélectionnez la distance</Text>
                    <Text style={styles.description}>
                        Nous afficherons les points de collecte dans ce rayon
                    </Text>
                    <RadioGroup
                        selectedIndex={props.selectedIndex}
                        onChange={(index: any) => {
                            props.setVisible(false);
                            props.setSelectedIndex(index);
                            props.updateRadius(
                                (props.distances[index] / 2) * 1000
                            );
                        }}
                    >
                        {radioDistance}
                    </RadioGroup>
                </Card>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1 items-center`,
    cardContainer: tw`rounded-3xl`,
    container: tw`max-h-2`,
    backdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    header: tw`font-bold m-auto mb-2 text-lg`,
    description: tw`font-light text-slate-500 text-sm mb-2`,
});

export default ChooseKm;

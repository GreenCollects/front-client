import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";

import { crossIcon, heartIcon, minusIcon } from "../icons/icons";
import { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import { getAllWasteType } from "../api/waste";

export const nameOrAddress = (address: any) => {
    if (address.name !== address.subThoroughfare) {
        return address.name;
    } else {
        return address.subThoroughfare + " " + address.thoroughfare;
    }
};
const CardDetails = (props: any) => {
    const token = useSelector((state: RootState) => state.authentication.token);

    const headerDetails = () => (
        <View style={tw`flex-row justify-between items-center ml-6 pt-2`}>
            <View>
                <Text category="h6">{nameOrAddress(props.address)}</Text>
            </View>
            <Button
                appearance="ghost"
                status="basic"
                accessoryLeft={crossIcon}
                onPress={props.deselect}
            />
        </View>
    );

    const footerDetails = () => (
        <View>
            <View style={tw`flex-row justify-around`}>
                <Button
                    appearance="ghost"
                    status="danger"
                    accessoryLeft={minusIcon}
                />
                <Button
                    appearance="ghost"
                    status="success"
                    accessoryLeft={heartIcon}
                />
            </View>
        </View>
    );

    return (
        <Card
            status="success"
            header={headerDetails}
            footer={footerDetails}
            style={styles.cardDetail}
            // disabled
            accessible={false}
        >
            <View>
                <Text>
                    Déchets :
                    {props.marker.wastes.map((index: number) => {
                        return " " + props.wasteLabels[index - 1];
                    })}
                </Text>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardDetail: tw`absolute w-5 bottom-0  w-full`,
});

export default CardDetails;

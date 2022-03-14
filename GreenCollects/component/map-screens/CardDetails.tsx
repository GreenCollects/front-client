import React, { useEffect, useState, FC } from "react";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";

import { CrossIcon, ArrowDownIcon, ArrowUpIcon } from "../icons/icons";
import { RootState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllWasteType } from "../api/waste";
import { getRating, changeRating } from "../api/rating";

export const nameOrAddress = (address: any) => {
    if (address.name !== address.subThoroughfare) {
        return address.name;
    } else {
        return address.subThoroughfare + " " + address.thoroughfare;
    }
};

type PropsType = {
    marker: any;
    address: string;
    wasteLabels: [];
    deselect?: () => void;
};

const CardDetails: FC<PropsType> = ({marker, address, wasteLabels, deselect}) => {
    const authentication = useSelector((state: RootState) => state.authentication);

    const [rating, setRating] = useState({
        "idPoint": 0,
        "rate": 0,
        "denominator": 10
    });

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Token " + authentication.token);

    useEffect(() =>{
        const getRatingFromApi = async () => {
            const data: any = await getRating(headers, marker.id);
            if (data !== undefined) {
                setRating(data);
            }
        }
        
        getRatingFromApi().catch((err) => (console.log(err)));
    }, [getRating])

    const headerDetails = () => (
        <View style={tw`flex-row justify-between items-center ml-6 pt-2`}>
            <View>
                <Text category="h6">{nameOrAddress(address)}</Text>
            </View>
            <Button
                appearance="ghost"
                status="basic"
                accessoryLeft={CrossIcon}
                onPress={deselect}
            />
        </View>
    );

    const handleRateUp = () => {
        changeRating(headers, JSON.stringify({
            "point": marker.id,
            "user": authentication.user.id,
            "rate": 10
        }));
    }

    const handleRateDown = () => {
        changeRating(headers, JSON.stringify({
            "point": marker.id,
            "user": authentication.user.id,
            "rate": 0
        }));
    }

    const footerDetails = () => (
        <View>
            <View style={tw`flex-row justify-around`}>
                <Button
                    appearance="ghost"
                    status="success"
                    accessoryLeft={ArrowUpIcon}
                    onPress={() => handleRateUp()}
                />
                {
                    rating.idPoint !== 0 &&
                    <Text>{rating.rate} / {rating.denominator}</Text>
                }
                <Button
                    appearance="ghost"
                    status="danger"
                    accessoryLeft={ArrowDownIcon}
                    onPress={() => handleRateDown()}
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
                    {marker.wastes.map((index: number) => {
                        return " " + wasteLabels[index - 1];
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

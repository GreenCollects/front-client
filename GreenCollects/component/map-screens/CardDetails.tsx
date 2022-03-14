import React, { useEffect, useState, FC } from "react";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";

import { CrossIcon, ArrowDownIcon, ArrowUpIcon } from "../icons/icons";
import { RootState } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllWasteType } from "../api/waste";
import { getRating } from "../api/rating";

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
    const token = useSelector((state: RootState) => state.authentication.token);

    const [rating, setRating] = useState({
        "idPoint": 0,
        "rate": 0,
        "denominator": 10
    });

    useEffect(() =>{
        const getRatingFromApi = async () => {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Token " + token);

            const data: any = await getRating(headers, marker.id);
            if (data !== undefined) {
                setRating(data);
            }
        }
        
        getRatingFromApi()
    }, [getRating, rating])

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

    const footerDetails = () => (
        <View>
            <View style={tw`flex-row justify-around`}>
                <Button
                    appearance="ghost"
                    status="success"
                    accessoryLeft={ArrowUpIcon}
                />
                {
                    rating.idPoint !== 0 &&
                    <Text>{rating.rate} / {rating.denominator}</Text>
                }
                <Button
                    appearance="ghost"
                    status="danger"
                    accessoryLeft={ArrowDownIcon}
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

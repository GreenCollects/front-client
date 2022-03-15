import React, { useEffect, useState, FC } from "react";
import { Button, Card, Text, Spinner, Layout } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";

import { CrossIcon, ArrowDownIcon, ArrowDownFillIcon, ArrowUpFillIcon, ArrowUpIcon } from "../icons/icons";
import { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import { getRateAvarage, changeRating, getRatingForCurrentUser, deleteRating, setRating } from "../api/rating";

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

    const [infoRating, setInfoRating] = useState({
        "idPoint": 0,
        "rate": 0,
        "denominator": 10
    });
    const [myRating, setMyRating] = useState(null as any);
    const [loading, setLoading] = useState(true);

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Token " + authentication.token);

    useEffect(() => {
        const getRatingFromApi = async () => {
            const data: any = await getRateAvarage(headers, marker.id);
            setInfoRating(data);
        }
        getRatingFromApi().catch((err) => (console.log(err)));

        const getMyRating = async () => {
            const data: any = await getRatingForCurrentUser(headers, marker.id);
            setMyRating(data);
        }
        getMyRating().catch((err) => (console.log(err)));

    }, [getRateAvarage, getRatingForCurrentUser]);

    useEffect(() => {
        if (infoRating.idPoint != 0) {

            setLoading(false);
        } 
        else {
            setLoading(true);
        }
    }, [infoRating])

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
        if (myRating) {
            if (myRating.rate !== 10) {
                const rating = {...myRating, "rate": 10};
                changeRating(headers, myRating.id, rating);
                setMyRating(rating);
            } else {
                deleteRating(headers, myRating.id);
                setMyRating(null);
            }
        } else {
            const rating = {
                "point": marker.id,
                "user": authentication.user.id,
                "rate": 10
            };
            setRating(headers, rating);
        }
    }

    const handleRateDown = () => {
        if (myRating) {
            if (myRating.rate !== 0) {
                const rating = {...myRating, "rate": 0};
                changeRating(headers, myRating.id, rating);
                setMyRating(rating);
            } else {
                deleteRating(headers, myRating.id);
                setMyRating(null);
            }
        } else {
            const rating = {
                "point": marker.id,
                "user": authentication.user.id,
                "rate": 0
            };
            setRating(headers, rating);
        }
    }

    const renderIconDown = () => {
        if (myRating && myRating.rate < 5)
            return (ArrowDownFillIcon)
        else
            return (ArrowDownIcon)
    }

    const renderIconUp = () => {
        if (myRating && myRating.rate > 5)
            return (ArrowUpFillIcon)
        else
            return (ArrowUpIcon)
    }

    const footerDetails = () => (
        (!loading ?
            (<View style={tw`flex-row justify-around`}>
                    <Button
                        appearance="ghost"
                        status="success"
                        accessoryLeft={renderIconUp()}
                        onPress={() => handleRateUp()}
                    />
                    {
                        infoRating.idPoint !== 0 &&
                        <Text>{infoRating.rate} / {infoRating.denominator}</Text>
                    }
                    <Button
                        appearance="ghost"
                        status="danger"
                        accessoryLeft={renderIconDown()}
                        onPress={() => handleRateDown()}
                    />
            </View>): (
                    <View style={styles.container}>
                        <Spinner/>
                    </View>
            )
        )
    );

    return (
        <Card
            status="success"
            header={headerDetails}
            footer={footerDetails}
            style={styles.cardDetail}
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
    container: tw`flex-row justify-around`
});

export default CardDetails;

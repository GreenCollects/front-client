import React, { useEffect, useState, FC } from "react";
import { Button, Card, Text, Spinner, Layout } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import tw from "twrnc";

import {
    CrossIcon,
    ArrowDownIcon,
    ArrowDownFillIcon,
    ArrowUpFillIcon,
    ArrowUpIcon,
} from "../icons/icons";
import { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import {
    getRateAvarage,
    changeRating,
    getRatingForCurrentUser,
    deleteRating,
    setRating,
} from "../api/rating";

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

const CardDetails: FC<PropsType> = ({
    marker,
    address,
    wasteLabels,
    deselect,
}) => {
    let now = Date.now();
    const DELAY = 300;

    const authentication = useSelector(
        (state: RootState) => state.authentication
    );

    const [infoRating, setInfoRating] = useState({
        idPoint: 0,
        rate: 0,
        denominator: 10,
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
        };
        getRatingFromApi().catch((err) => console.log(err));
    }, [myRating]);

    useEffect(() => {
        const getMyRating = async () => {
            const data: any = await getRatingForCurrentUser(headers, marker.id);
            setMyRating(data);
        };
        getMyRating().catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (infoRating.idPoint != 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [infoRating]);

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
        if (Date.now() > now + DELAY) {
            now = Date.now();

            if (myRating) {
                if (myRating.rate !== 10) {
                    const rating = { ...myRating, rate: 10 };
                    const postChangeRating = async () => {
                        const data = await changeRating(
                            headers,
                            myRating.id,
                            JSON.stringify(rating)
                        );
                        if (data !== undefined) {
                            setMyRating(rating);
                        }
                    };
                    postChangeRating().catch((err) => console.log(err));
                } else {
                    deleteRating(headers, myRating.id);
                    setMyRating(null);
                }
            } else {
                const rating = {
                    point: marker.id,
                    user: authentication.user.id,
                    rate: 10,
                };

                const postRating = async () => {
                    const response_rating = await setRating(
                        headers,
                        JSON.stringify(rating)
                    );
                    if (response_rating !== undefined) {
                        const data = await getRatingForCurrentUser(
                            headers,
                            marker.id
                        );

                        if (data !== undefined) {
                            setMyRating(data);
                        }
                    }
                };

                postRating().catch((err) => console.log(err));
            }
        }
    };

    const handleRateDown = () => {
        if (Date.now() > now + DELAY) {
            now = Date.now();
            if (myRating) {
                if (myRating.rate !== 0) {
                    const rating = { ...myRating, rate: 0 };
                    const postChangeRating = async () => {
                        const data = await changeRating(
                            headers,
                            myRating.id,
                            JSON.stringify(rating)
                        );
                        if (data !== undefined) {
                            setMyRating(rating);
                        }
                    };

                    postChangeRating().catch((err) => console.log(err));
                } else {
                    const postDeleteRating = async () => {
                        await deleteRating(headers, myRating.id);
                        setMyRating(null);
                    };
                    postDeleteRating().catch((err) => console.log(err));
                }
            } else {
                const rating = {
                    point: marker.id,
                    user: authentication.user.id,
                    rate: 0,
                };

                const postRating = async () => {
                    const response_rating = await setRating(
                        headers,
                        JSON.stringify(rating)
                    );
                    if (response_rating !== undefined) {
                        const data = await getRatingForCurrentUser(
                            headers,
                            marker.id
                        );

                        if (data !== undefined) {
                            setMyRating(data);
                        }
                    }
                };

                postRating().catch((err) => console.log(err));
            }
        }
    };

    const footerDetails = () =>
        !loading ? (
            <View style={tw`flex-row justify-around`}>
                <Button
                    appearance="ghost"
                    status="success"
                    accessoryLeft={
                        myRating?.rate > 5 ? (
                            <ArrowUpFillIcon />
                        ) : (
                            <ArrowUpIcon />
                        )
                    }
                    onPress={handleRateUp}
                />
                {infoRating.idPoint !== 0 && (
                    <Text>
                        {infoRating.rate} / {infoRating.denominator}
                    </Text>
                )}
                <Button
                    appearance="ghost"
                    status="danger"
                    accessoryLeft={
                        myRating?.rate < 5 ? (
                            <ArrowDownFillIcon />
                        ) : (
                            <ArrowDownIcon />
                        )
                    }
                    onPress={handleRateDown}
                />
            </View>
        ) : (
            <View style={styles.container}>
                <Spinner />
            </View>
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
    container: tw`flex-row justify-around`,
});

export default CardDetails;

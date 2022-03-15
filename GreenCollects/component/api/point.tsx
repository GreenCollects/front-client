import React from "react";
import Toast from "react-native-root-toast";

import environment from "../../environment";
import HTTP_MAP_ERROR_CODE from "./errors";

const API_POINT_URL = "/api/points/";
const API_CIRCLE_SEARCH_URL = "/api/pointArea/"

export const createPoint = async (headers: Headers, body: any) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_POINT_URL,
        {
            method: "POST",
            headers: headers,
            body: body,
        }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                Toast.show(HTTP_MAP_ERROR_CODE[response.status], {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#f13e71",
                    textColor: "#fff",
                });
            }
        })
        .catch((err) => {
            Toast.show(HTTP_MAP_ERROR_CODE[503], {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: "#f13e71",
                textColor: "#fff",
            });
        });

    return brut_response;
};

export const getPoints = async (headers: Headers) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_POINT_URL,
        {
            method: "GET",
            headers: headers,
        }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                Toast.show(HTTP_MAP_ERROR_CODE[response.status], {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#f13e71",
                    textColor: "#fff",
                });
            }
        })
        .catch((err) => {
            Toast.show(HTTP_MAP_ERROR_CODE[503], {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: "#f13e71",
                textColor: "#fff",
            });
        });

    return brut_response;
};


export const getPointsInCircle = async (headers: Headers, body: any) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_CIRCLE_SEARCH_URL,
        {
            method: "POST",
            headers: headers,
            body: body,
        }
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                Toast.show(HTTP_MAP_ERROR_CODE[response.status], {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#f13e71",
                    textColor: "#fff",
                });
            }
        })
        .catch((err) => {
            Toast.show(HTTP_MAP_ERROR_CODE[503], {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: "#f13e71",
                textColor: "#fff",
            });
        });
    return brut_response;
};
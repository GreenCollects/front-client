import React from "react";
import Toast from "react-native-root-toast";

import env from "../../environment";

import HTTP_MAP_ERROR_CODE from "./errors";

const API_POINT_URL = "/api/rating/";

export const getRating = async (headers: Headers, idPoint : number) => {
    const url = `${env.SERVER_API_URL}${API_POINT_URL}point/${idPoint}`;
    const brut_response = await fetch(
        url,
        {
            method: "GET",
            headers: headers
        }
    ).then((response) => {
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
    }).catch((err) => {
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
}
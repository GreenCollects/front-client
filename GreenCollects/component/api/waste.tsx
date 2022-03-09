import React from "react";
import Toast from "react-native-root-toast";

import environment from "../../environment";
import HTTP_MAP_ERROR_CODE from "./errors";

const API_WASTE_URL = "/api/waste/";

export const getAllWasteType = async (headers: Headers) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_WASTE_URL,
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

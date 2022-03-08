import React from "react";

import environment from "../../environment";

import HTTP_MAP_ERROR_CODE from "./errors";

import Toast from "react-native-root-toast";

const API_ACCOUNT_URL = "/api/account/";

export const login = async (headers: Headers, body: any) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_ACCOUNT_URL + "login/",
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

export const logout = async (headers: Headers, body: any) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_ACCOUNT_URL + "logout/",
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

export const getCurrentUser = async (headers: Headers) => {
    const brut_response = await fetch(
        environment.SERVER_API_URL + API_ACCOUNT_URL + "current-user/",
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

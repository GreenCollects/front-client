import React from "react";
import Toast from "react-native-root-toast";

import env from "../../environment";

import HTTP_MAP_ERROR_CODE from "./errors";

const API_POINT_URL = "/api/rating/";

export const getRateAvarage = async (headers: Headers, idPoint: number) => {
    const url = `${env.SERVER_API_URL}${API_POINT_URL}point/${idPoint}/`;
    const brut_response = await fetch(url, {
        method: "GET",
        headers: headers,
    })
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

export const getRatingForCurrentUser = async (
    headers: Headers,
    idPoint: number
) => {
    const url = `${env.SERVER_API_URL}${API_POINT_URL}point/${idPoint}/user/`;
    const brut_response = await fetch(url, {
        method: "GET",
        headers: headers,
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 204) {
                return undefined;
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

export const setRating = async (headers: Headers, body: any) => {
    const url = `${env.SERVER_API_URL}${API_POINT_URL}`;
    const brut_response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
    })
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

export const changeRating = async (headers: Headers, id: number, body: any) => {
    const url = `${env.SERVER_API_URL}${API_POINT_URL}${id}/`;
    const brut_response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body,
    })
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

export const deleteRating = async (headers: Headers, id: number) => {
    const url = `${env.SERVER_API_URL}${API_POINT_URL}${id}/`;
    const brut_response = await fetch(url, {
        method: "DELETE",
        headers: headers,
    })
        .then((response) => {
            if (response.ok) {
                return {};
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

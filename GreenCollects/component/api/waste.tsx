import React from "react";

const API_BASE_URL = "http://192.168.1.15:8000/api/";
const API_WASTE_URL = "waste/";

export const getAllWasteType = async (headers: Headers) => {
    const response = await fetch(API_BASE_URL + API_WASTE_URL, {
        method: "GET",
        headers: headers,
    })
        .then((data) => data.json())
        .then((data) => data)
        .catch((err) => err);

    return response;
};

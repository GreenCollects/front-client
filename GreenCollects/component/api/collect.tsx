import React from "react";

const API_BASE_URL = "http://192.168.1.15:8000/api/";
const API_WASTE_URL = "communityCollect/";

export const createCollect = (headers: Headers, body: any) => {
    fetch(API_BASE_URL + API_WASTE_URL, {
        method: "POST",
        headers: headers,
        body: body,
    })
        .then((data) => data.json)
        .then((data) => data)
        .catch((err) => err);
};

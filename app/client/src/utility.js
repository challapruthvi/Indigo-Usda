import { Dropdown } from "react-bootstrap";
import React from "react";

export const generateUrl = (url, query) => {
    let finalQuery = query;
    const queryStringArr = [];
    if (finalQuery && (finalQuery.hasOwnProperty('crop') && finalQuery.crop) === 'All') {
        delete finalQuery.crop;
    }
    for (let prop in finalQuery) {
        queryStringArr.push(`${prop}=${finalQuery[prop]}`);
    }
    const actualQuery = queryStringArr.join('&');
    return `${url}?${actualQuery}`;
};

export const getStateList = () => {
    const states = ["AL", "AR", "CA", "CO", "DE", "GA", "IA", "IL", "IN", "KS", "KY", "LA", "MD", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NJ", "NM", "NY", "OH", "OK", "PA", "SC", "SD", "TN", "TX", "VA", "WA", "WI", "WV", "WY"];
    return (states.map(each => <Dropdown.Item eventKey={each}>{each}</Dropdown.Item>));
}
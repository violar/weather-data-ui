import * as ActionTypes from './ActionTypes';
import fetch from 'node-fetch';
import xmljs from 'xml-js';

const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?mode=xml&appid=27c1020f006d731f8b834340d2d9b85a';
const ipUrl = 'http://ip-api.com/json';

export const apiSuccess = (payload) => {
    return {
        type: ActionTypes.API_SUCCESS,
        payload
    }
};

export const apiFail = (payload) => {
    return {
        type: ActionTypes.API_FAIL,
        payload
    }
};

export const apiStarted = () => {
    return {
        type: ActionTypes.API_STARTED
    }
};

export const fetchWeatherData = () => {
    return (dispatch) => {
        dispatch(apiStarted());
        
        return fetchCityFromApi()
            .then(city => fetchWeatherFromApi(city, dispatch))
            .catch(error => {
                dispatch(apiFail(error.message));
            });
  };
};

const fetchWeatherFromApi = (city, dispatch) => {
    return fetch(weatherUrl + "&q=" + city)
            .then(response => response.text())
            .then(response => {
                dispatch(apiSuccess(xmljs.xml2json(response, {compact: true})))
            })
            .catch(error => {
                dispatch(apiFail(error.message));
            });
};

const fetchCityFromApi = () => {
    return fetch(ipUrl)
        .then(response => response.json())
        .then(response => response.city)
        .catch(error => {
            throw(error);
        });
};
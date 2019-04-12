import axios from "axios";
import { environment } from "../../environment";

export const moviesList = page => {
    return axios
        .get(environment.API_URL + page)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            return error.response;
        });
};

export const moviesSearchList = search => {
    return axios
        .get(environment.MOVIE_SEARCH + "&query=" + search)
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            return error.response;
        });
};

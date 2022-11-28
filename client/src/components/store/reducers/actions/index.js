import axios from 'axios';

import {GET_GAMES, GET_GENRES, SEARCH_NAME, ORDER, FILTER, GAMES_DETAIL} from './funciones';

export function getGames(){
    return function (dispatch){
        return axios
        .get("/videogames/")
        .then((response)=>{
            dispatch({type: GET_GAMES, payload:response.data});
        })
        .catch((err)=>{
            return err
        });
    };

};

export function getGenres (){
    return function(dispatch){
        axios.get(`/genres`)
        .then((res)=>{
            dispatch({type:GET_GENRES, payload:res.data})
        })
        .catch((err)=>{
            return err
        });
    };
};

export function searchForName(name){
    return function(dispatch){
        return axios.get(`/videogame?name=${name}`)
        .then((res)=>{
            dispatch({type: SEARCH_NAME, payload:res.data})
        })
        .catch((err)=>{
            return err;
        });
    };
};

export function orderBy(order){
    return function(dispatch){
        dispatch({type:ORDER, payload:or});
    };
};

export function filterBy(order){
    return function(dispatch){
        dispatch({type:FILTER, payload:order});
    };
};

export function detailGame(id){
    return function(dispatch){
        axios.get(`/videogame/${id}`)
        .then((res)=>{
            dispatch({type:GAMES_DETAIL, payload:res.data})
        })
        .catch((err)=>{
            return err
        })
    }
}
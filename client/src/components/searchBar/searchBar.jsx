import {React, useState}from 'react';
import { connect } from 'react-redux';
import {searchForName, getGames} from '../store/reducers/actions/index';

function searchBar({searchForName, getGames}){

    const[input,setInput]=useState({search:''});

    const handleInput= function(e){
        setInput({
            [e.target.name]: e.target.value
        });
    }

    const handleOnClick=()=>
    searchForName(input.search)
    setInput({
        search: ''
    });

    const handleOnClickO = () =>{
        getGames()
        setInput({
            search: ''
        });
    }
    return(
        <div className="searching">
            <input className="bar" name="search" pleacheholder="game to search" onChange={handleInput} value={input.search}>
            </input>
            <button className="button" onClick={handleOnClick}>Search</button>
            <button className="button" onClick={handleOnClickO}>All Games</button>
            
        </div>
    )
}

export default connect(null,{searchForName, getGames})(searchBar)
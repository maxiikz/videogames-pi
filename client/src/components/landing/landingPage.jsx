import React from 'react'
import { Link } from 'react-router-dom';



export default function landingPage(){
    return(
        <div>
            <Link to="/videogames">
                <button className="button">C'mon, to search games</button>
            </Link>
        </div>
    )
}
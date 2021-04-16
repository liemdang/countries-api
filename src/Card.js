import React from 'react'
import "./Card.css"
import { Link } from "react-router-dom"

const Card = ({flag, name, population, region, capital, numericCode}) => {
    return (
        <Link to={`/country/${name}`}  className="card">
            <img src={flag} alt={name} key={numericCode}/>
            <div className="card__shortInfo">
                <h3>{name}</h3>
                <p><span className="card__shortInfo-criteria">Population:</span> {population}</p>
                <p><span className="card__shortInfo-criteria">Region:</span> {region}</p>
                <p><span className="card__shortInfo-criteria">Capital:</span> {capital}</p>
            </div>
        </Link>
    )
}

export default Card

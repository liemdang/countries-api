import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import "./CountryDetails.css"
const CountryDetails = (props) => {
    const [country, setCountry] = useState([])
    useEffect(async () => {
        const result = await axios(
            `https://restcountries.eu/rest/v2/name/${props.match.params.name}`
        )
        setCountry(result.data[0])
        console.log(country)
    }, [country])
    return (
        <div>
        <Link to="/">
            <button>Back</button> 
        </Link>
        
        {country &&
        <div className="countryDetails">
            <img className="countryDetails__flag" src={country.flag} alt={country.name} />
            <div className="countryDetails__description">
                <h2 className="countryDetails__description-name">{country.name}</h2>
                <div className="countryDetails__description-container">
                    <div className="countryDetails__description-column1">
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Native Name: </span> {country.nativeName}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Population: </span>{country.population}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Region: </span>{country.region}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Sub Region: </span>{country.subregion}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Capital: </span>{country.capital}
                        </p>
                        {/* <div><p>Border Countries: </p></div> */}
                    </div>
                    <div className="countryDetails__description-column2">
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Top Level Domain: </span>{country.topLevelDomain}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Currencies: </span>{country.currencies && country.currencies[0].name}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__descritpion-criteria">Languages: </span>{country.languages && country.languages.map(element => element.name + ", ")}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    }
        </div>
    )
}

export default CountryDetails

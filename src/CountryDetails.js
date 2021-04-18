import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import "./CountryDetails.css"
import { IoIosArrowRoundBack } from "react-icons/io"

const CountryDetails = (props) => {
    const [country, setCountry] = useState([])
    const [borderCountries, setBorderCountries] = useState([])
    let borderCountriesAPI 
    
    useEffect(async () => {
        const result = await axios(
            `https://restcountries.eu/rest/v2/name/${props.match.params.name}`
        )
        setCountry(result.data[0])
        
        
        
    }, [country])
    
    setBorderCountries(country.borders)
    console.log(borderCountries)
    return (
        <div>
        
        
        {country &&
        <div className="countryDetails__container">
            <Link to="/" className="link-button">
            <button><IoIosArrowRoundBack className="btn-arrow"/><p>Backi</p></button> 
        </Link>
        <div className="countryDetails">
            <img className="countryDetails__flag" src={country.flag} alt={country.name} />
            <div className="countryDetails__description">
                <h2 className="countryDetails__description-name">{country.name}</h2>
                <div className="countryDetails__description-container">
                    <div className="countryDetails__description-column1">
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Native Name: </span> {country.nativeName}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Population: </span>{country.population}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Region: </span>{country.region}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Sub Region: </span>{country.subregion}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Capital: </span>{country.capital}
                        </p>
                        {/* <div><p>Border Countries: </p></div> */}
                    </div>
                    <div className="countryDetails__description-column2">
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Top Level Domain: </span>{country.topLevelDomain}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Currencies: </span>{country.currencies && country.currencies[0].name}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Languages: </span>{country.languages && country.languages.map(element => element.name + ", ")}
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>
    }
        </div>
    )
}

export default CountryDetails

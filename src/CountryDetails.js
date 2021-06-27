import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import "./CountryDetails.css"
import { IoIosArrowRoundBack } from "react-icons/io"
import { css } from "@emotion/core"
import MoonLoader from "react-spinners/MoonLoader"

const override = css`
display: block;
position: fixed;
top: 45%;
left: 50%;
`; 

const CountryDetails = (props) => {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    const [borderCountries, setBorderCountries] = useState([])
    const [borderCountryNames, setBorderCountryNames] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `https://restcountries.eu/rest/v2/name/${props.match.params.name}?fullText=true`
            )
            setCountry(result.data[0])
            setBorderCountries(country.borders) 
        }
        fetchData()
    }, [country, props.match.params.name])
       
    useEffect(() => {
        const getBorderCountries = async() => {
            if(borderCountries !== undefined) {
                let borderCountriesResult = []
                if(borderCountries.length === 0) {
                    setLoading(false)
                }
                for( let i = 0; i < borderCountries.length; i++ ) {
                    var result = await axios.get(`https://restcountries.eu/rest/v2/alpha/${borderCountries[i]}`)
                    .then(result !== undefined ? borderCountriesResult.push(result.data.name) : null)
                }
                setBorderCountryNames(borderCountriesResult) 
            } 
        }
       
        getBorderCountries()
    }, [borderCountries, borderCountryNames])

    return (
        <div>
        {loading ? <MoonLoader loading={loading} css={override}/> :
        <div className="countryDetails__container">
            <Link to="/" className="link-button">
            <button className="btn"><IoIosArrowRoundBack className="btn-arrow"/><p>Back</p></button> 
        </Link>
        <div className="countryDetails">
            <img className="countryDetails__flag" src={country.flag} alt={country.name} />
            <div className="countryDetails__description">
                
                <div className="countryDetails__description-container">
                    <div>
                    <h2 className="countryDetails__description-name">{country.name}</h2>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Native Name:&nbsp; </span> {country.nativeName}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Population:&nbsp;</span> {country.population}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Region:&nbsp;</span> {country.region}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Sub Region:&nbsp;</span> {country.subregion}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Capital:&nbsp;</span> {country.capital}
                        </p>
                    </div>
                    <div className="countryDetails__description-column2">
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Top Level Domain:&nbsp;</span>{country.topLevelDomain}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Currencies:&nbsp;</span>{country.currencies && country.currencies[0].name}
                        </p>
                        <p className="countryDetails__description-info">
                            <span className="countryDetails__description-criteria">Languages:&nbsp; </span>{country.languages && country.languages.map((language) => {
                                return language.name;
                            })
                            .join(" ")
                            .replace(/\s/g, ", ")}
                        </p>
                        
                    </div>
                    
                </div>
                {borderCountryNames.length > 0 ?
                (<div className="countryDetails__description-info countryDetails__bCountries">
                    <p className="countryDetails__description-criteria bCountries">Border Countries: </p>
                        {borderCountryNames.map(country => {
                            return <button key={country} className="countryDetails__borderCountries">{country}</button>
                        })}
                    </div>) : null}
                </div>

        </div>
        </div>
    }
        </div>
    )
}

export default CountryDetails

import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import Card from "./Card"
import "./Startpage.css"
import { AiOutlineSearch } from 'react-icons/ai'
import { css } from "@emotion/core"
import MoonLoader from "react-spinners/MoonLoader"

const override = css`
display: block;
position: fixed;
top: 45%;
left: 50%;
`; 
const Overview = () => {
    const [data, setData] = useState([])
    const [regionCountries, setRegionsCountries] = useState([])
    const [regionSelected, setRegionSelected] = useState(false)
    const [searchedCountries, setSearchedCountries] = useState([])
    const inputEl = useRef(null)
    const filterEl = useRef(null)
    const searchInput = inputEl.current && inputEl.current.value
    let [loading, setLoading] = useState(true)
        useEffect(async () => {
            const result = await axios(
                "https://restcountries.eu/rest/v2/all"
            ).then(setLoading(false))
            setData(result.data)
        }, [data])

        function searchCountry(e) {
            if(regionSelected) {
                countries = data
                if(searchInput !== "") {
                    countries = data
                    setSearchedCountries(data.filter(searchFilter))
                } else {
                    countries = data
                    setRegionsCountries(data.filter((country) => filterEl.current.value === country.region))
                }
                
            } 
            else {
                countries = data
                setSearchedCountries(countries.filter((country) => country.name.toLowerCase().includes(searchInput.toLowerCase())))
            }
        }
        function searchFilter(land) {
           if(filterEl.current.value === land.region && land.name.toLowerCase().includes(searchInput.toLowerCase())) {
               return land
           }
        }
        
        function changeRegion(e) {
            if(e.target.value === "Africa"
             || e.target.value === "Americas"
             || e.target.value === "Asia"
             || e.target.value === "Europe"
             || e.target.value === "Oceania"
            ){
                setRegionSelected(true)
                if(searchInput !== "") {
                    countries = data
                    setSearchedCountries(countries.filter(searchFilter))
                } else {
                    countries = data
                    setRegionsCountries(countries.filter((country) => e.target.value === country.region))   
                }
                 
            } else {
                setRegionSelected(false)
                if(searchInput !== "") {
                    countries = data
                    setSearchedCountries(data.filter((country) => country.name.toLowerCase().includes(searchInput.toLowerCase())))
                }
                setRegionsCountries([])
            } 
        }

        let countries = data
        if( searchInput !== "") {
            countries = searchedCountries
        } else if(regionSelected && searchInput !== "") {
            countries = searchedCountries
        } else if(regionSelected && searchInput === "") {
            countries = regionCountries
        } else {       
            countries = data
        }

        return (
                <div className="all">
                    {loading ? <MoonLoader css={override} loading={loading} /> :
            <div className="startpage">   
                <div className="startpage__searchcontainer">
                    <div className="startpage__searchcontainer-searchbar">
                        <AiOutlineSearch className="startpage__searchcontainer-searchIcon"/>
                        <input ref={inputEl} onChange={searchCountry} type="text" className="startpage__searchcontainer-searchInput" placeholder="Seach for a country..."></input>
                    </div>
                    
                    <select ref={filterEl} className="startpage__searchcontainer-filter" name="region"  onChange={changeRegion}>
                    <option className="liem" value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                </div>
                
                <div className="overview">
                    {countries.map((element) => (
                        <Card 
                            key={element.numericCode}
                            flag={element.flag} 
                            name={element.name} 
                            population={element.population} 
                            region={element.region} 
                            capital={element.capital}/>
                    ))}
                    
                </div>
            </div>
            }
            </div>
            
            
        )
    }
 

export default Overview


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
    
        useEffect(() => {
            const fetchData = async () => {
                const result = await axios(
                    "https://restcountries.eu/rest/v2/all"
                ).then(setLoading(false))
                setData(result.data)
            }
            fetchData()
        }, [data])

        function searchCountry() {
            countries = data
            if(regionSelected) {
                if(inputEl.current.value !== "") {
                    setSearchedCountries(countries.filter(searchFilter))
                } else {
                    countries = data
                    setRegionsCountries(countries.filter((country) => filterEl.current.value === country.region))
                }
                
            } 
            else {
                setSearchedCountries(countries.filter((country) => country.name.toLowerCase().includes(inputEl.current.value.toLowerCase())))
            }
        }
        function searchFilter(land) {
           if(filterEl.current.value === land.region && land.name.toLowerCase().includes(inputEl.current.value.toLowerCase())) {
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
                countries = data
                setRegionSelected(true)
                if(inputEl.current.value !== "") {
                    setSearchedCountries(countries.filter(searchFilter))
                } else {
                    setRegionsCountries(countries.filter((country) => e.target.value === country.region))   
                }
                 
            } else {
                setRegionSelected(false)
                if(inputEl.current.value !== "") {
                    setSearchedCountries(data.filter((country) => country.name.toLowerCase().includes(inputEl.current.value.toLowerCase())))
                }
                setRegionsCountries([])
            } 
        }

        let countries 
        if( searchInput !== "") {
            countries = searchedCountries
        } else if(regionSelected && inputEl.current.value !== "") {
            countries = searchedCountries
        } else if(regionSelected && inputEl.current.value === "") {
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
                        <input ref={inputEl} aria-label="searchIinput" onChange={searchCountry} type="text" className="startpage__searchcontainer-searchInput" placeholder="Seach for a country..."></input>
                    </div>
                    
                    <select ref={filterEl} aria-label="filter-dropdown" className="startpage__searchcontainer-filter" a name="region"  onChange={changeRegion}>
                    <option  value="All">All</option>
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


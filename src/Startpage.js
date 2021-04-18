import React, { useState, useEffect } from 'react'
import axios from "axios"
import Card from "./Card"
import "./Startpage.css"
import { AiOutlineSearch } from 'react-icons/ai'

const Overview = () => {
    const [data, setData] = useState([])
    const [regionCountries, setRegionsCountries] = useState([])
    const [searchedCountries, setSearchedCountries] = useState([])
    const [inputEmpty, setInputEmpty] = useState(true)
        useEffect(async () => {
            const result = await axios(
                "https://restcountries.eu/rest/v2/all"
            )
            setData(result.data)
        }, [data])

        function searchCountry(e) {
            if(e.target.value !== "") {
                setInputEmpty(false)
            } else {
                setInputEmpty(true)
            }
            
            console.log(...regionCountries)
            if(regionCountries.length > 0) {
                setSearchedCountries(regionCountries.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase())) )
            } 
            else {
                setSearchedCountries(data.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase())) )
            }
            
        }

        function test(e) {
            console.log(e.target.value)
            if(e.target.value === "Africa"
             || e.target.value === "Americas"
             || e.target.value === "Asia"
             || e.target.value === "Europe"
             || e.target.value === "Oceania"
            ){
                setRegionsCountries(countries.filter((country) => e.target.value === country.region ))
            } else {
                setRegionsCountries([])
            } 
        }
        let countries

       if(regionCountries.length > 0 && inputEmpty === false) {
            countries = searchedCountries
           
       } else if(regionCountries.length > 0) {
           
           countries = regionCountries
       }  else if(inputEmpty === false && regionCountries.length === 0) {
           countries = searchedCountries
       } else {
           countries = data
       }
        return (
            <div className="all">
            <div className="startpage">   
                <div className="startpage__searchcontainer">
                    <div className="startpage__searchcontainer-searchbar">
                        <AiOutlineSearch className="startpage__searchcontainer-searchIcon"/>
                        <input onChange={searchCountry} type="text" className="startpage__searchcontainer-searchInput" placeholder="Seach for a country..."></input>
                    </div>
                    
                    <select className="startpage__searchcontainer-filter" name="region"  onChange={test}>
                    <option className="liem" value="">All</option>
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
            </div>
        )
    }
 

export default Overview


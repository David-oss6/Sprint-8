import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavesBtn } from './styled'

export default function Characters({ setPersonajeDetalle, chars }) {
    const [char, setChar] = useState()
    async function getVehicles(x) {
        var nav = "";
        const d = await Promise.all(x.vehicles.map(async (el) => {
            var r = await axios.get(el)
            r = r.data.name
            nav += r + ", ";
            return r;
        }))
        return nav
    }

    async function getStarships(x) {
        var nav = [];
        const d = await Promise.all(x.starships.map(async (el) => {
            var r = await axios.get(el)
            var t = r.data.name
            var u = r.data.url
            const newNave = {
                name: t,
                url: u
            }
            nav.push(newNave);
            return r;
        }))
        return nav
    }

    async function getPelis(x) {
        var pelis = [];
        const d = await Promise.all(x.films.map(async (el) => {
            var r = await axios.get(el)
            var t = r.data.title
            var u = r.data.url
            const newPeli = {
                title: t,
                url: u
            }
            pelis.push(newPeli);
            return r;
        }))
        return pelis
    }

    const detalleChar = async (name) => {
        const persona = chars.filter(element => {
            return element.name === name;
        })
        var x = persona[0]

        const homeworld = await axios.get(x.homeworld).then(res => res.data.name)
        const starships = await getStarships(x)
        const vehicles = await getVehicles(x)
        const films = await getPelis(x)
        const results = Promise.all([homeworld, starships, vehicles, films]).then(values => console.log(values))

        const newChar = {
            name: x.name,
            birth: x.birth_year,
            gender: x.gender,
            height: x.height,
            mass: x.mass,
            homeworld: homeworld,
            starships: starships,
            vehicles: vehicles,
            films: films
        }
        setPersonajeDetalle(newChar)
    }

    return (
        <div>

            {chars.map((element) => {
                return (
                    <div style={{ decoration: "none" }} >
                        <Link to="/detailedchar">
                            <NavesBtn onClick={() => detalleChar(element.name)}>
                                <h2 style={{ textTransform: "uppercase" }}>{element.name}</h2>
                            </NavesBtn>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

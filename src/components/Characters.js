import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavesBtn } from './styled'

export default function Characters({ setPersonajeDetalle, chars }) {
    const [starships, setStarships] = useState("")
    const [veh, setVeh] = useState("")

    async function getStarships(x) {
        var nav = "";
        const d = await Promise.all(x.starships.map(async (el) => {
            var r = await axios.get(el)
            r = r.data.name
            nav += r + ",";
            return nav;
        }))
        setStarships(nav)

        return d
    }

    async function getVehicles(x) {
        var nav = "";
        const d = await Promise.all(x.vehicles.map(async (el) => {
            var r = await axios.get(el)
            r = r.data.name
            nav += r + ",";
            return nav;
        }))
        setVeh(nav)
        return d
    }


    const detalleChar = async (name) => {
        const persona = chars.filter(element => {
            return element.name === name;
        })
        var x = persona[0]
        const homeworld = await axios.get(x.homeworld).then(res => res.data.name)
        const starships = await getStarships(x)
        const vehicles = await getVehicles(x)

        const newChar = {
            name: x.name,
            birth: x.birth_year,
            gender: x.gender,
            height: x.height,
            mass: x.mass,
            homeworld: homeworld,
            starships: starships,
            vehicles: vehicles
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

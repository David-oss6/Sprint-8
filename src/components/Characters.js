import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavesBtn } from './styled'

export default function Characters({ setPersonajeDetalle, chars }) {
    const [starships, setStarships] = useState([])
    const [veh, setVeh] = useState([])

    async function getVehicles(x) {
        const d = await Promise.all(x.vheicles.map(async (el) => {
            var r = await axios.get(el)
            r = r.data.name
            return r;
        }))
        setVeh(...veh, d)
    }

    async function getStarships(x) {
        var nav = [];
        const d = await Promise.all(x.starships.map(async (el) => {

            var r = await axios.get(el)
            r = r.data.name
            nav.push(r)
            return nav;
        }))
        setStarships([...starships, d])
        console.log(nav, d, starships)
        return d
    }

    const detalleChar = async (name) => {
        const persona = chars.filter(element => {
            return element.name === name;
        })
        var x = persona[0]
        console.log(persona)

        const homeworld = await axios.get(x.homeworld).then(res => res.data.name)

        const starships = await getStarships(x)
        // const c = await getVehicles(x)

        // Promise.all(a, b, c).then(value => console.log(value))


        const newChar = {
            name: x.name,
            birth: x.birth_year,
            gender: x.gender,
            height: x.height,
            mass: x.mass,
            homeworld: homeworld,
            starships: starships,
            // vehicles: vehicles
        }

        setPersonajeDetalle(newChar)
    }
    // birth_year: "19BBY"
    // created: "2014-12-09T13:50:51.644000Z"
    // edited: "2014-12-20T21:17:56.891000Z"
    // eye_color: "blue"
    // films: (4)['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/', 'https://swapi.dev/api/films/3/', 'https://swapi.dev/api/films/6/']
    // gender: "male"
    // hair_color: "blond"
    // height: "172"
    // homeworld: "https://swapi.dev/api/planets/1/"
    // mass: "77"
    // name: "Luke Skywalker"
    // skin_color: "fair"
    // species: []
    // starships: (2)['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/']
    // url: "https://swapi.dev/api/people/1/"
    // vehicles: (2)['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/']
    // [[Prototype]]: Object
    // length: 1
    // [[Prototype]]: Array(0)


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

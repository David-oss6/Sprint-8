import React, { useContext, useState } from 'react'
import axios from 'axios'

import { NavesBtn } from './styled'


export default function Characters({ setPersonajeDetalle, setSeeChars, chars }) {


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
            var u = r.data.url
            nav.push(u);
            return u;
        }))

        const final = await moreNaves(nav)
        return final
    }

    const moreNaves = async (nav) => {
        nav = await Promise.all(nav.map(async (el) => {
            const d = await axios.get(el)
            const r = d.data
            var x = r.url.replace(/[^0-9]/g, '')
            const newNave = {
                name: r.name,
                model: r.model,
                class: r.starship_class,
                img: `https://starwars-visualguide.com/assets/img/starships/${x}.jpg`
            }
            return newNave
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
        const final = await morePelis(pelis)
        return final
    }
    const morePelis = async (pelis) => {
        pelis = await Promise.all(pelis.map(async (el) => {
            const d = await axios.get(el.url)
            const r = d.data
            const newPeli = {
                title: r.title,
                crawl: r.opening_crawl,
                director: r.director
            }
            return newPeli
        }))

        return pelis
    }

    const detalleChar = async (name) => {
        const persona = chars.filter(element => {
            return element.name === name;
        })
        var x = persona[0]
        console.log(x)
        var imgNum = x.url.replace(/[^0-9]/g, '')

        const homeworld = await axios.get(x.homeworld).then(res => res.data.name)
        const starships = await getStarships(x)
        const vehicles = await getVehicles(x)
        const films = await getPelis(x)
        // const results = Promise.all([homeworld, starships, vehicles, films]).then(values => console.log(values))


        const newChar = {
            name: x.name,
            birth: x.birth_year,
            gender: x.gender,
            height: x.height,
            mass: x.mass,
            homeworld: homeworld,
            starships: starships,
            vehicles: vehicles,
            films: films,
            img: ` https://starwars-visualguide.com/assets/img/characters/${imgNum}.jpg`
        }

        setPersonajeDetalle(newChar)
        setSeeChars(false)
    }


    return (
        <div>
            {chars.map((element) => {
                return (
                    <div style={{ decoration: "none" }} >
                        {/* <Link to="/detailedchar"> */}
                        <NavesBtn onClick={() => detalleChar(element.name)}>
                            <h2 style={{ textTransform: "uppercase" }}>{element.name}</h2>
                        </NavesBtn>
                        {/* </Link> */}
                    </div>
                )
            })}
        </div>
    )
}

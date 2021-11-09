import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../aplication/ContextData'
import { MyP, DetDiv } from './styled'
import axios from 'axios'

export default function DetailedChar() {
    const { personajeDetalle } = useContext(ContextData)
    const [x, setX] = useState(null)
    useEffect(async () => {
        var x = personajeDetalle

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

        const homeworld = await axios.get(x.homeworld).then(res => res.data.name)
        const starships = await getStarships(x)
        const vehicles = await getVehicles(x)
        const films = await getPelis(x)
        console.log(homeworld, starships, vehicles, films)
        // const results = Promise.all([homeworld, starships, vehicles, films]).then(values => console.log(values))
        var imgNum = x.url.replace(/[^0-9]/g, '')
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
        setX(newChar)
        x = personajeDetalle
    }, [personajeDetalle])




    return (

        <div style={{ display: "flex", justifyContent: "center" }}>

            {x &&
                <DetDiv style={{ borderBottom: "#f07272 1px solid" }} >
                    <p style={{ textTransform: "uppercase", color: "white", fontSize: "25px", marginBottom: "10px " }}>
                        {x.name}
                    </p>
                    <div style={{ display: "flex", backgroundColor: "#161616", padding: "20px 10px", flexFlow: "row nowrap space-between" }}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Sapiente pariatur dicta vel quod eius tempora cumque ipsum, ad fuga facere minus molestiae, officia temporibus quas sequi voluptate necessitatibus!Laboriosam, quidem?</p>
                        <img src={x.img} alt="" style={{ height: "150px", margin: "0px 50px 0 50px" }} />
                    </div>
                    <div style={{ backgroundColor: "#161616", marginBottom: "15px ", borderBottom: "#f07272 1px solid", display: "flex", flexWrap: "nowrap", position: "relative" }}>
                        <div style={{ marginRight: "180px" }} >
                            <MyP>Born: </MyP>
                            <MyP>Gender: </MyP>
                            <MyP>Height: </MyP>
                            <MyP>Mass: </MyP>
                            <MyP>Homeworld: </MyP>
                            <MyP>Vehicles: </MyP>
                        </div>
                        <div >
                            <MyP>{x.birth}</MyP>
                            <MyP>{x.gender}</MyP>
                            <MyP>{x.height} cm</MyP>
                            <MyP>{x.mass} kg</MyP>
                            <MyP>{x.homeworld} </MyP>
                            <MyP>{x.vehicles}</MyP>
                        </div>
                    </div >
                </DetDiv >
            }
            <p>Starships: </p>
            {x && x.starships.map((el) => {
                return <div style={{ backgroundColor: "#161616", marginBottom: "15px ", display: "flex", flexWrap: "nowrap", alignItems: "center", }}>
                    <div style={{ width: "300px", marginRight: "310px" }} >
                        <h2>{el.name}</h2>
                        <MyP>Model: {el.model}</MyP>
                        <MyP>Class: {el.class}</MyP>
                    </div>
                    <div style={{ height: "100px", justifyContent: "space-between" }}>
                        <img src={el.img} alt="Starship" style={{ height: "100px" }} />
                    </div>
                </div>
            })
            }
            <div style={{ borderBottom: "#f07272 1px solid" }}></div>
            <p>Films: </p>
            {x && x.films.map((el) => {
                return <div style={{ backgroundColor: "#161616", marginBottom: "15px " }}>
                    <h2>{el.title}</h2>
                    <p>{el.crawl}</p>
                    <p>{el.director}</p>
                </div>
            })}
        </div >
    )
}


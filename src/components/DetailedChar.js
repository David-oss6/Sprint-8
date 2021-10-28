import React, { useEffect, useState } from 'react'
import { MyP, DetDiv } from './styled'
import axios from 'axios'

export default function DetailedChar({ personajeDetalle }) {
    const [PelisList, setPelisList] = useState([])
    const [NavesList, setNavesList] = useState([])
    const x = personajeDetalle
    console.log(x)


    useEffect(async () => {
        console.log(personajeDetalle.starships)
        const naves = await Promise.all(personajeDetalle.starships.map(async (el) => {
            const d = await axios.get(el.url)
            const r = d.data
            var x = r.url.replace(/[^0-9]/g, '')
            const newNave = await {
                name: r.name,
                model: r.model,
                class: r.starship_class,
                img: `https://starwars-visualguide.com/assets/img/starships/${x}.jpg`
            }
            return newNave
        }))

        setNavesList(naves)

        const pelis = await Promise.all(personajeDetalle.films.map(async (el) => {
            const d = await axios.get(el.url)
            const r = d.data
            const newPeli = await {
                title: r.title,
                crawl: r.opening_crawl,
                director: r.director
            }
            return newPeli
        }))
        setPelisList(pelis)
    }, [personajeDetalle])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>

            <DetDiv style={{ borderBottom: "#f07272 1px solid" }} >
                <p style={{ textTransform: "uppercase", color: "white", fontSize: "25px", marginBottom: "10px " }}>
                    {x.name}
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Sapiente pariatur dicta vel quod eius tempora cumque ipsum, ad fuga facere minus molestiae, officia temporibus quas sequi voluptate necessitatibus!Laboriosam, quidem?</p>
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

                <p>Starships: </p>
                {NavesList.map((el) => {
                    return <div style={{ backgroundColor: "#161616", marginBottom: "15px ", display: "flex", flexWrap: "nowrap", alignItems: "center", }}>
                        <div style={{ width: "300px", marginRight: "100px" }} >
                            <h2>{el.name}</h2>
                            <MyP>Model: {el.model}</MyP>
                            <MyP>Class: {el.class}</MyP>
                        </div>
                        <div style={{ height: "100px", justifyContent: "space-between" }}>
                            <img src={el.img} alt="Starship" style={{ height: "100px" }} />
                        </div>
                    </div>
                })}
                <div style={{ borderBottom: "#f07272 1px solid" }}></div>
                <p>Films: </p>
                {PelisList.map((el) => {
                    return <div style={{ backgroundColor: "#161616", marginBottom: "15px " }}>
                        <h2>{el.title}</h2>
                        <p>{el.crawl}</p>
                        <p>{el.director}</p>
                    </div>
                })}
            </DetDiv >
        </div >
    )
}


import React, { useState, useContext } from 'react'
import { LoadBtn, NavesBtn } from './styled.js'
import { Link } from "react-router-dom";
import { ContextData } from '../aplication/ContextData.js';
import axios from 'axios';

export default function Naves() {
    const { naves, setNaves } = useContext(ContextData)
    const { setNaveDetalle } = useContext(ContextData)
    const [pageCount, setPageCount] = useState(2)

    const loadMore = async () => {
        setPageCount(pageCount + 1)
        try {
            const resPost = await axios.get(`https://swapi.dev/api/starships/?page=${pageCount}`)
            const res = await resPost.data.results;
            setNaves([...naves, ...res])
        } catch (error) {
            console.log("No funciona")
        }
    }

    const detalleNave = (name) => {
        const nave = naves.filter(element => {
            return element.name === name;
        })
        var x = nave[0].url.replace(/[^0-9]/g, '')
        var nombre = nave[0].name
        // name = name.toUpperCase()

        const newNave = {
            name: nombre,
            model: nave[0].model,
            cost: nave[0].cost_in_credits,
            manufacturer: nave[0].manufacturer,
            length: nave[0].length,
            speed: nave[0].max_atmosphering_speed,
            passengers: nave[0].passengers,
            pilots: nave[0].pilots,
            films: nave[0].films,
            imgUrl: `https://starwars-visualguide.com/assets/img/starships/${x}.jpg`
        }
        setNaveDetalle(newNave)
    }

    return (
        <div>
            {naves && naves.map((element) => {
                return (
                    <div style={{ decoration: "none" }} >
                        <Link to="/detalle">
                            <NavesBtn onClick={() => detalleNave(element.name)}>
                                <h2 style={{ textTransform: "uppercase" }}>{element.name}</h2>
                                <p>{element.model}</p>
                            </NavesBtn>
                        </Link>
                    </div>
                )
            })}
            <LoadBtn onClick={() => loadMore()}>Load more</LoadBtn>
        </div>
    )
}

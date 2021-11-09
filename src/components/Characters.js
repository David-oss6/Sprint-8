import React, { useContext, useState } from 'react'
import axios from 'axios'

import { LoadBtn, NavesBtn } from './styled'
import { ContextData } from '../aplication/ContextData';
import { Link } from 'react-router-dom';


export default function Characters() {
    const { personajeDetalle, setPersonajeDetalle, chars, setChars } = useContext(ContextData)

    const [charPageCount, setCharPageCount] = useState(2)
    const loadMoreChar = async () => {

        setCharPageCount(charPageCount + 1)
        try {
            const resPost = await axios.get(`https://swapi.dev/api/people/?page=${charPageCount}`)
            const res = await resPost.data.results;
            setChars([...chars, ...res])
        } catch (error) {
            console.log("No funciona")
        }
    }



    const detalleChar = async (name) => {
        const persona = chars.filter(element => {
            return element.name === name;
        })
        var x = persona[0]
        var imgNum = x.url.replace(/[^0-9]/g, '')
        setPersonajeDetalle(x)

    }

    return (
        <div>
            {chars.map((element) => {
                return (
                    <div key={Math.random() * 1000} style={{ decoration: "none" }} >
                        <Link to="/detailedchar">
                            <NavesBtn onClick={() => detalleChar(element.name)}>
                                <h2 style={{ textTransform: "uppercase" }}>{element.name}</h2>
                            </NavesBtn>
                        </Link>
                    </div>
                )
            })}
            <LoadBtn onClick={() => loadMoreChar()}>Load More</LoadBtn>
        </div>
    )
}

import React from 'react'
import { NavesBtn } from './styled.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Naves({ naves, setNaveDetalle, setIsDetalle, setIsNaves }) {
    const detalleNave = (name) => {

        const nave = naves.filter(element => {
            return element.name === name;
        })
        var x = nave[0].url.replace(/[^0-9]/g, '')
        console.log(x)
        var name = nave[0].name
        name = name.toUpperCase()

        const newNave = {
            name: name,
            model: nave[0].model,
            cost: nave[0].cost_in_credits,
            manufacturer: nave[0].manufacturer,
            length: nave[0].length,
            speed: nave[0].max_atmosphering_speed,
            passengers: nave[0].passengers,
            imgUrl: `https://starwars-visualguide.com/assets/img/starships/${x}.jpg`
        }
        setNaveDetalle(newNave)

    }

    return (
        <div>
            {naves.map((element) => {
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
        </div>
    )
}

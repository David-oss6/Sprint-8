import React from 'react'
import { MyP, DetDiv } from './styled'

export default function DetailedChar({ personajeDetalle }) {
    const x = personajeDetalle

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>

            <DetDiv style={{ borderBottom: "#f07272 1px solid" }} >
                <p style={{ textTransform: "uppercase", color: "white", fontSize: "25px", marginBottom: "10px " }}>
                    {x.name}
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Sapiente pariatur dicta vel quod eius tempora cumque ipsum, ad fuga facere minus molestiae, officia temporibus quas sequi voluptate necessitatibus!Laboriosam, quidem?</p>
                <div style={{ display: "flex", flexWrap: "nowrap", position: "relative" }}>
                    <div style={{ marginRight: "180px" }} >
                        <MyP>Born: </MyP>
                        <MyP>Gender: </MyP>
                        <MyP>Height: </MyP>
                        <MyP>Mass: </MyP>
                        <MyP>Homeworld: </MyP>
                        <MyP>Starships: </MyP>
                        <MyP>Vehicles: </MyP>
                    </div>
                    <div >
                        <MyP>{x.birth}</MyP>
                        <MyP>{x.gender}</MyP>
                        <MyP>{x.height} cm</MyP>
                        <MyP>{x.mass} kg</MyP>
                        <MyP>{x.homeworld} </MyP>
                        <MyP>{x.starships}</MyP>
                        <MyP>{x.vehicles}</MyP>
                    </div>
                </div>
            </DetDiv >
        </div>
    )
}


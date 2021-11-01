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

                <p>Starships: </p>
                {x.starships.map((el) => {
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
                })}
                <div style={{ borderBottom: "#f07272 1px solid" }}></div>
                <p>Films: </p>
                {x.films.map((el) => {
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


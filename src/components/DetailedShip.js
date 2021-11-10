
import React, { useState, useContext, useEffect } from 'react'
import { DetDiv, Myimg, MyImg, MyP, MyImgDiv } from './styled'
import axios from 'axios'
import { ContextData } from '../aplication/ContextData'

export default function DetailedShip() {

    const { naveDetalle } = useContext(ContextData)
    const n = naveDetalle
    const [list, setList] = useState([]);
    const [pilotos, setPilotos] = useState([])
    useEffect(async () => {
        var lista = [];
        const c = await Promise.all(n.films.map(async (el) => {
            var r = await axios.get(el)
            lista.push(r.data)
        }))
        setList(lista)

        var imgNum;
        var pil = [];
        const p = await Promise.all(n.pilots.map(async (el) => {
            var t = await axios.get(el)
            imgNum = t.data.url.replace(/[^0-9]/g, '')
            t.data.url = ` https://starwars-visualguide.com/assets/img/characters/${imgNum}.jpg`
            pil.push(t.data)

        }))
        setPilotos(pil)
    }, [naveDetalle])

    return (
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <MyImg src={n.imgUrl} alt="" />
            <DetDiv>
                <p style={{ textTransform: "uppercase", color: "white", fontSize: "25px", marginBottom: "10px " }}>{n.name}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Sapiente pariatur dicta vel quod eius tempora cumque ipsum, ad fuga facere minus molestiae, officia temporibus quas sequi voluptate necessitatibus!Laboriosam, quidem?</p>
                <div style={{ backgroundColor: "#161616", display: "flex", flexWrap: "nowrap", position: "relative" }}>
                    <div style={{ marginRight: "180px" }} >
                        <MyP>Modelo: </MyP>
                        <MyP>Constructor: </MyP>
                        <MyP>Coste: </MyP>
                        <MyP>Longitud: </MyP>
                        <MyP>Vel.max: </MyP>
                        <MyP>Nº pax: </MyP>
                    </div>
                    <div >
                        <MyP>{n.model}</MyP>
                        <MyP>{n.manufacturer}</MyP>
                        <MyP>{n.cost} Créditos</MyP>
                        <MyP>{n.length} metros</MyP>
                        <MyP> {n.speed} km/h</MyP>
                        <MyP>{n.passengers}</MyP>
                    </div>
                </div>
                <div>
                    <p>Films: </p>
                    {
                        list && list.map((el) => {
                            return <div style={{ backgroundColor: "#161616", borderBottom: "#f07272 1px solid" }}>
                                <p style={{ textTransform: "uppercase", fontSize: "25px", marginBottom: "10px ", color: "white" }}>{el.title}</p>
                                <MyP>{el.opening_crawl}</MyP>
                                <MyP>Director: {el.director}</MyP>
                            </div>
                        })
                    }
                </div>
                <div>
                    <p>Pilots: </p>
                    {
                        pilotos && pilotos.map((e) => {
                            return (
                                <div style={{ backgroundColor: "#161616", display: "flex", flexFlow: "row nowrap", borderBottom: "#f07272 1px solid", justifyContent: "space-between" }}>
                                    <div>
                                        <MyP style={{ textTransform: "uppercase", fontSize: "25px", marginBottom: "10px ", color: "white" }}>{e.name}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Height: {e.height}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Mass: {e.mass}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Hair color:{e.hair_color}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Skin color: {e.skin_color}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Eye color: {e.eye_color}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Date of birth: {e.birth_year}</MyP>
                                        <MyP style={{ marginLeft: "50px" }}>Gender: {e.gender}</MyP>
                                    </div>
                                    <MyImgDiv>
                                        <Myimg src={e.url} alt="" />
                                    </MyImgDiv>
                                </div>
                            )
                        })
                    }
                </div>
            </DetDiv >
        </div >
    )
}


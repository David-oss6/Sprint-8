
import React, { useState } from 'react'
import { DetDiv, MyImg, MyP } from './styled'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Movies from './Movies'

export default function DetailedShip({ verPilotos, setVerPilotos, pilots, setPilots, naveDetalle }) {
    const n = naveDetalle
    const [movies, setMovies] = useState([])
    const [pelicula, setPelicula] = useState([])
    const [verPelis, setVerPelis] = useState(false)


    function seeMovies(n) {
        var pelis = [];
        console.log(n)
        n.map((el) => {
            axios.get(el)
                .then(res => pelis.push(res.data))
            setPelicula(pelis)
        })

        console.log(pelicula)

    }

    function seePilots(n) {
        setPilots(n.pilots)
        setVerPilotos(!verPilotos)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <MyImg src={n.imgUrl} alt="" />
            <DetDiv>
                <p style={{ textTransform: "uppercase", fontSize: "25px", marginBottom: "10px " }}>{n.name}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente pariatur dicta vel quod eius tempora cumque ipsum, ad fuga facere minus molestiae, officia temporibus quas sequi voluptate necessitatibus! Laboriosam, quidem?</p>
                <div style={{ display: "flex", position: "relative" }}>
                    <div style={{ marginRight: "100px" }} >
                        <MyP>Modelo: </MyP>
                        <MyP>Constructor: </MyP>
                        <MyP>Coste:</MyP>
                        <MyP>Longitud: </MyP>
                        <MyP>Vel. max:</MyP>
                        <MyP>Nº pax:</MyP>
                    </div>
                    <div >
                        <MyP>{n.model}</MyP>
                        <MyP>{n.manufacturer}</MyP>
                        <MyP>{n.cost} Créditos</MyP>
                        <MyP>{n.length} metros</MyP>
                        <MyP> {n.speed} km/h</MyP>
                        <MyP>{n.passengers}</MyP>
                    </div>
                    <Movies />
                </div>
                <div>
                    <button onClick={() => seeMovies(n.films)}>See Movies</button>

                    <Link to="/ListaPilots">
                        <button onClick={() => seePilots(n)}>See Pilots</button>
                    </Link>

                </div>
            </DetDiv>
        </div>
    )
}

// name: 'CR90 corvette', model: 'CR90 corvette', manufacturer: 'Corellian Engineering Corporation', cost_in_credits: '3500000', length: '150', …}
// MGLT: "60"
// cargo_capacity: "3000000"
// consumables: "1 year"
// cost_in_credits: "3500000"
// created: "2014-12-10T14:20:33.369000Z"
// crew: "30-165"
// edited: "2014-12-20T21:23:49.867000Z"
// films: (3)['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/3/', 'https://swapi.dev/api/films/6/']
// hyperdrive_rating: "2.0"
// length: "150"
// manufacturer: "Corellian Engineering Corporation"
// max_atmosphering_speed: "950"
// model: "CR90 corvette"
// name: "CR90 corvette"
// passengers: "600"
// pilots: []
// starship_class: "corvette"
// url: "https://swapi.dev/api/starships/2/"
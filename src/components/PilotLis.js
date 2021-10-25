import axios from 'axios'
import { useState, useEffect } from 'react'

export default function PilotLis({ pilots, verPilotos }) {
    const [list, setList] = useState([{}])
    console.log(pilots)

    useEffect(() => {
        var lista = [];
        Promise.all([pilots.map((el) => {
            return axios.get(el)
                .then(res => console.log(res.data))
        })])
        setList(lista)
        console.log(list, lista)
    }, [pilots])


    return (
        <div>
            {list.map((e) => {
                console.log(e)
                return (
                    <div>
                        <p>{e.name}</p>
                        <p>Height: {e.height}</p>
                        <p>Mass: {e.mass}</p>
                        <p>Hair color:{e.hair_color}</p>
                        <p>Skin color: {e.skin_color}</p>
                        <p>Eye color: {e.eye_color}</p>
                        <p>Date of birth: {e.birth_year}</p>
                        <p>Gender: {e.gender}</p>
                        <hr />
                    </div>
                )
            })}

        </div>
    )
}

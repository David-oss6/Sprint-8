import axios from 'axios'
import { useState, useEffect } from 'react'
import { DetDiv, MyP } from './styled'

export default function PilotLis({ naveDetalle, pilots }) {
    const [list, setList] = useState([{}])

    useEffect(async () => {

        const d = await Promise.all(pilots.map(async (el) => {
            var r = await axios.get(el)
            r = r.data
            return r;
        }))
        setList(d)
        console.log('dddddddddd', d);
    }, [pilots])


    return (
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <h1>{naveDetalle.name} Pilots</h1>
            {list.map((e) => {
                return (
                    <DetDiv style={{ borderBottom: "#f07272 1px solid" }}>
                        <MyP style={{ textTransform: "uppercase", fontSize: "25px", marginBottom: "10px ", color: "white" }}>{e.name}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Height: {e.height}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Mass: {e.mass}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Hair color:{e.hair_color}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Skin color: {e.skin_color}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Eye color: {e.eye_color}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Date of birth: {e.birth_year}</MyP>
                        <MyP style={{ marginLeft: "50px" }}>Gender: {e.gender}</MyP>

                    </DetDiv>
                )
            })}
        </div>
    )
}

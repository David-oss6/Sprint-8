import axios from 'axios'
import { useState, useEffect } from 'react'
import { DetDiv, Myimg, MyImgDiv, MyP } from './styled'

export default function PilotLis({ naveDetalle, pilots }) {
    const [list, setList] = useState([{}])

    useEffect(async () => {
        var imgNum;
        const d = await Promise.all(pilots.map(async (el) => {
            var r = await axios.get(el)
            r = r.data
            imgNum = r.url.replace(/[^0-9]/g, '')
            r = {
                ...r, img: ` https://starwars-visualguide.com/assets/img/characters/${imgNum}.jpg`
            }
            return r
        }))
        console.log(d)
        setList(d)
    }, [pilots])


    return (
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <h1>{naveDetalle.name} Pilots</h1>
            {list.map((e) => {
                return (
                    <DetDiv style={{ backgroundColor: "#161616", display: "flex", flexFlow: "row nowrap", borderBottom: "#f07272 1px solid", justifyContent: "space-between" }}>
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
                            <Myimg src={e.img} alt="" />
                        </MyImgDiv>
                    </DetDiv>
                )
            })}
        </div>
    )
}


import { DetDiv, MyP } from './styled'
export default function Movies({ naveDetalle, pelis, verPelis }) {

    return (
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <h1>  {naveDetalle.name} Movies</h1>
            {verPelis && pelis.map((el) => {
                console.log(el)
                return <DetDiv>
                    <p style={{ textTransform: "uppercase", fontSize: "25px", marginBottom: "10px ", color: "white" }}>{el.title}</p>
                    <MyP>{el.opening_crawl}</MyP>
                    <MyP>Director: {el.director}</MyP>
                    <hr />
                </DetDiv>
            })}
        </div>
    )
}

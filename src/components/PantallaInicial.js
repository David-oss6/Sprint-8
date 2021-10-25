import React from 'react'
import { DetDiv } from './styled'
import ReactPlayer from 'react-player'
import intro from './video/intro.mp4'

export default function PantallaInicial() {
    return (

        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
            <DetDiv>
                <ReactPlayer
                    url={intro}
                    width="100%"
                    controls
                    playing={false}
                    volume='0.1'
                />
            </DetDiv>
            <DetDiv>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci illum ipsum illo non voluptate. Officia nobis dignissimos accusantium, atque est quae facilis cum dicta cumque laborum quasi rem qui molestias?</p>
            </DetDiv>
        </div>
    )
}

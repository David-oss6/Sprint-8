import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NavBtn } from './styled'
import { ContextData } from '../aplication/ContextData'

export default function NavBar() {
    const { userLoged } = useContext(ContextData)
    return (
        <div>
            <Link to="/">
                <NavBtn  >HOME</NavBtn>
            </Link>
            <Link to={userLoged ? "/starships" : "/"}>
                <NavBtn  >STARSHIPS</NavBtn>
            </Link>
            <Link to={userLoged ? "/characters" : "/"}>
                <NavBtn  >CHARACTERS</NavBtn>
            </Link>
        </div>
    )
}

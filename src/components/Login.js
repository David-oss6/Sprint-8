import React, { useState, useContext } from 'react'
import '../style.css'
import { ContextData } from '../aplication/ContextData'

export default function Login() {
    const { setUserLoged } = useContext(ContextData)
    const { signList } = useContext(ContextData)
    const { setUser } = useContext(ContextData)

    const [name, setName] = useState("zzz")
    const [pass, setPass] = useState("zzz")
    const handleLogin = () => {
        const s = signList.filter((element) => {
            return element.name === name && element.password === pass;
        })
        if (s.length === 0) {
            alert("Nombre o contraseña incorrectos")
        } else {
            setUser(name)
            setUserLoged(true)
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="name"
                onInput={event => setName(event.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="contraseña"
                onInput={event => setPass(event.target.value)}
            />
            <br />
            <button onClick={() => handleLogin()}>Submit</button>
        </div>
    )
}

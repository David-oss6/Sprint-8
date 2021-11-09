import React, { useState } from 'react'
import '../style.css'

export default function Login({ signList, setUser, user, setUserLoged }) {
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

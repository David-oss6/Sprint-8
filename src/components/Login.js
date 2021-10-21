import React, { useState } from 'react'
import '../style.css'

export default function Login({ signList, setUser, user, setUserLoged }) {
    const [name, setName] = useState("zzz")
    const [pass, setPass] = useState("zzz")
    const handleLogin = () => {
        console.log(user)
        const s = signList.filter((element) => {
            return element.name === name && element.password === pass;
        })
        s.length === 0 ? alert("Nombre o contraseña incorrectos") : login(name)

    }
    function login(name) {

        console.log(name)
        setUser(name)
        setUserLoged(true)
        console.log(user)
        JSON.stringify(user)
        localStorage.setItem("user", user)
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

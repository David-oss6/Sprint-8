import React, { useState } from 'react'
import '../style.css'

export default function SignUp({ setLoginModal, loginModal, setSignList, signList, signModal, setSignModal }) {
    const [name, setName] = useState(null)
    const [pass, setPass] = useState(null)
    const [mail, setMail] = useState(null)
    const handleSign = () => {
        var newUser = {};
        if (name !== null) {
            const n = signList.filter((element) => {
                return element.name === name
            })

            if (n.length === 0) {
                if (pass != null && pass.length > 0) {
                    newUser = {
                        id: Math.random() * 100,
                        name: name,
                        password: pass,
                        email: mail
                    }
                    setSignList([...signList, newUser])
                    setPass(null)
                    setName(null)
                    setMail(null)
                    localStorage.setItem("signList", JSON.stringify(signList))
                    setSignModal(!signModal)
                    setLoginModal(!loginModal)
                } else alert("Contraseña al menos dos char")
            } else alert("El nombre ya existe")
        } else alert("Nombre incorrecto")

    }

    return (
        <div >
            <div  >
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className="modal-main">
                            <input
                                onChange={event => setName(event.target.value)}
                                type="text"
                                required
                                placeholder="name" />
                            <br />
                            <input
                                onChange={event => setPass(event.target.value)}
                                type="password"
                                placeholder="contraseña" />
                            <br />
                            <input
                                onChange={event => setMail(event.target.value)}
                                type="email"
                                placeholder="e-mail" />
                            <br />
                            <button onClick={() => handleSign()}>Submit</button>
                            <button onClick={() => setSignModal(!signModal)}>Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

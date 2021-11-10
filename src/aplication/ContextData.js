import { createContext, useState } from "react"

export const ContextData = createContext()

export const DataProvider = ({ children }) => {
    const isLog = localStorage.getItem("userLoged")
    const [userLoged, setUserLoged] = useState(isLog ? JSON.parse(isLog) : false)

    const userLogged = localStorage.getItem("user")
    const [user, setUser] = useState(userLogged ? JSON.parse(userLogged) : null)
    /// Naves
    const [naves, setNaves] = useState([]);
    const [naveDetalle, setNaveDetalle] = useState({});
    //Personajes
    const [chars, setChars] = useState([{}]);
    const [personajeDetalle, setPersonajeDetalle] = useState({});
    //Peliculas
    const [peliculas, setPeliculas] = useState([{}])
    //Sign Up
    const list = localStorage.getItem("signList")
    const [signList, setSignList] = useState(list ? JSON.parse(list) : [{
        id: 1, name: "David", password: "asd", email: "asd@.com"
    },
    { id: 2, name: "asd", password: "asd", email: "asd@.com" }])
    //Login

    return <ContextData.Provider value={{
        naves, setNaves,
        naveDetalle, setNaveDetalle,
        chars, setChars,
        peliculas, setPeliculas,
        userLoged, setUserLoged,
        personajeDetalle, setPersonajeDetalle,
        signList, setSignList,
        user, setUser
    }} >
        {children}
    </ContextData.Provider>
}
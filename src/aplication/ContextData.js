import { createContext, useState } from "react"

export const ContextData = createContext()

export const DataProvider = ({ children }) => {
    const isLog = localStorage.getItem("userLoged")
    const [userLoged, setUserLoged] = useState(isLog ? JSON.parse(isLog) : false)
    /// Naves
    const [naves, setNaves] = useState([]);
    const [naveDetalle, setNaveDetalle] = useState({});
    //Personajes
    const [chars, setChars] = useState([{}]);
    const [personajeDetalle, setPersonajeDetalle] = useState({});
    //Peliculas
    const [peliculas, setPeliculas] = useState([{}])

    return <ContextData.Provider value={{
        naves, setNaves,
        naveDetalle, setNaveDetalle,
        chars, setChars,
        peliculas, setPeliculas,
        userLoged, setUserLoged,
        personajeDetalle, setPersonajeDetalle
    }} >
        {children}
    </ContextData.Provider>
}
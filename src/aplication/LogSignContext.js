import { createContext, useState } from 'react'

export const LogSignContext = createContext()

export const LogSignProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false)
    const [signModal, setSignModal] = useState(false)

    return <LogSignContext.Provider value={{
        loginModal, setLoginModal,
        signModal, setSignModal
    }}>
        {children}
    </LogSignContext.Provider>
}
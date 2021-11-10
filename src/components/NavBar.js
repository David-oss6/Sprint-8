import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LogBtn, LogOutBtn, LogSignDiv, NavBtn, ContDiv, ImgDiv, NavDiv } from './styled'
import { ContextData } from '../aplication/ContextData'
import { LogSignContext } from '../aplication/LogSignContext'
import Login from './Login'
import SignUp from './SignUp'
import starwars from './img/starwars.jpg'

export default function NavBar() {
    const { user, setUser } = useContext(ContextData)
    const { userLoged } = useContext(ContextData)
    const { loginModal, setLoginModal } = useContext(LogSignContext)
    const { signModal, setSignModal } = useContext(LogSignContext)
    const { setUserLoged } = useContext(ContextData)

    const logOut = () => {
        setUser(null)
        setUserLoged(false)
        setLoginModal(false)
        setSignModal(false)
        localStorage.removeItem("user")
    }
    return (
        <div style={{ border: "none" }} >
            <ContDiv >
                <div style={{ width: "180px" }}>
                </div>
                <ImgDiv>
                    <img className="starImg" src={starwars} alt="" />
                </ImgDiv>
                <LogSignDiv >
                    {userLoged ?
                        <div>
                            {user}
                            <br />
                            <LogOutBtn className={"pointer"} onClick={() => logOut()}>LogOut</LogOutBtn>
                        </div>
                        :
                        <div> <LogBtn onClick={() => setLoginModal(!loginModal)}  >LOG IN</LogBtn>
                            <LogBtn onClick={() => setSignModal(!signModal)}>SIGN UP</LogBtn>
                            {loginModal && <Login />}
                            {signModal && <SignUp />}
                        </div>}

                </LogSignDiv>
            </ContDiv>
            <NavDiv >
                <Link to="/">
                    <NavBtn  >HOME</NavBtn>
                </Link>
                <Link to={userLoged ? "/starships" : "/"}>
                    <NavBtn  >STARSHIPS</NavBtn>
                </Link>
                <Link to={userLoged ? "/characters" : "/"}>
                    <NavBtn  >CHARACTERS</NavBtn>
                </Link>
            </NavDiv>
        </div>
    )
}

import axios from "axios";
import { useState, useEffect, useContext } from 'react'
import Naves from './components/Naves'
import DetailedShip from "./components/DetailedShip";
import './style.css'
import { NavBtn, NavDiv, LoadBtn, LogBtn, ContDiv, ImgDiv, LogSignDiv, LogOutBtn } from "./components/styled";
import starwars from './components/img/starwars.jpg'
import PantallaInicial from './components/PantallaInicial'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { ContextData, DataProvider } from "./aplication/ContextData";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Characters from "./components/Characters"
import DetailedChar from "./components/DetailedChar"
import NavBar from "./components/NavBar";


function App() {

  const { naves, setNaves } = useContext(ContextData)
  const { userLoged, setUserLoged } = useContext(ContextData)

  const [peliculas, setPeliculas] = useState([])
  const [chars, setChars] = useState([{}])
  const [personajeDetalle, setPersonajeDetalle] = useState({})


  const [charPageCount, setCharPageCount] = useState(2)


  //////  Local STORAGE   ********************
  const list = localStorage.getItem("signList")
  const userLogged = localStorage.getItem("user")

  const [signList, setSignList] = useState(list ? JSON.parse(list) : [{
    id: 1, name: "David", password: "asd", email: "asd@.com"
  },
  { id: 2, name: "asd", password: "asd", email: "asd@.com" }])
  const [user, setUser] = useState(userLogged ? JSON.parse(userLogged) : null)

  //////  Local STORAGE   ********************
  const [loginModal, setLoginModal] = useState(false)
  const [signModal, setSignModal] = useState(false)
  const [pilots, setPilots] = useState([])
  const [pelis, setPelis] = useState([])

  //Static Context variable*****
  const [personaje, setPersonaje] = useState()
  const [seeChars, setSeeChars] = useState(true)

  useEffect(async () => {
    localStorage.setItem("userLoged", JSON.stringify(userLoged))
    localStorage.setItem("user", JSON.stringify(user))
  }, [userLoged, user])

  //////////  ***********************
  const logOut = () => {
    setUser(null)
    setUserLoged(false)
    setLoginModal(false)
    setSignModal(false)
    localStorage.removeItem("user")
  }
  const button = () => {

  }
  useEffect(async () => {

    const p = await axios.get(`https://swapi.dev/api/starships/`)
      .then(res => {
        setNaves(res.data.results)
      })


    axios.get(`https://swapi.dev/api/people/`)
      .then((res) => {
        setChars(res.data.results)
      })
    axios.get(`https://swapi.dev/api/films/`)
      .then((res) => {
        setPeliculas(res.data.results)
      })
  }, [])

  const loadMoreChar = async () => {

    setCharPageCount(charPageCount + 1)
    try {
      const resPost = await axios.get(`https://swapi.dev/api/people/?page=${charPageCount}`)
      const res = await resPost.data.results;
      setChars([...chars, ...res])
    } catch (error) {
      console.log("No funciona")
    }
  }



  return (
    <Router>

      <div >
        <ContDiv>
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
                {loginModal && <Login
                  setUser={setUser}
                  setUserLoged={setUserLoged}
                  user={user}
                  signList={signList}
                  loginModal={loginModal}
                  setLoginModal={setLoginModal} />}

                {/* //////////////////   SIGN UP ******************** */}
                {signModal && <SignUp
                  setLoginModal={setLoginModal}
                  loginModal={loginModal}
                  signModal={signModal}
                  setSignModal={setSignModal}
                  signList={signList}
                  setSignList={setSignList} />}
              </div>}
          </LogSignDiv>
        </ContDiv>

        <NavDiv>
          <NavBar />
        </NavDiv>

        <Switch>
          <Route exact path="/" component={PantallaInicial} />
          {userLoged &&
            <Route path="/starships" component={Naves} />
          }
          <Route path="/detalle" component={DetailedShip} />


          {/*////////////         PEROSNAJES  ******************/}
          <Route path="/characters">
            {seeChars ? <> <Characters
              seeChars={seeChars}
              setSeeChars={setSeeChars}
              setPersonajeDetalle={setPersonajeDetalle}
              chars={chars} />
              <LoadBtn onClick={() => loadMoreChar()}>Load More</LoadBtn> </>
              :
              <DetailedChar
                seeChars={seeChars}
                setSeeChars={setSeeChars}
                personajeDetalle={personajeDetalle} />}
          </Route>
        </Switch>
      </div>

    </Router>

  );
}

export default App;

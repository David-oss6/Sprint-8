import axios from "axios";
import { useState, useEffect } from 'react'
import Naves from './components/Naves'
import DetailedShip from "./components/DetailedShip";
import './style.css'
import { NavBtn, NavDiv, LoadBtn, LogBtn, ContDiv, ImgDiv, LogSignDiv, LogOutBtn } from "./components/styled";
import starwars from './components/img/starwars.jpg'
import PantallaInicial from './components/PantallaInicial'
import PilotLis from "./components/PilotLis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import GuardedRoute from './components/GuardedRoute'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Movies from "./components/Movies";
import Characters from "./components/Characters"
import DetailedChar from "./components/DetailedChar"
import StaticContext from "./context/StaticContext";

function App() {
  // Axios list   **********
  const [naves, setNaves] = useState([{}])
  const [peliculas, setPeliculas] = useState([])
  const [chars, setChars] = useState([{}])
  const [personajeDetalle, setPersonajeDetalle] = useState({})
  const [naveDetalle, setNaveDetalle] = useState({})
  const [pageCount, setPageCount] = useState(2)
  const [charPageCount, setCharPageCount] = useState(2)
  // Axios list   **********

  //////  Local STORAGE   ********************
  const list = localStorage.getItem("signList")
  const userLogged = localStorage.getItem("user")
  const isLog = localStorage.getItem("userLoged")
  const [signList, setSignList] = useState(list ? JSON.parse(list) : [{
    id: 1, name: "David", password: "asd", email: "asd@.com"
  },
  { id: 2, name: "asd", password: "asd", email: "asd@.com" }])
  const [user, setUser] = useState(userLogged ? JSON.parse(userLogged) : null)
  const [userLoged, setUserLoged] = useState(isLog ? JSON.parse(isLog) : false)
  //////  Local STORAGE   ********************

  const [loginModal, setLoginModal] = useState(false)
  const [signModal, setSignModal] = useState(false)
  const [pilots, setPilots] = useState([])
  const [pelis, setPelis] = useState([])

  const [verPilotos, setVerPilotos] = useState(true)
  const [verPelis, setVerPelis] = useState(false)

  //Static Context variable*****
  const [personaje, setPersonaje] = useState()
  const value = { personaje, setPersonaje }
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

  useEffect(() => {
    axios.get(`https://swapi.dev/api/starships/`)
      .then((res) => {
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
    console.log(charPageCount)
    setCharPageCount(charPageCount + 1)
    try {
      const resPost = await axios.get(`https://swapi.dev/api/people/?page=${charPageCount}`)
      const res = await resPost.data.results;
      setChars([...chars, ...res])
    } catch (error) {
      console.log("No funciona")
    }
  }

  const loadMore = async () => {
    setPageCount(pageCount + 1)
    try {
      const resPost = await axios.get(`https://swapi.dev/api/starships/?page=${pageCount}`)
      const res = await resPost.data.results;
      setNaves([...naves, ...res])
    } catch (error) {
      console.log("No funciona")
    }
  }

  return (
    <StaticContext.Provider value={personajeDetalle}>
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
            <Link to="/">
              <NavBtn onClick={() => setSeeChars(true)} >HOME</NavBtn>
            </Link>
            <Link to={userLoged ? "/starships" : "/"}>
              <NavBtn onClick={() => setSeeChars(true)} >STARSHIPS</NavBtn>
            </Link>
            <Link to={userLoged ? "/characters" : "/"}>
              <NavBtn onClick={() => setSeeChars(true)} >CHARACTERS</NavBtn>
            </Link>

          </NavDiv>
          <Switch>
            <Route exact path="/">
              <PantallaInicial />
            </Route>

            {/* <GuardedRoute path="/starships" component={Naves} auth={userLoged}
            setNaves={setNaves} naves={naves} setNaveDetalle={setNaveDetalle}
          /> */}
            {userLoged &&
              <Route path="/starships" >
                <Naves setNaves={setNaves} naves={naves} setNaveDetalle={setNaveDetalle} />
                <LoadBtn onClick={() => loadMore()}>Load more</LoadBtn>
              </Route>
            }
            <Route path="/detalle">
              <DetailedShip userLoged={userLoged} PilotLis={PilotLis} pelis={pelis} setPelis={setPelis} verPilotos={verPilotos} setVerPelis={setVerPelis} setVerPilotos={setVerPilotos} pilots={pilots} setPilots={setPilots} naveDetalle={naveDetalle} />
            </Route>

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
            {/*////////////         PEROSNAJES  ******************/}

            <Route path="/ListaPilots">
              <PilotLis naveDetalle={naveDetalle} pilots={pilots} />
            </Route>
            <Route path="/ListaPelis">
              <Movies naveDetalle={naveDetalle} verPelis={verPelis} pelis={pelis} />
            </Route>
          </Switch>
        </div>
      </Router>
    </StaticContext.Provider>
  );
}

export default App;

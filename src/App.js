import axios from "axios";
import { useState, useEffect } from 'react'
import Naves from './components/Naves'
import DetailedShip from "./components/DetailedShip";
import './style.css'
import { NavBtn, NavDiv, LoadBtn, LogBtn } from "./components/styled";
import starwars from './components/img/starwars.jpg'
import PantallaInicial from './components/PantallaInicial'
import PilotLis from "./components/PilotLis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import GuardedRoute from './components/GuardedRoute'
import Login from "./components/Login";
import SignUp from "./components/SignUp";


function App() {
  const [naves, setNaves] = useState([{}])
  const [naveDetalle, setNaveDetalle] = useState({})
  const [pageCount, setPageCount] = useState(2)
  //////  Local STORAGE   ********************
  var list = localStorage.getItem("signList")
  var userLogged = localStorage.getItem("user")
  var isLog = localStorage.getItem("userLoged")
  const [signList, setSignList] = useState(list ? JSON.parse(list) : [{
    id: 1,
    name: "David",
    password: "asd",
    email: "asd@.com"
  },
  {
    id: 2,
    name: "asd",
    password: "asd",
    email: "asd@.com"
  }])
  const [user, setUser] = useState(userLogged ? JSON.parse(userLogged) : null)
  const [userLoged, setUserLoged] = useState(isLog ? JSON.parse(isLog) : false)
  const [loginModal, setLoginModal] = useState(false)
  const [signModal, setSignModal] = useState(false)

  const [pilots, setPilots] = useState([])
  const [verPilotos, setVerPilotos] = useState(true)
  useEffect(() => {
    JSON.stringify(userLoged)
    localStorage.setItem("userLoged", userLoged)
    // JSON.stringify(user)
    // localStorage.setItem("user", user)

  }, [userLoged])
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
  }, [])

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
    <Router>
      <div >
        <div>
          <img className="starImg" src={starwars} alt="" />
          <div >

            {/* ///////////// LOGGIN ********************* */}
            {userLoged ?
              <div>
                {user}
                <br />
                <button onClick={() => logOut()}>LogOut</button>
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
                  signModal={signModal}
                  setSignModal={setSignModal}
                  signList={signList}
                  setSignList={setSignList} />}
              </div>}
          </div>
        </div>
        <NavDiv>
          <Link to="/">
            <NavBtn >HOME</NavBtn>
          </Link>
          <Link to={userLoged ? "/starships" : "/"}>
            <NavBtn >STARSHIPS</NavBtn>
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
            <Route exact path="/starships" >
              <Naves setNaves={setNaves} naves={naves} setNaveDetalle={setNaveDetalle} />
              <LoadBtn onClick={() => loadMore()}>Load more</LoadBtn>
            </Route>
          }

          <Route path="/detalle">

            <DetailedShip PilotLis={PilotLis} verPilotos={verPilotos} setVerPilotos={setVerPilotos} pilots={pilots} setPilots={setPilots} naveDetalle={naveDetalle} />
          </Route>

          <Route path="/ListaPilots">
            <PilotLis verPilotos={verPilotos} pilots={pilots} />
          </Route>


        </Switch>



      </div>
    </Router>
  );
}

export default App;

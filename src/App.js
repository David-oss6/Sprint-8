import axios from "axios";
import { useEffect, useContext } from 'react'
import Naves from './components/Naves'
import DetailedShip from "./components/DetailedShip";
import './style.css'
import PantallaInicial from './components/PantallaInicial'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ContextData } from "./aplication/ContextData";
import Characters from "./components/Characters"
import DetailedChar from "./components/DetailedChar"
import NavBar from "./components/NavBar";

function App() {
  const { setNaves } = useContext(ContextData)
  const { userLoged } = useContext(ContextData)
  const { setPeliculas } = useContext(ContextData)
  const { setChars } = useContext(ContextData)
  const { user } = useContext(ContextData)

  useEffect(async () => {
    localStorage.setItem("userLoged", JSON.stringify(userLoged))
    localStorage.setItem("user", JSON.stringify(user))
  }, [userLoged, user])

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

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={PantallaInicial} />
        <Route path="/starships" component={Naves} />
        <Route path="/detalle" component={DetailedShip} />
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/detailedchar" component={DetailedChar} />
      </Switch>
    </Router>
  );
}

export default App;

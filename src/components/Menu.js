import {NavLink} from "react-router-dom";

function Menu(){
    return <header>
        <NavLink to="/">Home</NavLink>{" | "}
        <NavLink to="/people">People</NavLink>{" | "}
        <NavLink to="/planets">Planets</NavLink>{" | "}
        <NavLink to="/films">Films</NavLink>{" | "}
        <NavLink to="/species">Species</NavLink>{" | "}
        <NavLink to="/vehicles">Vehicles</NavLink>{" | "}
        <NavLink to="/starships">Starships</NavLink>
    </header>
}

export default Menu;
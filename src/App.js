import {
    BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import CategoryList from "./pages/CategoryList";
import ItemDetail from "./pages/ItemDetail";
import Menu from "./components/Menu";

function App() {
    return (
        <div>
            <Router>
                <Menu/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/:category">
                        <CategoryList/>
                    </Route>
                    <Route exact path="/:category/:id">
                        <ItemDetail/>
                    </Route>    
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;


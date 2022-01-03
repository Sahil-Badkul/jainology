import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./component/Create";
import NotFound from "./component/NotFound";
import Login from "./component/Login";
import {useState} from 'react'
import BlogDetails from "./component/BlogDetails";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <div className="App">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home isAuth={isAuth} />
            </Route>
            <Route path="/create">
              <Create isAuth={isAuth} />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails isAuth={isAuth} />
            </Route>
            <Route path="/login">
              <Login setIsAuth={setIsAuth} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

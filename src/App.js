import React from "react"; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import About from "./components/About";
import Player from "./components/Player";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>

        <Route path='/video/:videoId'>
            <div className="main">
              <Player />
            </div>
          </Route>

        <Route exact path= "/About" component={About} />
        <Route path='/search/:searchQuery'>
        <SideBar />
          <div ClassName="main">
            <SearchResults />
          </div>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

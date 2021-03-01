import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {routePaths,linkWithRoutes} from './config/routes'
import './App.css';

import {CountryProvider} from './components/Context/CountryContext'

import {Header} from "./components/UI";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";

function App() {
    return (
        <Router>
            <CountryProvider>
               <section className='app'>
                   <header className='app__header'>
                       <Header linkList={linkWithRoutes}/>
                   </header>
                   <main>
                       <div>
                           <Switch>
                               <Route exact path={routePaths.home}> <HomePage/> </Route>
                               <Route path={routePaths.settings}> <SettingsPage/> </Route>
                           </Switch>
                       </div>
                   </main>
               </section>
            </CountryProvider>
        </Router>
    )

}

export default App;

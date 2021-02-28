import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
} from "react-router-dom";
import {routePaths} from './config/routes'
import './App.css';

import {CountryProvider, useCountryState, useCountryDispatch} from './components/Context/CountryContext'

import {Header} from "./components/UI";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";

const linkList = [
    {
        label: "Home",
        url: "/"
    },
    {
        label: "Settings",
        url: "/settings"
    }
]

function App() {
    return (
        <Router>
            <CountryProvider>
                <Header linkList={linkList}/>
                <div>

                    <Switch>
                        <Route exact path={routePaths.home}> <HomePage/> </Route>
                        <Route path={routePaths.settings}> <SettingsPage/> </Route>
                    </Switch>
                </div>
            </CountryProvider>
        </Router>
    )

}

export default App;

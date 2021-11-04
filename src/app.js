import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/styles.scss';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import { DisplayTable } from './pages/displayTable';
import { ChartPage } from './pages/ChartPage';
import LineChart from './helper/LineChart';
import {ContainerBody}  from './pages/ContainerBody';   

const App = ()=>(
    <div className="container">
        <ContainerBody />
    </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

// ServiceWorker.unregister()
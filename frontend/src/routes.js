import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';
import NotFound from './pages/NotFound';

export default function Routes() {
    /* Na última rota: quando a rota não é encontrada renderiza o componente NotFound */
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} /> 
                <Route path="/dashboard" component={Dashboard} /> 
                <Route path="/new" component={New} /> 
                <Route component={NotFound} /> 
            </Switch>
        </BrowserRouter>
    );
}
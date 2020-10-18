import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React from 'react';

// Pages
import Landing from './pages/Landing';
import NursingHomeMap from './pages/NursingHomesMap';
import NursingHome from './pages/NursingHome';
import CreateNursingHome from './pages/CreateNursingHome';

function Routes(){
  return (
    // Por dentro de todas as rotas é necessario ter o BrowserRouter
    <BrowserRouter>

      {/* O Switch vai fazer com que apenas uma unica rota seja chamada */}
      <Switch>
        {/* exact é usado vai fazer uma comparação de igualdade ou seja, se "/" == "/" */}
        <Route path="/" exact component={Landing}/>
        <Route path="/app" component={NursingHomeMap}/>
        <Route path="/nursinghome/create" exact component={CreateNursingHome}/>
        <Route path="/nursinghome/:id" component={NursingHome}/>
      </Switch>

    </BrowserRouter>
  )
}

export default Routes;
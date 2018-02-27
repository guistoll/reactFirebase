import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import * as routes from './routes';
import Login from './login';
import Cadastro from './cadastro';
import Listar from './listar';
import Editar from './editar';

export default class App extends React.Component {
  render() {
    return (
    	<Router>
	      	<div>
	      		<Route path='/' component={Login}/>
	        	<Route path={routes.Listar} component={Listar} />
	        	<Route path={routes.Cadastro} component={Cadastro} />
	        	<Route path={routes.Editar} component={Editar} />
	      	</div>
	  	</Router>
    )
  }
}
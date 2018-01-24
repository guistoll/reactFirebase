import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'muicss/lib/react/button';
import './App.css';
import firebase from 'firebase';
import * as routes from './routes';

export default class Listar extends React.Component {
	constructor() {
		super();
		this.state = {
			clients: []
		}
	}

	componentDidMount(){
		this.fetchClients();
	}

	fetchClients(){
		const ref = firebase.database().ref('/clients');

    	ref.once('value', snap => {
    		const clients = [];
      		snap.forEach(function(client){
      			clients.push(client.val());
      		})
      		this.setState({clients:clients});
    	});
	}

	render() {
		const listClients = this.state.clients && this.state.clients.map((client, index) =>
	  		<li key={index}>
	  			{client.name}
	  		</li>
	  	)

		return(
			<div className="content">
				<Link to={routes.Cadastro}>
			 		<Button size="small" variant="fab" color="primary">+</Button>
			 	</Link>
			 	<ul>
			 		{listClients}
				</ul>
			</div>
		);
	}
}
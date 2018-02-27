import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Button from 'muicss/lib/react/button';
import './App.css';
import firebase from 'firebase';
import * as routes from './routes';

export default class Listar extends React.Component {
	constructor() {
		super();
		this.state = {
			clients: [{
				name: '',
				id: '',
			}]
		}
	}

	componentDidMount(){
		this.fetchClients();
	}

	fetchClients(){
		const ref = firebase.database().ref('/clients');
		
    	ref.once('value', data => {
    		const clients = [];
    		
      		
      		data.forEach(function(client){
      			clients.push({
      				name: client.val(), 
      				uid:client.key
      			});
      		});

      		clients.sort(function(a, b){
    			if(a.name.name < b.name.name) return -1;
    			if(a.name.name > b.name.name) return 1;
    			return 0;
			});
      			
      		this.setState({clients:clients});
    	});
	}

	delete(uid, index){
		const ref = firebase.database().ref('/clients');

		ref.child(uid).remove();
		this.fetchClients();
	}

	render() {
		const listClients = this.state.clients && this.state.clients.map((client, index) =>
	  		<li key={index}>
	  			<div className="divClient">
	  				{client.name.name}
	  			</div>
	  			<div className="divIcons">
	  				<Link to={routes.Editar}>
	  					<FontAwesome name='edit'/>
	  				</Link>
	  				<FontAwesome onClick={() => this.delete(client.uid, index)} name='trash-alt'/>
	  			</div>
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
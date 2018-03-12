import React from 'react';
import '../App.css';
import * as routes from './routes';
import { getAllClients, deleteClient } from '../api/functions';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Button from 'muicss/lib/react/button';

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

	fetchClients(){
		getAllClients().then((clients) => {			
			this.setState({clients: clients});
		});
	}

	componentDidMount(){
		this.fetchClients();
	}

	delete(uid){
		deleteClient(uid);
		this.fetchClients();
	}

	clientsDetails(){
		return(
			this.state.clients && this.state.clients.map((client, index) =>
				<li key={index}>
					<div className="divClient">
						{client.name.name}
					</div>
					<div className="divIcons">
						<Link to={'/Editar/' + client.uid} >
							<FontAwesome name='edit'/>
						</Link>
						<FontAwesome onClick={() => this.delete(client.uid)} name='trash-alt' />
					</div>
				</li>
			)
		)
	}

	render(){
		const clients = this.clientsDetails();

		return(
			<div className="content">
				<Link to={routes.Cadastro}>
		 			<Button size="small" variant="fab" color="primary">+</Button>
		 		</Link>
		 		<ul>
		 			{clients}
				</ul>			
			</div>
		);
	}
}
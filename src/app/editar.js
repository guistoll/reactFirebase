import React from 'react';
import FontAwesome from 'react-fontawesome';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import firebase from 'firebase';
import '../App.css';
import * as routes from './routes';
import { getClient, editClient } from '../api/functions';

export default class Editar extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			id: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		const ref = firebase.database().ref('/clients');
		const uid = this.props.match.params.uid;
		
		getClient(ref, uid).then((client) => {
			this.setState(client);
		});
	}

	handleChange(event) {
    	this.setState({name: event.target.value});
  	}

  	handleSubmit(event) {
    	editClient(this.props.match.params.uid, this.state.name);

		this.props.history.push(routes.Listar);
    	event.preventDefault();
  	}

	render() {
		return(
			<div className="content">
				<Form>
			 		<legend> 
			 			<a href={routes.Listar}>
			 				<FontAwesome name='arrow-circle-left'/>
			 			</a>
			 			Edit Client
			 		</legend>
			        <Input placeholder="Name" value={this.state.name} onChange={this.handleChange}/>   
				 	<Button onClick={this.handleSubmit} size="small" color="primary">Save</Button>
		      	</Form>
			</div>
		);
	}
}
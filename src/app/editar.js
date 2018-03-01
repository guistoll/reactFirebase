import React from 'react';
import FontAwesome from 'react-fontawesome';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import firebase from 'firebase';
import '../App.css';
import * as routes from './routes';
import getClient from '../api/getClient.js';

export default class Editar extends React.Component {
	constructor(props) {
		super(props);
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

		getClient(ref, uid).then(function(client){
			this.setState(client)
		});
	}

	handleChange(event) {
    	this.setState({name: event.target.value});
  	}

  	editClient(){
  		const uid = this.props.match.params.uid;
  		firebase.database().ref('clients/' + uid).set({
		    name: this.state.name
	  	});
  	}

  	handleSubmit(event) {
    	this.editClient();
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
			 			Editar Cliente
			 		</legend>
			        <Input placeholder="Nome" value={this.state.name} onChange={this.handleChange}/>   
				 	<Button onClick={this.handleSubmit} size="small" color="primary">Salvar</Button>
		      	</Form>
			</div>
		);
	}
}
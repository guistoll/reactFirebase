import React from 'react';
import FontAwesome from 'react-fontawesome';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import firebase from 'firebase';
import '../App.css';
import * as routes from './routes';

export default class Cadastro extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		name: ''
    	};

    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(event) {
    	this.setState({name: event.target.value});
  	}

  	handleSubmit(event) {
    	const ref = firebase.database().ref('/clients');
    	ref.push(this.state);

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
			 			Cadastro de Cliente
			 		</legend>
			        <Input placeholder="Nome" value={this.state.name} onChange={this.handleChange}/>   
				 	<Button onClick={this.handleSubmit} size="small" color="primary">Salvar</Button>
		      	</Form>
			</div>
		);
	}
}
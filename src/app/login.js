import React from 'react';
import '../App.css';
import {usersPermission} from '../firebase/usersPermission';
import { auth, provider } from '../firebase/config';
import UserAvatar from '../userAvatar';
import * as routes from './routes';

export default class Login extends React.Component {
	constructor() {
    	super();
    	this.state = {
      		user: null
      	}

      	this.login = this.login.bind(this);
	  	this.logout = this.logout.bind(this);
    }

    componentDidMount() {
  		auth.onAuthStateChanged((user) => {
    		if (user && usersPermission.indexOf(user.email) > -1) {
      			this.setState({ user });
    		}
  		});
  	}

    login() {
	  	auth.signInWithPopup(provider).then((result) => {
	  		if(usersPermission.indexOf(result.user.email) > -1) {
	  			const user = result.user;
	  			alert('Bem vindo ' + user.displayName + '!');
	      		this.setState({user});
	      		this.props.history.push(routes.Listar);
	  		}
	  		else {
	  			alert('Você não tem permissão para acessar!');
	  			return;
	  		}
	    });
	}

	logout() {
		auth.signOut().then(() => {
	      	this.setState({
	        	user: null
	      	});
	    });

		auth.currentUser.delete().then(function() {}).catch(function(error) {});

		this.props.history.push(routes.Login);
	}

	render() {
		return(
			<div className="app">
				{this.state.user ?
					// WHEN THE USER IS LOGGED:
					<div>
						<div className="logout">
							<UserAvatar imgSource={this.state.user.photoURL} />
							<button onClick={this.logout}>Log Out</button>
						</div>
					</div>

				:

					// WHEN USER IS NOT LOGGED IN:
					<div id="login" className="login">
						<button className="btnLogin" onClick={this.login}>Log In</button>
					</div>
				}	
			</div>
		);
	}
}
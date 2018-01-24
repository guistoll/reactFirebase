import React from 'react';
import './App.css';

export default class UserAuth extends React.Component{
	render() {
		return(
			<img className="userAvatar" alt="" src={this.props.imgSource} />
		);
	}
}
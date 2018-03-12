import firebase from 'firebase';
var Promise = require('es6-promise').Promise;

export default function getAllClients(){
	const ref = firebase.database().ref('/clients');
	
  return new Promise(function(resolve){
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
    			
  		resolve(clients);
  	});
  });
}
import firebase from 'firebase';

var Promise = require('es6-promise').Promise;
var ref = firebase.database().ref('/clients');

// ::RETURN CLIENT BY ID::
function getClient(ref, uid){
	return new Promise(function(resolve){
		ref.once('value', data => {	
			var c = {};
  		
  			data.forEach(function(client){
  				if(client.key === uid){
					c = {
	  					name: client.val().name,
	  					id: uid
	  				}
	  			}		
  			});

  			resolve(c);
		});
	});
}

// ::RETURN ALL CLIENTS::
function getAllClients(){
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

// ::DELETE CLIENTE::
function deleteClient(uid){
	ref.child(uid).remove();

}

function editClient(uid, name){
	firebase.database().ref('clients/' + uid).set({
	    name: name
  	});
}

export {getClient, getAllClients, deleteClient, editClient};


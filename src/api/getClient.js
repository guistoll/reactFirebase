export default function getClient(ref, uid){
	return new Promisse(function(resolve){
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

//

'use strict';

const fs = require('fs');

const Hapi = require('hapi');

const options = {

};

const tls = {
	key: fs.readFileSync( 'livekeys/privkey.pem' ).toString(),
	cert: fs.readFileSync( 'livekeys/cert.pem' ).toString(),
}

const args = process.argv;
const port = args[args.indexOf('-p') + 1 || args.indexOf('--port') + 1 || -1] || 80; // bleh, fix

const server = new Hapi.Server(  );

server.connection( { port: port, tls: tls, } );

server.start( ( err ) => {
	if ( err ) {
		throw err;
	}
	console.log( `Server running at: ${server.info.uri}` );
} );

server.route( {
	method: 'GET',
	path: '/',
	handler: function ( request, reply ) {
		reply( 'Hello, world!' );
	}
} );

server.route( {
	method: 'GET',
	path: '/{name}',
	handler: function ( request, reply ) {
		reply( 'Hello, ' + encodeURIComponent(request.params.name) + '!' );
	}
} );

// const web = server.connection({ port: 8000, host: 'example.com', labels: ['web'] });
// const admin = server.connection({ port: 8001, host: 'example.com', labels: ['admin'] });

// server.connections.length === 2
// web.connections.length === 1
// admin.connections.length === 1

//requires
var express = require( 'express' );
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//global


//uses
app.use(express.static('public') );
app.use(bodyParser.urlencoded( { extended: true} ) );



//spin up server
app.listen( 3000, function(){
  console.log("server up on 3000");
});

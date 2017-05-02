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

//set up config for pool
var config = {
  database: 'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 20
};

//create new pool
var pool = new pg.Pool(config);

//spin up server
app.listen( 3000, function(){
  console.log("server up on 3000");
});

//ROUTES
app.get ('/getOwners', function (req, res){
  console.log('hit get owners');
  // array of owners
  var allOwners = [];
  // connect to db
  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      // send query for all owners in the 'pets' table and hold in a variable (resultSet)
      var resultSet = connection.query( "SELECT * from owners" );
      // convert each row into an object in the allOwners array
      // on each row, push the row into allOwners
      resultSet.on( 'row', function( row ){
        allOwners.push( row );
      }); //end on row
      // on end of rows send array as response
      resultSet.on( 'end', function(){
        // close connection to reopen spot in pool
        done();
        // res.send array of owners
        res.send( allOwners );
      }); //end on end
    } // end no error
  }); //end pool
}); //end owners get


// Begin Register Post
app.post('/register', function(req, res){

  console.log('hit register route');
  var newOwner = req.body;
  console.log('received from client:', newOwner);


  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      //query write this owner to db (req.body)
      connection.query( "INSERT INTO owners (first_name, last_name) VALUES($1, $2)", [req.body.first, req.body.last]);
      // close connection to reopen spot in pool
      done();
      // res.send
      res.sendStatus(200);
    } // end else
  }); //end pool
}); //end register post

// NEW PET ROUTE
app.post('/newPet', function(req, res){

  console.log('hit new pet route');
  var newPet = req.body;
  console.log('received from client:', newPet);


  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      //query write this owner to db (req.body)
      var newid = connection.query("INSERT INTO pets (name, breed, color) VALUES ($1, $2, $3) RETURNING id", [req.body.petName, req.body.breed, req.body.color]);
      // connection.query("SELECT" + newid + "FROM pets");
      console.log(newid);
      console.log(req.body.ownerid);
      connection.query( "INSERT INTO pet_owner (owner_id,pet_id) VALUES($1,$2)", [req.body.ownerid,newid]);
      // close connection to reopen spot in pool
      done();
      // res.send
      res.sendStatus(200);
    } // end else
  }); //end pool
}); //end newPet post

//get table route
app.get ('/getTable', function (req, res){
  console.log('hit get Table');
  // array of everything in table
  var allTable = [];
  // connect to db
  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      // send query for all owners in the 'pets' table and hold in a variable (resultSet)
      var resultSet = connection.query( "SELECT * from pets JOIN pet_owner ON pets.id = pet_owner.pet_id JOIN owners ON pet_owner.owner_id = owners.id" );
      // convert each row into an object in the allTable array
      // on each row, push the row into allTable
      resultSet.on( 'row', function( row ){
        allTable.push( row );
      }); //end on row
      // on end of rows send array as response
      resultSet.on( 'end', function(){
        // close connection to reopen spot in pool
        done();
        // res.send array of owners
        res.send( allTable );
      }); //end on end
    } // end no error
  }); //end pool
}); //end table get

app.delete ('/deletePet', function (req, res){
  pool.connect( function( err, connection, done ){
    //check if there was an Error
    if( err ){
      console.log( err );
      // respond with PROBLEM!
      res.send( 400 );
    }// end Error
    else{
      console.log('connected to db');
      // send query for all owners in the 'pets' table and hold in a variable (resultSet)
      connection.query( "DELETE from pets where id = " + req.body.id );
      res.sendStatus(200);

      done ();
    } // end no error
  }); //end pool
});

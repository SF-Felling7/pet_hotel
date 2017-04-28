console.log('scripts sourced');

$(document).ready(onReady);

function onReady(){
  $('#register').on('click', register);
  $('#addPet').on('click', addPet);

  // $(document).on('click', '#update', updatePet);
  $(document).on('click', '.delete', deletePet);
  $(document).change('.checkinout', checkInOutPet);
  getOwners();
  addTable();
}

function getOwners(){
  console.log('in getOwners');
  $.ajax({
    url: '/getOwners',
    type: 'GET',
    success: function(response){
      console.log('back from server with:', response);
      $('#ownerName').empty();
      for (var i = 0; i < response.length; i++) {
        $('#ownerName').append('<option id=' + "response[i].ownerfirstname" + "response[i].ownerlastname" + ' data-ownerid='+response[i].id +'>'+ response[i].ownerfirstname + ' ' + response[i].ownerlastname + '</option>');
      }  //end for loop
    }  // end success
  });  //end ajax
}  //end getOwners

function register(){
  console.log('in function register');
  var firstName = $('#firstName').val();
  var lastName =$('#lastName').val();
  var nameToRegister = {
    first: firstName,
    last: lastName
  };
  console.log(nameToRegister);
  $.ajax ({
    url: '/register',
    type: 'POST',
    data: nameToRegister,
    success: function (response){
      console.log('back from server with response',response);
      $('#ownerName').empty();
      getOwners();
    }
  });
}

function addPet(){
  var id = $('#ownerName').find(':selected').data('ownerid');
  var color = $('#color').val();
  var breed = $('#breed').val();
  var petname = $('#petName').val();

  var petToRegister = {
    id: id,
    color: color,
    breed: breed,
    petName: petname
  };
  console.log('sending pet:', petToRegister);

  $.ajax ({
    url: '/newPet',
    type: 'POST',
    data: petToRegister,
    success: function (response){
      console.log('back from server with response',response);
      addTable();
    }
  });
}

function addTable(response) {
  $.ajax ({
    url: '/getTable',
    type: 'GET',
    success: function(response){
      console.log('back from server with all table:', response);
      $('.newrow').remove();
      for (var i = 0; i < response.length; i++) {
        $('table').append('<tr class="newrow"></tr>');
        $('.newrow').last().append('<td>'+response[i].ownerfirstname + " " + response[i].ownerlastname+'</td><td>'+response[i].petname+'</td><td>'+response[i].breed+'</td><td>'+response[i].color+
        '</td><td><button class="update">Go</button></td><td><button class="delete">Go</button></td><td><select class="checkinout"><option>In</option><option>Out</option></td>');
      }  //end for loop
    }  // end success
  });  //end ajax
}

function deletePet(){
  console.log('deleted your pet');
  var id = $('#ownerName').find(':selected').data('ownerid');

  var deleteToSend = {
    id: id
  };

  $.ajax ({
    url:'/deletePet',
    type: 'DELETE',
    data: deleteToSend,
    success: function(response){
      console.log('back from server with: ', response);
      addTable();
    } //end success
  });
}

function checkInOutPet (){
  console.log('checked pet');

  if ($('.checkinout').val() == 'Out' ){
    console.log('your pet checked out');
  }

  else {
    console.log('your pet checked in');
  }
}

var Doctor = require('./../js/doctor.js').doctorModule;

function displayDoctors(firstName, lastName, title) {
  $('#doctor-list tbody').append("<tr><td>" + firstName + " " + lastName + ", " + title + "</td></tr>");
}

function displayError(error) {
  $('#error').text(error);
}

function displaySpecialties(specialty, uid) {
  $('select').material_select();
  $('#specialties').append("<option value='" + uid + "'>" + specialty + "</option>");
}

$(document).ready(function(){
  $('select').material_select();
  Doctor.allSpecialties(displaySpecialties);

  $('#find-doctors').click(function() {
    $('#doctor-list tbody').empty();
    $('#error').empty();
    $('#doctor-list').show();
    var ailment = $('#ailment').val();
    var name = $('#name').val();
    var specialtyUid = $("#specialties").val();

    if (!ailment && !name && !specialtyUid) {
      $('#error').text("Please fill in at least one field");
    } else {
      var doctor = new Doctor();
      doctor.findDoctors(ailment, name, specialtyUid, displayDoctors, displayError);
    }
  });

  $('#reset').click(function(){
    $('#ailment').val('');
    $('#name').val('');
    $("#specialties").prop('selectedIndex', 0);
    $('select').material_select();
    $('#doctor-list tbody').empty();
    $('#doctor-list').hide();
    $('#error').empty();
  });
});

var Doctor = require('./../js/doctor.js').doctorModule;

function displayDoctors(firstName, lastName, title) {
  $('#doctor-list').append("<li>" + firstName + " " + lastName + ", " + title);
}

function displayError(error) {
  $('#error').text(error);
}

function displaySpecialities(speciality, uid) {
  $('select').material_select();
  $('#specialities').append("<option value='" + uid + "'>" + speciality + "</option>");
}

$(document).ready(function(){
  $('select').material_select();
  Doctor.allSpecialities(displaySpecialities);

  $('#find-doctors').click(function() {
    var ailment = $('#ailment').val();
    var name = $('#name').val();
    var specialityUid = $("#specialities").val();
    var doctor = new Doctor();
    doctor.findDoctors(ailment, name, specialityUid, displayDoctors, displayError);
  });

  $('#reset').click(function(){
    $('#ailment').val('');
    $('#name').val('');
    $("#specialities").prop('selectedIndex', 0);
    $('select').material_select();
    $('#doctor-list').empty();
  });
});

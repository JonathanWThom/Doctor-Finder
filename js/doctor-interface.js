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
    var doctor = new Doctor();
    doctor.findDoctors(ailment, name, displayDoctors, displayError);
  });
});
